import "react-native-gesture-handler";
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from "./src/navigator/StackNavigator";
import { theme } from "./src/theme/theme";

const App = () => {
  return (
    <NavigationContainer>
    <PaperProvider theme={theme}>
    <StackNavigator/>
    </PaperProvider>
    </NavigationContainer>  
  )
}

export default App;

