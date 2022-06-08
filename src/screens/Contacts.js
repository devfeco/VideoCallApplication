import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import data from '../assets/data/contact';
import { Voximplant } from "react-native-voximplant";
import { useNavigation } from "@react-navigation/native";

const Contacts = () => {

  const [text,setText] = useState('');
  const [contacts,setContacts] = useState(data);

  const navigation = useNavigation();
  const client = Voximplant.getInstance();

  const callUser = item => {
    navigation.navigate('OnCalling',{item});
  }

  useEffect(() => {
    client.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigation.navigate('IncomingCall', {call: incomingCallEvent.call});
    });

    return () => {
      client.off(Voximplant.ClientEvents.IncomingCall);
    };
  }, []);

  const renderContactsItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => callUser(item)}
        style={[
          styles.itemContainer,
          {backgroundColor: index % 2 === 1 ? '#fafafa' : ''},
        ]}>
        <Image style={styles.avatar} source={{uri: item.picture}} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item._id}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setContacts(data.sort(function(a,b){
      if (a.name > b.name)
        return 1;
      else if(b.name > a.name)
        return -1;
      else
        return 0;
    }));
    const newData = data.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(text.toLowerCase()));

    setContacts(newData);
  },[text]);

  const renderHeader = () => {
    return (
      <>
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} />
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Search..."
            style={styles.searchInput}
          />
        </View>
      </>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      renderItem={renderContactsItem}
      keyExtractor={item => item._id}
      data={contacts}
    />
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  textContainer: {
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 20,
    paddingHorizontal: 5,
    marginHorizontal: '5%',
    marginTop: 5,
  },
  searchInput: {
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
    width: '90%',
  },
});
export default Contacts;
