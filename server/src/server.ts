import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient({
  log: ["query"],
});

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

app.post("/ads", async (request, response) => {
  return response.status(201).json([]);
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

  const ads = adsDb.map((ad) => ({ ...ad, weekDays: ad.weekDays.split(",") }));

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
