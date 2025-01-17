import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import TodoForm from "./components/TodoForm";
import Homescreen from "./Screens/Homescreen";
import Aboutscreen from "./Screens/Aboutscreen";

export default function App() {
  const [tasks, setTasks] = useState([
    { task: "Go to gym", completed: false },
    { task: "Walk dog", completed: true },
    { task: "Buy groceries", completed: false },
    { task: "Cook dinner", completed: false },
    { task: "Mow lawn", completed: false },
    { task: "Clean house", completed: false },
  ]);

  const addTask = (taskText) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { task: taskText, completed: false },
    ]);
  };

  function RenderedTodolist({ tasks }) {
    return (
      <ScrollView>
        {tasks.map((task, index) => (
          <Pressable key={index}>
            <View style={[styles.task, task.completed && styles.completed]}>
              <Text style={styles.taskText}>{task.task}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    );
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="About" component={Aboutscreen} />
        <Stack.Screen name="TodoList">
          {() => (
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerText}>To-Do List</Text>
              </View>
              <View style={styles.content}>
                <TodoForm addTask={addTask} />
                <RenderedTodolist tasks={tasks} />
              </View>
            </SafeAreaView>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  task: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completed: {
    backgroundColor: "#d4edda",
  },
  taskText: {
    fontSize: 18,
  },
});
