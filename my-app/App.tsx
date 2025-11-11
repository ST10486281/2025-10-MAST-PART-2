import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { MD3LightTheme, PaperProvider, Portal, Modal, IconButton } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import { ScrollView } from 'react-native';
import ManageItemsScreen from './screens/ManageItemsScreen';
import DrawerMenuContent from './screens/DrawerMenuContent';
import { useRef, useState } from 'react';
import FilterScreen from './screens/FilterScreen';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: '#ffffff',
    surface: '#ffffff',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [menuItems, setMenuItems] = React.useState<any[]>([]);


  const navRef = useRef<any>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [active, setActive] = useState('home');

  return (
    <PaperProvider theme={theme}>
      <ScrollView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
        <NavigationContainer ref={navRef}>
          <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
              headerLeft: () => null,
              headerRight: () => (
                <IconButton icon="menu" onPress={() => setMenuVisible(true)} />
              ),
              contentStyle: { flex: 1 },
            })}
          >
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Manage Items">
              {(props) => (
                <ManageItemsScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Filter By Course">
              {(props) => (
                <FilterScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />
              )}
            </Stack.Screen>
          </Stack.Navigator>

          {/* Drawer Menu */}
          <Portal>
            <Modal
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              contentContainerStyle={{
                backgroundColor: 'white',
                width: 300,
                height: '100%',
                alignSelf: 'flex-start',
                paddingTop: 24,
                justifyContent: 'flex-start',
                margin: 0,
              }}
            >
              <DrawerMenuContent
                active={active}
                setActive={setActive}
                onClose={() => setMenuVisible(false)}
                navigate={(name) => navRef.current?.navigate(name)}
              />
            </Modal>
          </Portal>
        </NavigationContainer>
      </ScrollView>
    </PaperProvider>
  );
}
