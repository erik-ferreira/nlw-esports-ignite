import {
  TouchableOpacity,
  TouchableOpacityProps,
  ImageSourcePropType,
  ImageBackground,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { THEME } from "../../theme";

import { styles } from "./styles";

export interface GameCardData {
  id: string;
  title: string;
  _count: {
    ads: number;
  };
  bannerUrl: string;
}

interface GameCardProps extends TouchableOpacityProps {
  game: GameCardData;
}

function GameCard({ game, ...rest }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={{ uri: game.bannerUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{game.title}</Text>
          <Text style={styles.ads}>{game._count.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export { GameCard };
