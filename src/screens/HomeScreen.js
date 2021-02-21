import React, { useEffect, useState } from 'react';
import {  Button, StatusBar, StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';
import { changeCount,incrementCount,decrementCount } from '../actions/counts';
import { bindActionCreators } from 'redux';

 function HomeScreen(props) {

    useEffect(() => {
                  
      }, []);


    const decrementCount = () => {

        let {decrement} = props;
        decrement();
    }
    const incrementCount = () => {
        let { count, increment,actions } = props;
        increment(count.count);
    }

 


    return (
      <View styles={styles.container}>
        <Button
          title="increment"
          onPress={incrementCount}
        />
        <Text style={{ textAlign: "center" }}>{props.count.count}</Text>
        <Button
          title="decrement"
          onPress={decrementCount}
        />
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
  
  const ActionCreators = Object.assign(
    {},
    changeCount,
  );
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(changeCount, dispatch),
    increment: bindActionCreators(incrementCount, dispatch),
    decrement: bindActionCreators(decrementCount, dispatch),
  });

  export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);