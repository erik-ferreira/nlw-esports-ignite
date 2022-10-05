import { useEffect, useState } from "react";
import { View, Image, FlatList, ScrollView } from "react-native";

import { api } from "../../services/api";

import { Heading } from "../../components/Heading";
import { GameCard, GameCardData } from "../../components/GameCard";

import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";

function Home() {
  const [games, setGames] = useState<GameCardData[]>([]);

  async function getListGames() {
    const response = await api.get<GameCardData[]>("/games");

    setGames(response.data);
  }

  useEffect(() => {
    getListGames();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item: game }) => <GameCard game={game} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </ScrollView>
    </View>
  );
}

export { Home };
