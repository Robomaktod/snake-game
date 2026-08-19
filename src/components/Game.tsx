import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import {
  FOOD_INITIAL_POSITION,
  GAME_BOUNDS,
  MOVE_INTERVAL,
  SCORE_INCREMENT,
  SNAKE_INITIAL_POSITION,
} from "@/constants";
import { Coordinate, Direction } from "@/types";
import { checkGameOver } from "@/utils/checkGameOver";
import { Colors } from "@/styles/colors";
import Snake from "./Snake";
import Food from "./Food";
import { checkEatFood } from "@/utils/checkEatFood";
import { randomFoodPosition } from "@/utils/randomFoodPosition";
import Header from "./Header";

export function Game() {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(
    randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax),
  );

  const [isGameOver, setIsGameOver] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isGamePaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isGamePaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead };

    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver((prev) => !prev);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    if (checkEatFood(newHead, food, 2)) {
      setSnake([newHead, ...snake]);
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setScore((prev) => prev + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const handleGesture = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY))
      translationX > 0
        ? setDirection(Direction.Right)
        : setDirection(Direction.Left);
    else
      translationY > 0
        ? setDirection(Direction.Down)
        : setDirection(Direction.Up);
  };

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsGamePaused(false);
  };

  const pauseGame = () => setIsGamePaused(!isGamePaused);

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          isPaused={isGamePaused}
          reloadGame={reloadGame}
          pauseGame={pauseGame}
        >
          <Text
            style={{ fontSize: 22, fontWeight: "bold", color: Colors.primary }}
          >
            {score}
          </Text>
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    backgroundColor: Colors.background,
  },
});
