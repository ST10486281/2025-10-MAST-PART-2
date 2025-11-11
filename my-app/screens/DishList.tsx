import * as React from 'react';
import { View } from 'react-native';
import { List, Avatar, Text } from 'react-native-paper';

type Dish = {
  name: string;
  description: string;
  course: number;
  price: number;
};

type DishListProps = {
  courses: string[];
  menu: Dish[];
  filterCourse?: number | null;
};

export default function DishList({ courses, menu, filterCourse = null }: DishListProps) {
  const grouped = React.useMemo(() => {
    const filteredMenu =
      filterCourse === null ? menu : menu.filter(d => d.course === filterCourse);
    return courses.map((courseName, idx) => ({
      course: courseName,
      items: filteredMenu.filter(d => d.course === idx),
    }));
  }, [courses, menu, filterCourse]);

  const visibleGroups =
    filterCourse === null ? grouped : grouped.filter((_, idx) => idx === filterCourse);

  return (
    <View style={{ paddingHorizontal: 8 }}>
      {visibleGroups.map((group, idx) => (
        <View key={idx}>
          {/* Only show course heading if not filtered */}
          {filterCourse === null && (
            <List.Subheader style={{ padding: 0 }}>{group.course}</List.Subheader>
          )}

          {group.items.map((dish, i) => (
            <List.Item
              key={i}
              title={dish.name}
              description={dish.description}
              left={() => <Avatar.Icon size={40} icon="food" />}
              right={() => (
                <View style={{ justifyContent: 'center', paddingRight: 8 }}>
                  <Text>R {dish.price.toFixed(2)}</Text>
                </View>
              )}
            />
          ))}

          {group.items.length === 0 && (
            <View style={{ paddingLeft: 16, paddingVertical: 4 }}>
              <Text>No items yet</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
