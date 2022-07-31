import React from 'react';

import { FastAverageColor } from 'fast-average-color';
import { colorToScale, colorToChord } from '../../utils/colorconverter';
import ScaleBox from '../ScaleBox'

class ImgScale extends React.Component {

    constructor(props) {
        super(props);
        this.state = { imageStatus: "loading", backstyle: {}, scale: ""};
      }

      handleImageLoaded() {
        this.setState({ imageStatus: "loaded" });
        const fac = new FastAverageColor();
        fac.getColorAsync(this.props.src)
            .then(color => {
                
                var	handleToUpdate	=	this.props.handleToUpdate;
                var chordIndex = this.props.imageIndex;
                var mainChord = this.props.mainChord;
                console.log('Average color : ', color);
                var chordFind = "";
                if (chordIndex === "-1") {
                  chordFind = colorToScale(color.hex);
                } else {
                  chordFind = colorToChord(color.hex, mainChord);
                }
                
                handleToUpdate({chord: chordFind, index: chordIndex });
                this.setState( {scale: chordFind});
                console.log('Average scale :', chordFind);
                let backstyle = {
                    padding: '15px',
                    display: 'inline-flex',
                    backgroundColor: color.rgba
                }
                this.setState({ backstyle: backstyle });
            })
            .catch(e => {
                console.log(e);
            });
      }
    
      handleImageErrored() {
        this.setState({ imageStatus: "failed to load" });
      }

    render() {
        return (
            <div       
              style={this.state.backstyle}>
              <div>
              <img
                alt="Image to convert"
                src={this.props.src}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
              />
              <ScaleBox chord={this.state.scale} />
              </div> 
            </div>
          );
    }
}


export default ImgScale;
