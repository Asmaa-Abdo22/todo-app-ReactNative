import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
  addTodo,
  deleteTodo,
  updateTodo,
  setFilter,
} from '../redux/todoSlice';

const TodoListScreen = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.list);
  const filter = useSelector(state => state.todos.filter);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [editingId, setEditingId] = React.useState(null);

  // Pre-fill fields when editing
  useEffect(() => {
    if (editingId) {
      const todoToEdit = todos.find(todo => todo.id === editingId);
      if (todoToEdit) {
        setTitle(todoToEdit.title);
        setDescription(todoToEdit.description);
      }
    }
  }, [editingId, todos]);

  const addOrUpdateTodo = () => {
    if (!title.trim() || !description.trim()) return;

    if (editingId) {
      dispatch(updateTodo({ id: editingId, title, description }));
      setEditingId(null);
    } else {
      const newTodo = {
        id: Date.now().toString(),
        title,
        description,
        status: 'pending',
      };
      dispatch(addTodo(newTodo));
    }

    setTitle('');
    setDescription('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    if (filter === 'In Progress') return todo.status === 'inProgress';
    if (filter === 'Done') return todo.status === 'done';
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
        <Text style={styles.buttonText}>{editingId ? 'Update' : 'Submit'}</Text>
      </TouchableOpacity>

      <View style={styles.filterContainer}>
        {['All', 'In Progress', 'Done'].map(status => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filter === status && styles.activeFilter,
            ]}
            onPress={() => dispatch(setFilter(status))}
          >
            <Text style={styles.filterText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View>
              <Text style={styles.todoTitle}>{item.title}</Text>
              <Text style={styles.todoDescription}>{item.description}</Text>
            </View>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => setEditingId(item.id)}>
                <Ionicons name="create-outline" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
                <Ionicons name="trash" size={20} color="red" />
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
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  filterContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  filterButton: { padding: 10, borderWidth: 1, margin: 5, borderRadius: 5 },
  activeFilter: { backgroundColor: 'red' },
  todoItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
});

export default TodoListScreen;