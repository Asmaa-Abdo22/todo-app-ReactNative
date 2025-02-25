import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store'; 
import TodoListScreen from './screens/TodoListScreen'; 
import { setTodos } from './redux/todoSlice'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadStoredTodos = async () => {
      const todos = await AsyncStorage.getItem('todos');
      if (todos) {
        dispatch(setTodos(JSON.parse(todos)));
      }
    };

    loadStoredTodos();
  }, [dispatch]);

  return (
    <Provider store={store}>
      <TodoListScreen />
    </Provider>
  );
};

export default App;