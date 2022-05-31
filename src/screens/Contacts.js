import React, {Component} from 'react';
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

export class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      contacts: data.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      }),
    };
  }

  renderContactsItem = ({item, index}) => {
    const {navigate} = this.props.navigation;
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('InComingCall', {
            name: item.name,
            avatar: item.picture,
          });
        }}
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

  renderHeader = () => {
    const {text} = this.state;
    return (
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} />
        <TextInput
          onChangeText={text => {
            this.setState({
              text,
            });
            this.searchFilter(text);
          }}
          value={text}
          placeholder="Search..."
          style={styles.searchInput}
        />
      </View>
    );
  };

  searchFilter = text => {
    const newData = data.filter(item => {
      const listItem = `${item.name.toLowerCase()}`;

      return listItem.indexOf(text.toLowerCase()) > -1;
    });

    this.setState({
      contacts: newData,
    });
  };

  render() {
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderContactsItem}
        keyExtractor={item => item._id}
        data={this.state.contacts}
      />
    );
  }
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
