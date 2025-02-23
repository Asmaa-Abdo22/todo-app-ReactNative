import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 

import { styles } from "../styles";

const TodoListComponent = ({ todos, onToggleDone, onDelete, onEdit, onToggleStatus }) => {
  return (
    <View>
      {todos.map((todo) => (
        <View key={todo.id} style={styles.todoItem}>
          <Text style={[styles.todoText, todo.status === "Done" && styles.doneText]}>
            {todo.title}
          </Text>
          <View style={styles.iconsContainer}>
    
            <TouchableOpacity onPress={() => onToggleStatus(todo.id)}>
              <FontAwesome
                name={todo.status === "Done" ? "check-circle" : "clock-o"}
                size={20}
                color={todo.status === "Done" ? "green" : "orange"}
                style={styles.icon}
              />
            </TouchableOpacity>
            
       
            <TouchableOpacity onPress={() => onEdit(todo)}>
              <FontAwesome name="edit" size={20} color="blue" style={styles.icon} />
            </TouchableOpacity>
            

            <TouchableOpacity onPress={() => onDelete(todo.id)}>
              <FontAwesome name="trash" size={20} color="red" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TodoListComponent;
