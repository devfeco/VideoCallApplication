import React, { Component } from 'react';
import { View } from 'react-native';
import Svg , {Path} from "react-native-svg";

export default class  extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  render() {
    return (
      <View style={this.props.customStyles}>
        <View style={{backgroundColor:'transparent',height:110,width:'100%'}}>
          <Svg height={'65%'} width={'100%'} style={{position:'absolute',bottom:0}} viewBox="0 0 35.28 2.17" preserveAspectRatio={'none'}>
            <Path
              fill="#6C5DD2" fill-opacity="1"
              d="M35.28 1.16c-3.17-.8-7.3.4-10.04.56-2.76.17-9.25-1.47-12.68-1.3-3.42.16-4.64.84-7.04.86C3.12 1.31 0 .4 0 .4v1.77h35.28z">
            </Path>
          </Svg>
        </View>
        <View style={{backgroundColor:'#6C5DD2',height:80,width:'100%',bottom:0}}></View>
      </View>
    );
  }
}
