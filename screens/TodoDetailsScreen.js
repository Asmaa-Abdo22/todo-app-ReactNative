import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TodoDetailsScreen = ({ route, navigation }) => {
  const { todo, onDelete } = route.params;

  const handleDelete = () => {
    onDelete(todo.id);
    navigation.goBack();
  };

  const handleEdit = () => {
    navigation.navigate('TodoForm', { todo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>
      <Text style={styles.description}>{todo.description}</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <Icon
            name={Platform.OS === 'ios' ? 'delete' : 'delete-outline'}
            size={30}
            color="red"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit}>
          <Icon
            name="edit"
            size={30}
            color="blue"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#666' },
  iconContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  icon: { marginHorizontal: 10 },
});

export default TodoDetailsScreen;
