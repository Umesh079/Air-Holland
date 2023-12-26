import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';

function SettingsScreen(props) {
    return (
      <View styles={styles.container}>
        <Text style={{ textAlign: "center" }}>{props.count.count}</Text>
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

  const mapStateToProps = state => ({
    count: state.count,
  });

  export default connect(mapStateToProps)(SettingsScreen);