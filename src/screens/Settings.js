import React, {Component} from 'react';
import {View, Text, StyleSheet , TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Voximplant} from 'react-native-voximplant'

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  client = Voximplant.getInstance();

  signOut = async () => {
    await this.client.disconnect();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.page}>
        <TouchableOpacity onPress={this.signOut}>
          <Icon name={'logout'} size={48} color={'red'}/>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
