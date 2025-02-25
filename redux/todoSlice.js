import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadTodos = async () => {
  try {
    const storedTodos = await AsyncStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error('Failed to load todos:', error);
    return [];
  }
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],
    filter: 'All',
  },
  reducers: {
    setTodos: (state, action) => {
      state.list = action.payload;
      AsyncStorage.setItem('todos', JSON.stringify(state.list));
    },
    addTodo: (state, action) => {
      state.list.push(action.payload);
      AsyncStorage.setItem('todos', JSON.stringify(state.list));
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter(todo => todo.id !== action.payload);
      AsyncStorage.setItem('todos', JSON.stringify(state.list));
    },
    updateTodo: (state, action) => {
      state.list = state.list.map(todo =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );
      AsyncStorage.setItem('todos', JSON.stringify(state.list));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setTodos, addTodo, deleteTodo, updateTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;