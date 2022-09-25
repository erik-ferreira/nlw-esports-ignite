import { ReactNode } from "react";
import { ImageBackground } from "react-native";

import backgroundImg from "../../assets/background-galaxy.png";

import { styles } from "./styles";

interface PropsBackground {
  children: ReactNode;
}

function Background({ children }: PropsBackground) {
  return (
    <ImageBackground
      style={styles.container}
      source={backgroundImg}
      defaultSource={backgroundImg}
    >
      {children}
    </ImageBackground>
  );
}

export { Background };
