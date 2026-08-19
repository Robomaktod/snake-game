import { Game } from "@/components/Game";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Colors } from "@/styles/colors";

export default function Index() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Game />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
