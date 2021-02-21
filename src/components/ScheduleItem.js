import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


function ScheduleItem({ title, navigation }) {

    let nameOfIcon = "";
    let routine = "";
    let subRoutine = "";
    let crewDetails = "";
    let timing = "";
    let posnDisplay = false;

    function diff(start, end) {
        start = start.split(":");
        end = end.split(":");
        var startDate = new Date(0, 0, 0, start[0], start[1], 0);
        var endDate = new Date(0, 0, 0, end[0], end[1], 0);
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);
    
        // If using time pickers with 24 hours format, add the below line get exact hours
        if (hours < 0)
            hours = hours + 24;
    
        return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
    }

    switch (title.DutyID) {
        case "FLT":
            nameOfIcon = "plane";
            routine = `${title.Departure} - ${title.Destination}`;
            subRoutine = "";
            timing = `${title.Time_Depart} - ${title.Time_Arrive}`;
            break;
        case "DO":
            nameOfIcon = "home";
            routine = `${title.DutyCode}`;
            subRoutine = `${title.DutyID}`
            crewDetails = "Match Friends";
            timing = `All Day`;
            break;
        case "OFD":
            nameOfIcon = "suitcase";
            routine = `${title.DutyCode}`;
            subRoutine = `${title.DutyID}`;
            timing = diff(title.Time_Depart, title.Time_Arrive) + " hour";

            break;
        case "POS":
            break;
        case "SBY":
            nameOfIcon = "paste";
            routine = `${title.DutyCode}`;
            subRoutine = `${title.DutyID}`;
            crewDetails = "Match Crew";
            timing = `${title.Time_Depart} - ${title.Time_Arrive}`;
            break;

        default:
            break;
    }

    return (

        
        <TouchableOpacity
            onPress={() => { navigation.navigate("Schedule Detail", { "data": title }) }}>
                {title.DutyID=="POS" ?   <View style={styles.item}>
                                <Text style={styles.title}>{title.DutyCode}</Text>
                            </View> : 
            <View style={styles.lisItemView}>
                <View style={{ flex: 1 }}>
                    <Icon name={nameOfIcon} size={30} />
                </View>
                <View style={{ flex: 3, flexDirection: 'column' }}>
                    <View style={{ flex: 1,alignItems:"flex-start" }}>
                        <Text style={styles.title, { flex: 1,fontWeight:"bold" }}>{routine}</Text>
                    </View>
                    <View style={{ flex: 1,alignItems:"flex-start"  }}>
                        {subRoutine=="" ? <Text></Text> : <Text style={styles.title, { flex: 1 }}>{subRoutine}</Text>}
                    </View>
                </View>
                <View style={{ flex: 2, flexDirection: 'column' }}>
                    <View style={{ flex: 1,alignItems:"center"  }}>
                        {crewDetails=="" ? <Text></Text> : <Text style={styles.title, { flex: 1 }}>{crewDetails}</Text>}
                    </View>
                    <View style={{ flex: 1,alignItems:"center"  }}>
                        <Text style={styles.title, { flex: 1, color: "#48A8D0" }}>{timing}</Text>
                    </View>
                </View>
            </View>
}
        </TouchableOpacity>
    )

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
        fontWeight:"bold"
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

export default ScheduleItem;