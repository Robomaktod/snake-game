import { View, StyleSheet } from "react-native";
import { Coordinate } from "@/types";

export default function Food({x, y}: Coordinate) {
  return <View style={[styles.food, {top: y*10, left: x*10}]}/>
}

const styles = StyleSheet.create({
  food: {
    width: 10,
    height: 10, 
    backgroundColor: 'red',
    position: 'absolute'
  }
})