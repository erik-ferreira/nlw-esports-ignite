import {
  View,
  Text,
  Modal,
  ModalProps,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import { showMessage } from "react-native-flash-message";

import { Heading } from "../Heading";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { useState } from "react";

interface DuoMatchProps extends ModalProps {
  discord: string;
  onCloseModal: () => void;
}

function DuoMatch({ discord, onCloseModal, ...rest }: DuoMatchProps) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    try {
      setIsCopping(true);

      const successIsCopping = await Clipboard.setStringAsync(discord);

      if (successIsCopping) {
        onCloseModal();

        showMessage({
          message: "Discord Copiado!",
          description:
            "Usuário copiado para você colocar no Discord e encontrar essa pessoa.",
          type: "success",
        });
      }
    } catch (err) {
      console.log(err);
      onCloseModal();
      showMessage({
        message: "Ops...",
        description: "Não foi possível copiar o discord. Tente novamente!",
        type: "danger",
        backgroundColor: "#fbbf24",
      });
    } finally {
      setIsCopping(false);
    }
  }

  return (
    <Modal transparent statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.buttonClose} onPress={onCloseModal}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            title="Let's play!"
            subtitle="Agora é so começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export { DuoMatch };
