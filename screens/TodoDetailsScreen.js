import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TodoDetailsScreen = ({ route }) => {
  const { todo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>
      <Text style={styles.description}>{todo.description}</Text>

   
      <View style={styles.iconContainer}>
        <Icon
          name={Platform.OS === 'ios' ? 'delete' : 'delete-outline'}
          size={30}
          color={Platform.OS === 'ios' ? 'red' : 'black'}
          style={styles.icon}
        />
        <Icon
          name={Platform.OS === 'ios' ? 'check-circle' : 'check-circle-outline'}
          size={30}
          color={Platform.OS === 'ios' ? 'green' : 'black'}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default TodoDetailsScreen;