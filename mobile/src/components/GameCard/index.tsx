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
  name: string;
  ads: string;
  cover: ImageSourcePropType;
}

interface GameCardProps extends TouchableOpacityProps {
  game: GameCardData;
}

function GameCard({ game, ...rest }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={game.cover}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{game.name}</Text>
          <Text style={styles.ads}>{game.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export { GameCard };
