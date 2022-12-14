import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import {
  convertMinutesToHourString,
  convertHourStringToMinutes,
} from "./utils/format";

const app = express();
const prisma = new PrismaClient({});

app.use(express.json());
app.use(cors());

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.json(games);
});

app.post("/games/:gameId/ads", async (request, response) => {
  const gameId = request.params?.gameId;
  const body = request.body;

  await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.status(201).json(gameId);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const adsDb = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const ads = adsDb.map((ad) => ({
    ...ad,
    weekDays: ad.weekDays.split(","),
    hourStart: convertMinutesToHourString(ad.hourStart),
    hourEnd: convertMinutesToHourString(ad.hourEnd),
  }));

  return response.status(200).json(ads);
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.status(200).json({
    discord: ad.discord,
  });
});

app.listen(3333);
