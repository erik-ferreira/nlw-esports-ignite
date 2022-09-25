import { View, Image, FlatList, ScrollView } from "react-native";

import { Heading } from "../../components/Heading";
import { GameCard } from "../../components/GameCard";

import logoImg from "../../assets/logo-nlw-esports.png";

import { GAMES } from "../../utils/games";

import { styles } from "./styles";

function Home() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={GAMES}
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
