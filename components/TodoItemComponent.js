import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

const TodoItemComponent = ({ todo, onToggleDone, onDelete, onEdit }) => {
  return (
    <TouchableOpacity onPress={() => onToggleDone(todo.id)}>
      <View style={styles.todoItem}>
        <Text style={todo.done ? styles.doneTodo : null}>{todo.title}</Text>
        <TouchableOpacity onPress={() => onDelete(todo.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(todo)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default TodoItemComponent;
