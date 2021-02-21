import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

function ScheduleDetailScreen({ route, navigation }) {

    const { data } = route.params;
    

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.box}>
            <Text>Flight Time</Text>
            <Text>1h 15m</Text>
          </View>
          <View style={styles.box}>
            <Text>Difference</Text>
            <Text>00h 00m</Text>
          </View>
          <View style={styles.box}>
            <Text>Distance</Text>
            <Text>360 mi</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}><View style={{ padding: 10, flex: 1, alignItems: "center", borderWidth: 1, borderColor: "#f1f1f1" }}><Text style={{ flexDirection: "row", alignItems: "center" }}>Departs in 12d 5h 48m 2s</Text></View></View>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: "#fff"
      // marginHorizontal: 16
    },
    box:{
        flex: 1,
         alignItems: "center", 
         padding: 15,
          borderWidth: 1,
           borderColor: "#f1f1f1"
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

  export default ScheduleDetailScreen;