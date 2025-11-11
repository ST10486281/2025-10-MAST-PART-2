import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Text } from 'react-native-paper';
import DishList from './DishList';

export default function FilterScreen({ menuItems }: any) {
  const courses = ['Starters', 'Mains', 'Desserts'];
  const [visible, setVisible] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState<number | null>(null);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button mode="outlined" onPress={() => setVisible(true)}>
            {selectedCourse === null ? 'Select Course' : courses[selectedCourse]}
          </Button>
        }
      >
        {courses.map((c, i) => (
          <Menu.Item
            key={i}
            onPress={() => {
              setSelectedCourse(i);
              setVisible(false);
            }}
            title={c}
          />
        ))}
      </Menu>

      <View style={{ marginTop: 16 }}>
        {selectedCourse === null ? (
          <Text>Select a course to filter items.</Text>
        ) : (
          <DishList courses={courses} menu={menuItems} filterCourse={selectedCourse} />
        )}
      </View>
    </View>
  );
}
