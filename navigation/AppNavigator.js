import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TodoListScreen from '../screens/TodoListScreen';
import TodoDetailsScreen from '../screens/TodoDetailsScreen';
import TodoFormScreen from '../screens/TodoFormScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TodoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TodoList" component={TodoListScreen} options={{ title: 'Todo List' }} />
      <Stack.Screen name="TodoDetails" component={TodoDetailsScreen} options={{ title: 'Todo Details' }} />
      <Stack.Screen name="TodoForm" component={TodoFormScreen} options={{ title: 'Edit Todo' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TodoStack} options={{ title: 'Todos' }} />
    </Tab.Navigator>
  );
}
