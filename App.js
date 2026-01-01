import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim().length > 0) {
      setTasks(prevTasks => [
        ...prevTasks,
        { id: Date.now().toString(), text: inputValue }
      ]);
      setInputValue('');
    }
  };

  const removeTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do App</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={addTask}
        returnKeyType="done"
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        style={styles.list}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text}</Text>
            <Button
              title="Done"
              color="#e57373"
              onPress={() => removeTask(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet. Start by adding one!</Text>
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1976d2',
    marginVertical: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#b0bec5',
  },
  list: {
    width: '100%',
    marginTop: 12,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#b0bec5',
  },
  taskText: {
    fontSize: 18,
    flex: 1,
    color: '#37474f',
  },
  empty: {
    textAlign: 'center',
    color: '#78909c',
    fontSize: 16,
    marginTop: 32,
  },
});
