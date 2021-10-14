import * as React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { navigationRef } from './helpers/navigatorHelper';

import {
} from './actions';

import Category from './components/Products/Category';
import ProductDetail from './components/Products/ProductDetail';
import ProductList from './components/Products/ProductList';
import Favorites from './components/Products/Favorites';

const toastConfig = {
  'success': (internalState) => (
    <View style={{
      width: '90%',
      borderWidth: 1,
      borderLeftColor: '#5CB85C',
      borderTopColor: 'rgba(0, 0, 0, .09)',
      borderRightColor: 'rgba(0, 0, 0, .09)',
      borderBottomColor: 'rgba(0, 0, 0, .09)',
      borderLeftWidth: 5,
      backgroundColor: '#FFF',
      marginHorizontal: 10,
      borderRadius: 6,
    }}>
      <View style={{
        flexDirection: 'row',
        padding: 10,
      }}>
        <View style={{ marginHorizontal: 10, marginRight: 30 }}>
          <Text style={{ fontSize: 14 }}>{internalState.text2}</Text>
        </View>
      </View>
    </View>
  ),
  'error': (internalState) => (
    <View style={{
      width: '90%',
      borderWidth: 1,
      borderLeftColor: '#fe6300',
      borderTopColor: 'rgba(0, 0, 0, .09)',
      borderRightColor: 'rgba(0, 0, 0, .09)',
      borderBottomColor: 'rgba(0, 0, 0, .09)',
      borderLeftWidth: 5,
      backgroundColor: '#FFF',
      marginHorizontal: 10,
      borderRadius: 6,
    }}>
      <View style={{
        flexDirection: 'row',
        padding: 10,
      }}>
        <View style={{ marginHorizontal: 10, marginRight: 30 }}>
          <Text style={{ fontSize: 14 }}>{internalState.text2}</Text>
        </View>
      </View>
    </View>
  )
}

class AppRouter extends React.Component {
  render() {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer ref={navigationRef} >
        <Stack.Navigator initialRouteName="Category" screenOptions={{ animationEnabled: false }}>
          <Stack.Screen options={{ headerShown: false }} name="Category" component={Category} />
          <Stack.Screen options={{ headerShown: false }} name="ProductDetail" component={ProductDetail} />
          <Stack.Screen options={{ headerShown: false }} name="ProductList" component={ProductList} />
          <Stack.Screen options={{ headerShown: false }} name="Favorites" component={Favorites} />
        </Stack.Navigator>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    )
  }
}

function mapStateToProps({}) {
  return {
  };
}

export default connect(mapStateToProps, {
})(AppRouter);