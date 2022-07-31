import React, { Component } from 'react'
import { ScaleToColor } from '../../utils/colorconverter';

export default class ScaleBox extends Component {
  
    render() {

    const chord = this.props.chord;
    const rgba = ScaleToColor(chord);
  
    let backstyle = {
        padding: '15px',
        display: 'inline-flex',
        backgroundColor: rgba
    }

    return (
      <div style={backstyle}>{chord}</div>
    )
  }
}
