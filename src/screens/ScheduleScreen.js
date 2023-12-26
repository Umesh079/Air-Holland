import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScheduleItem from '../components/ScheduleItem';



const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@data', jsonValue)
    } catch (e) {
        // saving error
    }
}

const getData1 = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@data')

        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        // error reading value
    }
}





const FlatListItemSeparator = () => {
    return (
        //Item Separator
        <View style={styles.listItemSeparatorStyle} />
    );
};

const Item = ({ title, navigation }) => (

    <View>
        <ScheduleItem title={title} navigation={navigation} />
    </View>

);



function ScheduleScreen({ navigation }) {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [errorMessage, setErrorMessage] = useState("...loading");

    const onRefresh = () => {
        //Clear old data of the list
        console.log("++++====");
        setData([]);
        //Call the Service to get the latest data
        getData();
    };

    const getData = () => {
        fetch('https://rosterbuster.aero/wp-content/uploads/dummy-response.json')
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                const groupBy = keys => array =>
                    array.reduce((objectsByKeyValue, obj) => {
                        const value = keys.map(key => obj[key]).join('-');
                        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                        return objectsByKeyValue;
                    }, {});
                const groupByBrand = groupBy(['Date']);

                let actualData = [];
                Object.keys(groupByBrand(json)).forEach(key => {


                    var dateString = key;
                    var dateParts = dateString.split("/");
                    var dateObject = new Date(dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2]);


                    actualData.push({ "title": dateObject.toDateString(), "data": groupByBrand(json)[key] });
                });
                console.log(actualData);
                setData(actualData);
                storeData(actualData)
                setRefreshing(false);
            })
            .catch((error) => {
                setErrorMessage("There is some internet issue or no data is there at present");
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {

        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == false) {
                getData1().then((value) => {
                    if (value) {
                        setErrorMessage("...loading")
                        setData(value);
                        setRefreshing(false);
                    } else {
                        setErrorMessage("There is some internet issue or no data is there at present");
                    }

                })

            } else {
                getData();
            }
        });

        // Unsubscribe
        unsubscribe();



    }, []);


    return (
        data.length != 0 ?
            <SafeAreaView style={styles.container}>
                <SectionList
                    sections={data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item title={item} navigation={navigation} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    SectionSeparatorComponent={FlatListItemSeparator}
                />
            </SafeAreaView>
            : <View style={{ flexDirection: "column", flex: 1 }}><Text style={{ fontSize: 20, color: "red", alignItems: "center", alignSelf: "center" }}>{errorMessage}</Text></View>


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

export default ScheduleScreen;