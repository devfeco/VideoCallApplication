import React, { Component } from 'react';
import { View } from 'react-native';
import Svg , {Path , G} from "react-native-svg";

export class WaveBox extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }
  render() {
    return (
      <View style={this.props.customStyles}>
        <View style={{backgroundColor:'transparent',height:100,width:'100%'}}>
          <Svg height={'100%'} width={'100%'} style={{position:'absolute',bottom:0,}} viewBox="0 0 1563 661" preserveAspectRatio={'none'}>
            <G fill="#6C5DD2" transform="translate(0.000000,661.000000) scale(0.100000,-0.100000)" stroke="none">
              <Path
                d="M3060 5744 c-310 -37 -536 -80 -772 -148 -674 -194 -1277 -538 -1727 -985 -161 -161 -245 -264 -471 -580 -36 -50 -68 -91 -72 -91 -4 0 -9 39 -11 88 -1 48 -4 -839 -5 -1970 l-2 -2058 7810 0 7810 0 0 2089 c0 1222 -4 2091 -9 2093 -5 2 -110 98 -232 215 -123 116 -280 259 -349 318 -604 518 -1255 843 -1940 969 -279 51 -394 60 -730 61 -192 0 -364 -5 -440 -13 -618 -65 -1183 -208 -1940 -492 -436 -164 -718 -254 -1030 -329 -983 -238 -1834 -191 -3090 169 -237 68 -314 92 -752 234 -787 255 -1168 359 -1508 411 -100 15 -463 28 -540 19z">
              </Path>
            </G>
          </Svg>
        </View>
        <View style={{backgroundColor:'#6C5DD2',height:50,width:'100%',bottom:0}}></View>
      </View>
    );
  }
}
