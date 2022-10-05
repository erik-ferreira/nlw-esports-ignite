import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, FlatList, ScrollView } from "react-native";

import { api } from "../../services/api";

import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import { GameCard, GameCardData } from "../../components/GameCard";

import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";

function Home() {
  const navigation = useNavigation();

  const [games, setGames] = useState<GameCardData[]>([]);

  async function getListGames() {
    const response = await api.get<GameCardData[]>("/games");

    setGames(response.data);
  }

  function handleOpenGame({ id, title, bannerUrl }: GameCardData) {
    navigation.navigate("Game", {
      id: id,
      title: title,
      bannerUrl: bannerUrl,
    });
  }

  useEffect(() => {
    getListGames();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Image source={logoImg} style={styles.logo} />

          <Heading
            title="Encontre seu duo!"
            subtitle="Selecione o game que deseja jogar..."
          />

          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item: game }) => (
              <GameCard game={game} onPress={() => handleOpenGame(game)} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}

export { Home };
