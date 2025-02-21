import React, { useState } from 'react';
import { TextInput, TouchableOpacity, ScrollView, View, Text } from 'react-native'; 
import { styles } from '../styles'; 

const TodoListScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  const handleSubmit = () => {
    if (title && description) {
      setTodos([...todos, { id: Date.now(), title, description, done: false }]);
      setTitle('');
      setDescription('');
    }
  };

  const toggleDone = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Done') return todo.done;
    if (filter === 'In progress') return !todo.done;
    return true;
  });

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.dividerLine} />

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={filter === 'All' ? styles.activeFilterBtn : styles.filterBtn}
          onPress={() => setFilter('All')}
        >
          <Text style={filter === 'All' ? styles.activeFilterText : styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={filter === 'In progress' ? styles.activeFilterBtn : styles.filterBtn}
          onPress={() => setFilter('In progress')}
        >
          <Text style={filter === 'In progress' ? styles.activeFilterText : styles.filterText}>In progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={filter === 'Done' ? styles.activeFilterBtn : styles.filterBtn}
          onPress={() => setFilter('Done')}
        >
          <Text style={filter === 'Done' ? styles.activeFilterText : styles.filterText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.todosContainer}>
        {filteredTodos.map(todo => (
          <TouchableOpacity
            key={todo.id}
            onPress={() => navigation.navigate('TodoDetails', { todo })}
          >
            <Text style={todo.done ? styles.doneTodo : null}>{todo.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TodoListScreen;