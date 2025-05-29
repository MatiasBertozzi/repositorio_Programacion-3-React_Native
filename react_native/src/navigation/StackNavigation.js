import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from '../screen/Registro';
import Login from '../screen/Login';
import BottomTabs from './BottomTabs';
import { auth } from '../firebase/config';

const Stack = createNativeStackNavigator();

class StackNavigation extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      loading: true
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true, loading: false });
      } else {
        this.setState({ loggedIn: false, loading: false });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <Stack.Navigator>
        {
          this.state.loggedIn ? (
            <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
              <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }} />
            </>
          )
        }
      </Stack.Navigator>
    );
  }
}

export default StackNavigation;
