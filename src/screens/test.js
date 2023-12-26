import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';





const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    getData();
  }, []);

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
        setData(actualData);
        setRefreshing(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  const onRefresh = () => {
    //Clear old data of the list
    setData([]);
    //Call the Service to get the latest data
    getData();
  };

  const FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={styles.listItemSeparatorStyle} />
    );
  };

  const Item = ({ title }) => (

    title.DutyID == "FLT" ?
      // <View style={styles.item}>
      //   <Text style={styles.title}>{title.DutyCode}</Text>
      // </View>

      <View style={styles.lisItemView}>
        <View style={{flex: 1}}>
        <Icon name="plane" size={30}  />
        </View>
        <View style={{flex: 2, flexDirection: 'column'}}>
              <View style={{flex:1}}>
              <Text style={styles.title,{flex:1}}>{title.Departure} - {title.Destination}</Text>
                </View>
              <View style={{flex:1}}>
                <Text></Text>
              </View>
        </View>
        <View style={{flex: 2, flexDirection: 'column'}}>
              <View style={{flex:1}}>
              <Text></Text>
                </View>
              <View style={{flex:1}}>
              <Text style={styles.title,{flex:1,color:"#48A8D0"}}>{title.Time_Depart}-{title.Time_Arrive}</Text>
              </View>
        </View>
      </View>
      : title.DutyID == "DO" ?
      <View style={styles.lisItemView}>
      <View style={{flex: 1}}>
      <Icon name="home" size={30}  />
      </View>
      <View style={{flex: 2, flexDirection: 'column'}}>
            <View style={{flex:1}}>
            <Text style={styles.title,{flex:1}}>{title.DutyCode}</Text>
              </View>
            <View style={{flex:1}}>
            <Text style={styles.title,{flex:1}}>{title.DutyID}</Text>
            </View>
      </View>
      <View style={{flex: 2, flexDirection: 'column'}}>
            <View style={{flex:1}}>
            <Text>Match Friends</Text>
              </View>
            <View style={{flex:1}}>
            <Text style={styles.title,{flex:1,color:"#48A8D0"}}>All day</Text>
            </View>
      </View>
    </View>
      : title.DutyID == "OFD" ?
      <View style={styles.lisItemView}>
      <View style={{flex: 1}}>
      <Icon name="suitcase" size={30}  />
      </View>
      <View style={{flex: 2, flexDirection: 'column'}}>
            <View style={{flex:1}}>
            <Text style={styles.title,{flex:1}}>{title.DutyCode}</Text>
              </View>
            <View style={{flex:1}}>
            <Text style={styles.title,{flex:1}}>{title.Destination}</Text>
            </View>
      </View>
      <View style={{flex: 2, flexDirection: 'column'}}>
            <View style={{flex:1}}>
            <Text></Text>
              </View>
            <View style={{flex:1}}>
            <Text style={styles.title,{flex:1,color:"#48A8D0"}}>{diff(title.Time_Depart,title.Time_Arrive)} hours</Text>
            </View>
      </View>
    </View>
      : title.DutyID == "POS" ?
      <View style={styles.item}>
      <Text style={styles.title}>{title.DutyCode}</Text>
    </View> 
    : title.DutyID == "SBY" ?
    <View style={styles.lisItemView}>
    <View style={{flex: 1}}>
    <Icon name="paste" size={30}  />
    </View>
    <View style={{flex: 2, flexDirection: 'column'}}>
          <View style={{flex:1}}>
          <Text style={styles.title,{flex:1}}>{title.DutyCode}</Text>
            </View>
          <View style={{flex:1}}>
          <Text style={styles.title,{flex:1}}>{title.DutyID}</Text>
          </View>
    </View>
    <View style={{flex: 2, flexDirection: 'column'}}>
          <View style={{flex:1}}>
          <Text>Match Crew</Text>
            </View>
          <View style={{flex:1}}>
          <Text style={styles.title,{flex:1,color:"#48A8D0"}}>{title.Time_Depart} - {title.Time_Arrive}</Text>
          </View>
    </View>
  </View>
  : null

  );

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

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ItemSeparatorComponent={FlatListItemSeparator}
        SectionSeparatorComponent={FlatListItemSeparator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16
  },
  item: {
    backgroundColor: "#fff",
    // padding: 20,
    marginVertical: 8
  },
  header: {
    // fontSize: 32,
    fontWeight:'bold',
    padding:10,
    backgroundColor: "#f1f1f1"
  },
  title: {
    // backgroundColor: "#ccc"
    // fontSize: 24
  },
  listItemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  lisItemView:{
    flex: 1, 
    flexDirection: 'row',
    padding:10,
    paddingLeft:25
  }
});

export default App;