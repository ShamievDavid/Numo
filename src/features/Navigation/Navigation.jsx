import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import colors from '../../config/colors';
import tabs from './config/tabs';

const Tab = createBottomTabNavigator();

export const Navigation = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        tabBarStyle: styles.tabBar,
        tabBarScrollEnabled: true,
      }}>
      {tabs.map(({name, screen, icon}, index) => (
        <Tab.Screen
          key={index}
          name={name}
          component={screen}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? colors.heliotrope : colors.silverSand,
                  fontSize: 12,
                  lineHeight: 16,
                }}>
                {name}
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <View>{focused ? icon.active : icon.default}</View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  header: {
    height: 180,
    backgroundColor: colors.wildSand,
    borderBottomColor: colors.mercury,
    borderBottomWidth: 1,
  },
  headerTitle: {
    paddingTop: 72,
    paddingBottom: 24,
    color: colors.black,
    fontSize: 36,
    lineHeight: 48,
    fontWeight: '700',
  },
  tabBar: {
    paddingTop: 12,
    height: 100,
    backgroundColor: colors.white,
  },
});
