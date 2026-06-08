import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [sentence, setSentence] = useState('');
  const [entries, setEntries] = useState([]);

  const saveSentence = async () => {
    if (!sentence) return;
    const newEntries = [...entries, { text: sentence, id: Date.now().toString() }];
    setEntries(newEntries);
    await AsyncStorage.setItem('entries', JSON.stringify(newEntries));
    setSentence('');
  };

  return (
    <View style={styles.container}>
      <Text>Write one sentence for today:</Text>
      <TextInput
        style={styles.input}
        value={sentence}
        onChangeText={setSentence}
        placeholder="Your sentence..."
      />
      <Button title="Save" onPress={saveSentence} />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});
