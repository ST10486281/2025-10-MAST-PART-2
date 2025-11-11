import React from 'react';
import { Drawer } from 'react-native-paper';

type Props = {
  active: string;
  setActive: (val: string) => void;
  onClose: () => void;
  navigate: (name: string) => void;
};

export default function DrawerMenuContent({ active, setActive, onClose, navigate }: Props) {
  return (
    <Drawer.Section title="Menu" showDivider={false}>
      <Drawer.Item
        label="Home"
        icon="home"
        active={active === 'home'}
        onPress={() => {
          setActive('home');
          onClose();
          navigate('Home');
        }}
      />
      <Drawer.Item
        label="Manage Items"
        icon="information-outline"
        active={active === 'ManageItems'}
        onPress={() => {
          setActive('ManageItems');
          onClose();
          navigate('ManageItems');
        }}
      />
      {/* add more Drawer.Item here if needed */}
    </Drawer.Section>
  );
}