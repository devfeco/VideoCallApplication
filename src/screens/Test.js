import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {goBack} = this.props.navigation;
    const {params} = this.props.route;
    const {userId, userName} = params;

    return (
      <>
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              goBack();
            }}>
            <Icon name="arrow-back" size={18} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text>
            {' '}
            {JSON.stringify(userName)} ile görüşülüyor {userId}{' '}
          </Text>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: 24,
    height: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
});
