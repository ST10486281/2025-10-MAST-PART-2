import * as React from 'react';
import { View } from 'react-native';
import { List, Avatar, Text, IconButton, Dialog, Portal, Button } from 'react-native-paper';

type Dish = {
  name: string;
  description: string;
  course: number;
  price: number;
};

type DishListProps = {
  courses: string[];
  menu: Dish[];
  setMenuItems?: (fn: (prev: Dish[]) => Dish[]) => void;
  filterCourse?: number | null;
};

export default function DishList({
  courses,
  menu,
  setMenuItems,
  filterCourse = null,
}: DishListProps) {
  const [deleteDialogVisible, setDeleteDialogVisible] = React.useState(false);
  const [dishToDelete, setDishToDelete] = React.useState<Dish | null>(null);

  const handleDelete = () => {
    if (dishToDelete && setMenuItems) {
      setMenuItems((prev) => prev.filter((d) => d !== dishToDelete));
    }
    setDishToDelete(null);
    setDeleteDialogVisible(false);
  };

  // Helper to calculate average price
  const calculateAverage = (items: Dish[]) => {
    if (items.length === 0) return 0;
    let total = 0;
    for (const dish of items) {
      total += dish.price;
    }
    return total / items.length;
  };

  const grouped = React.useMemo(() => {
    const filteredMenu =
      filterCourse === null ? menu : menu.filter((d) => d.course === filterCourse);
    return courses.map((courseName, idx) => ({
      course: courseName,
      items: filteredMenu.filter((d) => d.course === idx),
    }));
  }, [courses, menu, filterCourse]);

  const visibleGroups =
    filterCourse === null ? grouped : grouped.filter((_, idx) => idx === filterCourse);

  return (
    <View style={{ paddingHorizontal: 8 }}>
      {visibleGroups.map((group, idx) => {
        const avg = calculateAverage(group.items);

        return (
          <View key={idx}>
            {/* Show heading only when not filtered */}
            {filterCourse === null && (
              <List.Subheader style={{ padding: 0 }}>
                {group.course}
                {group.items.length > 0 && (
                  <Text style={{ color: '#666' }}>
                    {'  '}(Avg: R {avg.toFixed(2)})
                  </Text>
                )}
              </List.Subheader>
            )}

            {group.items.map((dish, i) => (
              <List.Item
                key={i}
                title={dish.name}
                description={dish.description}
                left={() => <Avatar.Icon size={40} icon="food" />}
                right={() => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginRight: 8 }}>R {dish.price.toFixed(2)}</Text>
                    {setMenuItems && (
                      <IconButton
                        icon="delete"
                        iconColor="red"
                        onPress={() => {
                          setDishToDelete(dish);
                          setDeleteDialogVisible(true);
                        }}
                      />
                    )}
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
        );
      })}

      {/* Delete confirmation dialog */}
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)}>
          <Dialog.Title>Delete Dish</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to delete{' '}
              <Text style={{ fontWeight: 'bold' }}>{dishToDelete?.name}</Text>?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
            <Button textColor="red" onPress={handleDelete}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
