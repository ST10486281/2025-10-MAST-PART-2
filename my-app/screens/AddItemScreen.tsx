import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import DishFormModal from './DishFormModal';
import DishList from './DishList';

export default function HomeScreen({ menuItems, setMenuItems }: any) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const courses = ['Starters', 'Mains', 'Desserts'];

  const handleSubmit = (dish: any) => {
    setMenuItems((prev: any[]) => [...prev, dish]);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Header row with count + add button */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text>Total items: {menuItems.length}</Text>
        <Button mode="contained" onPress={() => setModalVisible(true)}>
          Add Dish
        </Button>
      </View>

      {/* List */}
      <DishList courses={courses} menu={menuItems} />

      {/* Modal */}
      <DishFormModal
        visible={modalVisible}
        title="Add Dish"
        saveLabel="Add"
        courses={courses}
        onDismiss={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
