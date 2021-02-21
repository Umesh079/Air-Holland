import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from './src/screens/SettingsScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import ScheduleDetailScreen from './src/screens/ScheduleDetailScreen';
import PeopleScreen from './src/screens/PeopleScreen';
import DashScreen from './src/screens/DashScreen';




const App = () => {

  const BottomTab = createBottomTabNavigator();

  const ScheduleStack = createStackNavigator();

  function ScheduleStackScreen({ navigation, route }) {
    return (
      <ScheduleStack.Navigator>
        <ScheduleStack.Screen name="Schedule"
          component={ScheduleScreen} />
        <ScheduleStack.Screen name="Schedule Detail"
          component={ScheduleDetailScreen}
          options={({ route }) => ({
            title: <LogoTitle {...route} />,
            headerBackTitle:()=>(null),
            headerRight: () => (
              <View style={{ flexDirection: "row", paddingRight: 25 }}>
                <TouchableOpacity>
                  <Icon name="bluetooth" size={20} style={{ paddingRight: 15 }}></Icon>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="ellipsis-v" size={20} ></Icon>
                </TouchableOpacity>
              </View>
            ),
          })}

        />


      </ScheduleStack.Navigator>
    );
  }

  function LogoTitle(route) {
    const { data } = route.params;

    return (
      <View style={{ flexDirection: "row", alignItems: "center", alignContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="arrow-up" size={20} ></Icon>
          <Text>  {data.Departure} - {data.Destination}  </Text>
          <Icon name="arrow-down" size={20} ></Icon>
        </View>
      </View>
    )
  }

  const HomeStack = createStackNavigator();

  function HomeStackScreen({ navigation }) {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="HOME" component={HomeScreen} />
      </HomeStack.Navigator>
    );
  }

  const DashStack = createStackNavigator();

  function DashStackScreen({ navigation }) {
    return (
      <DashStack.Navigator>
        <DashStack.Screen name="Dashboard" component={DashScreen} />
      </DashStack.Navigator>
    );
  }

  const PeopleStack = createStackNavigator();

  function PeopleStackScreen({ navigation }) {
    return (
      <PeopleStack.Navigator>
        <PeopleStack.Screen name="People" component={PeopleScreen} />
      </PeopleStack.Navigator>
    );
  }

  const SettingsStack = createStackNavigator();

  function SettingsStackScreen({ navigation }) {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      </SettingsStack.Navigator>
    );
  }


  function TabBarScreens() {
    return (

      <BottomTab.Navigator tabBarOptions={{
        showLabel:false,
        activeTintColor:"#48A8D0",
        inactiveTintColor:"#000"
      }}>
        <BottomTab.Screen name="HOME"   options={{
          tabBarIcon: ({ color,focused, size }) => (
            <Icon1 name="home-outline" focused={focused} color={color} size={size}></Icon1>
          )
        }} component={HomeStackScreen} />
        <BottomTab.Screen name="SCHEDULE"   options={{
          tabBarIcon: ({ color,focused, size }) => (
            <Icon1 name="calendar-outline" focused={focused} color={color} size={size}></Icon1>
          )
        }}  component={ScheduleStackScreen} />
        <BottomTab.Screen name="DASHBOARD"   options={{
          tabBarIcon: ({ color,focused, size }) => (
            <Icon1 name="speedometer-outline" focused={focused} color={color} size={size}></Icon1>
          )
        }}  component={DashStackScreen} />
        <BottomTab.Screen name="PEOPLE"   options={{
          tabBarIcon: ({ color,focused, size }) => (
            <Icon1 name="people-outline" focused={focused} color={color} size={size}></Icon1>
          )
        }}  component={PeopleStackScreen} />
        <BottomTab.Screen name="SETTINGS"   options={{
          tabBarIcon: ({ color,focused, size }) => (
            <Icon1 name="cog-outline" focused={focused} color={color} size={size}></Icon1>
          )
        }}  component={SettingsStackScreen} />
      </BottomTab.Navigator>

    );
  }


  return (
    <NavigationContainer>
      <TabBarScreens />
    </NavigationContainer>
  );




};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff"
    // marginHorizontal: 16
  },
  item: {
    backgroundColor: "#fff",
    // padding: 20,
    marginVertical: 8
  },
  header: {
    // fontSize: 32,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: "#f1f1f1"
  },
  title: {
    // backgroundColor: "#f1f1f1"
    // fontSize: 24
  },
  listItemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  lisItemView: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 25
  }
});

export default App;