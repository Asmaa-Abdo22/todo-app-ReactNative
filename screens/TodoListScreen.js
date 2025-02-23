import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoListScreen = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos", error);
    }
  };

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos) setTodos(JSON.parse(storedTodos));
    } catch (error) {
      console.error("Error loading todos", error);
    }
  };

  const addOrUpdateTodo = () => {
    if (title.trim() === "" || description.trim() === "") return;

    if (editingId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, title, description } : todo
        )
      );
      setEditingId(null);
    } else {
      const newTodo = {
        id: Date.now().toString(),
        title,
        description,
        status: "pending",
      };
      setTodos([...todos, newTodo]);
    }

    setTitle("");
    setDescription("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const editTodo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingId(todo.id);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "In Progress") return todo.status === "inProgress";
    if (filter === "Done") return todo.status === "done";
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={addOrUpdateTodo}>
        <Text style={styles.buttonText}>{editingId ? "Update" : "Submit"}</Text>
      </TouchableOpacity>

      <View style={styles.filterContainer}>
        {["All", "In Progress", "Done"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filter === status && styles.activeFilter,
            ]}
            onPress={() => setFilter(status)}
          >
            <Text style={styles.filterText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.todoItem,
              item.status === "inProgress" && styles.inProgressTodo,
            ]}
          >
            <View>
              <Text style={styles.todoTitle}>{item.title}</Text>
              <Text style={styles.todoDescription}>{item.description}</Text>
            </View>

            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => editTodo(item)}>
                <Ionicons
                  name="create-outline"
                  size={20}
                  color="blue"
                  style={styles.icon}
                />
              </TouchableOpacity>

              {item.status === "pending" && (
                <TouchableOpacity
                  onPress={() => updateStatus(item.id, "inProgress")}
                >
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color="orange"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              )}

              {item.status !== "done" && (
                <TouchableOpacity onPress={() => updateStatus(item.id, "done")}>
                  <Ionicons
                    name="checkmark-done-outline"
                    size={20}
                    color="green"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <Ionicons
                  name="trash"
                  size={20}
                  color="red"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  filterButton: { padding: 10, borderWidth: 1, margin: 5, borderRadius: 5 },
  activeFilter: { backgroundColor: "red" },
  filterText: { color: "black" },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
  },
  inProgressTodo: {
    backgroundColor: "#fff7e6",
    borderColor: "orange",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default TodoListScreen;
