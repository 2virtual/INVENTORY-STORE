import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';


import Tiles from './Tiles';

const MotionTile2 = props => {
  return (
      <Motion
        defaultStyle={{ scale: 0.5 }}
        style={{ scale: spring(1, { stiffness: 170, damping: 26 }) }}
      >
        {interpolatedStyle => <Tiles scale={interpolatedStyle.scale} {...props} />}
      </Motion>
  );
};

export default class ShowTiles extends Component {
  render() {
    return (
      <div>
        <MotionTile2 />
       
      </div>
    );
  }
}