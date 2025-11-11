import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import { ScrollView } from 'react-native';

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

  return (
    <PaperProvider theme={theme}>
      <ScrollView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen
                  {...props}
                  menuItems={menuItems}
                  setMenuItems={setMenuItems}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ScrollView>
    </PaperProvider>
  );
}
