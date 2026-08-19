import { Pressable, StyleSheet, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { JSX } from "react/jsx-runtime";
import { Colors } from "@/styles/colors";

interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element;
  isPaused: boolean;
}

export default function Header({
  children,
  reloadGame,
  pauseGame,
  isPaused,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={reloadGame}>
        <Ionicons name="reload-circle" size={35} color={Colors.primary} />
      </Pressable>
      {children}

      <Pressable onPress={pauseGame}>
        <FontAwesome
          name={isPaused ? "play-circle" : "pause-circle"}
          size={35}
          color={Colors.primary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.primary,
    borderWidth: 12,
    padding: 15,
    backgroundColor: Colors.background,
  },
});
