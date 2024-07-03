// App.js

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import OrderDetailsScreen from './src/screens/OrderDetailsScreen';  // Assurez-vous que ce chemin est correct

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  console.log('isAuthenticated:', isAuthenticated);
  console.log('userId:', userId);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!isAuthenticated ? (
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Orders">
              {props => <OrdersScreen {...props} userId={userId} />}
            </Stack.Screen>
            <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
