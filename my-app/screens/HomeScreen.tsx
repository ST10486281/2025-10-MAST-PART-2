import * as React from 'react';
import { View, Text } from 'react-native';
import DishList from './DishList';

export default function HomeScreen({ menuItems }: any) {
  const courses = ['Starters', 'Mains', 'Desserts'];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
        Total items: {menuItems.length}
      </Text>
      <DishList courses={courses} menu={menuItems} />
    </View>
  );
}
