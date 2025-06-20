import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animated, Pressable } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';


const mockItems = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '6', title: 'Item 6' },
  { id: '7', title: 'Item 7' },
  { id: '8', title: 'Item 8' },
  { id: '9', title: 'Item 9' },
  { id: '10', title: 'Item 10' },
  { id: '11', title: 'Item 11' },
  { id: '12', title: 'Item 12' },
  { id: '13', title: 'Item 13' },
  { id: '14', title: 'Item 14' },
  { id: '15', title: 'Item 15' },
];

const SavedScreen = () => {
  const insets = useSafeAreaInsets();
  const [items, setItems] = React.useState(mockItems);

  const ItemComponent = ({ item }: { item: typeof mockItems[0] }) => {
    const [input, setInput] = useState('')
    return (
      <View style={{ flex: 1, }}>
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 8 }}
          placeholder="Type here..."
          placeholderTextColor={'#8E8E93'}
          value={input}
          onChangeText={setInput}
        />
      </View>
    )
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000', paddingTop: insets.top }}>

    <View style={styles.header}>
      <Text style={styles.headerTitle}>📋 My Tasks</Text>
      <Text style={styles.headerSubtitle}>Drag to reorder</Text>
    </View>
    </View>
  )
}

export default SavedScreen;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "#8E8E93",
    fontSize: 14,
  },
  list: {
    flex: 1,
    backgroundColor: "#000000",
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  taskItem: {
    height: 80,

    backgroundColor: "transparent",
  },
  taskContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#1C1C1E",

    borderWidth: 1,
    borderColor: "#3A3A3C",
  },
  taskInfo: {
    flex: 1,
    paddingRight: 16,
  },
  taskTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  taskStatus: {
    color: "#8E8E93",
    fontSize: 14,
  },
  dragIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  dragColumn: {
    flexDirection: "column",
    gap: 2,
  },
  dragDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#6D6D70",
  },
})