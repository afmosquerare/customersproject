import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTabs from './components/HomeTabs';

const Stack = createStackNavigator();

export default function App() {
  return(
   <NavigationContainer>
    <Stack.Navigator>

      <Stack.Screen name="HomeTabs" component={HomeTabs}></Stack.Screen>

    </Stack.Navigator>
   </NavigationContainer>
  )
}


