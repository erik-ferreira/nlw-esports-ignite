import { View, TouchableOpacity, Text } from "react-native";
import { GameController } from "phosphor-react-native";

import { DuoInfo } from "../DuoInfo";

import { THEME } from "../../theme";

import { styles } from "./styles";

export interface DuoCardData {
  id: string;
  hourStart: string;
  hourEnd: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface DuoCardProps {
  ad: DuoCardData;
  onConnect: () => void;
}

function DuoCard({ ad, onConnect }: DuoCardProps) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={ad?.name} />
      <DuoInfo label="Tempo de jogo" value={`${ad?.yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${ad?.weekDays.length} dias \u2022  ${ad?.hourStart}h - ${ad?.hourEnd}h`}
      />
      <DuoInfo
        label="Chamada de áudio"
        value={ad?.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          ad?.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />
      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.titleButton}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}

export { DuoCard };
