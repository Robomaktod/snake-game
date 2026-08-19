import { StyleSheet, View } from "react-native";
import { Coordinate } from "@/types";
import { Colors } from "@/styles/colors";

interface SnakeProps {
  snake: Coordinate[];
}

export default function Snake({ snake }: SnakeProps) {
  return (
  <>
    {snake.map((el, index) => {
      const segmentStyle = {
        left: el.x * 10,
        top: el.y * 10,
      }
      return <View key={index} style={[styles.snake, segmentStyle]}/>
    })}  
  </>
  );
}

const styles = StyleSheet.create({
  snake: {
    width: 10, 
    height: 10, 
    backgroundColor: Colors.primary,
    position: 'absolute'
  }
});
