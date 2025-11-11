import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, TextInput, Menu, HelperText } from 'react-native-paper';

type Dish = {
  name: string;
  description: string;
  course: number;
  price: number;
};

type DishFormModalProps = {
  visible: boolean;
  title: string;
  saveLabel?: string;
  courses: string[];
  onDismiss: () => void;
  onSubmit: (dish: Dish) => void;
};

export default function DishFormModal({
  visible,
  title,
  saveLabel = 'Save',
  courses,
  onDismiss,
  onSubmit,
}: DishFormModalProps) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [course, setCourse] = React.useState<number | null>(null);
  const [price, setPrice] = React.useState('');
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [menuVisible, setMenuVisible] = React.useState(false);

  const resetForm = () => {
    setName('');
    setDescription('');
    setCourse(null);
    setPrice('');
    setErrors({});
  };

  const handleDismiss = () => {
    resetForm();
    onDismiss();
  };

  const handleSave = () => {
    const newErrors: { [key: string]: string } = {};
    const parsedPrice = parseFloat(price);

    if (!name.trim()) newErrors.name = 'Dish name is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    if (course === null) newErrors.course = 'Please select a course.';
    if (!price.trim()) newErrors.price = 'Price is required.';
    else if (!/^\d+(\.\d{1,2})?$/.test(price))
      newErrors.price = 'Price must be a valid number (e.g. 12 or 12.50).';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dish: Dish = {
      name: name.trim(),
      description: description.trim(),
      course,
      price: parsedPrice,
    };

    onSubmit(dish);
    resetForm();
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={handleDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Dish Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors((e) => ({ ...e, name: '' }));
            }}
            error={!!errors.name}
          />
          {errors.name && <HelperText type="error">{errors.name}</HelperText>}

          <TextInput
            label="Description"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setErrors((e) => ({ ...e, description: '' }));
            }}
            multiline
            error={!!errors.description}
          />
          {errors.description && <HelperText type="error">{errors.description}</HelperText>}

          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setMenuVisible(true)}
                style={{ marginTop: 8 }}
              >
                {course !== null ? courses[course] : 'Select Course'}
              </Button>
            }
          >
            {courses.map((c, idx) => (
              <Menu.Item
                key={idx}
                onPress={() => {
                  setCourse(idx);
                  setMenuVisible(false);
                  setErrors((e) => ({ ...e, course: '' }));
                }}
                title={c}
              />
            ))}
          </Menu>
          {errors.course && <HelperText type="error">{errors.course}</HelperText>}

          <TextInput
            label="Price"
            value={price}
            onChangeText={(text) => {
              // allow only digits and optional dot
              const cleaned = text.replace(/[^0-9.]/g, '');
              setPrice(cleaned);
              setErrors((e) => ({ ...e, price: '' }));
            }}
            keyboardType="numeric"
            error={!!errors.price}
          />
          {errors.price && <HelperText type="error">{errors.price}</HelperText>}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDismiss}>Cancel</Button>
          <Button mode="contained" onPress={handleSave}>
            {saveLabel}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
