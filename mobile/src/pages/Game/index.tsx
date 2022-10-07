import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";

import { api } from "../../services/api";

import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import { DuoCard, DuoCardData } from "../../components/DuoCard";

import { GameParams } from "../../@types/navigation";

import logoImg from "../../assets/logo-nlw-esports.png";

import { THEME } from "../../theme";
import { styles } from "./styles";

function Game() {
  const navigation = useNavigation();

  const route = useRoute();
  const game = route?.params as GameParams;

  const [duos, setDuos] = useState<DuoCardData[]>([]);

  async function getListAdsByGame() {
    const response = await api.get<DuoCardData[]>(`/games/${game.id}/ads`);

    setDuos(response.data);
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    getListAdsByGame();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={{ uri: game?.bannerUrl }}
            style={styles.cover}
            resizeMode="cover"
          />

          <Heading
            title={game?.title}
            subtitle="Conecte-se e comece a jogar!"
          />

          <FlatList
            data={duos}
            keyExtractor={(item) => item.id}
            renderItem={({ item: ad }) => (
              <DuoCard ad={ad} onConnect={() => {}} />
            )}
            horizontal
            style={styles.containerList}
            contentContainerStyle={
              duos.length > 0 ? styles.contentList : styles.emptyListContent
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Ainda não há anúncios publicados.
              </Text>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}

export { Game };
