/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import {useState} from 'react';

import ImgScale from '../../components/ImgScale';
import SelectImage from '../../components/SelectImage';
import {ScaleList, ScaleMinorList, SegmentColor, SegmentMinorColor,ListFamilyChord, PowerNotes } from '../../utils/colorconverter';
import {getChords} from '../../utils/melodygenerator'

import MidiPlayer from 'react-midi-player';

class ImagesPage extends React.Component {
  constructor(props) {
    super(props);
    var handleToUpdate	= this.handleToUpdate.bind(this);
    var arg1 = '';
    this.state = { selected: "logo_bdx_io", mainChord: "", itemsSplit: [], chordProgression: [] };
  }

  onFinished = (winner) => {
    console.log(winner)
  }
s
  handleToUpdate(someArg){
    //alert('We pass argument from Child to Parent: ' + someArg);
    //this.setState({arg1:someArg});
    if (someArg.index==-1) {
      this.setState( {mainChord : someArg.chord});
    } else {
      var mc = this.state.chordProgression;
      mc.push(someArg.chord);
      this.setState( {chordProgression : mc});
    }
    
}

handleToSplit(){
  const items = [];
  const { mainChord,selected } = this.state;
  const numberSplit = 6;
  var	handleToUpdate	=	this.handleToUpdate;
  for (let i = 1; i <= 6; i++)  {
    var idname = 'sliceImg' + i;
    items.push(<ImgScale src={require(`../../ressources/img/` + selected + `-column-${i}.png`)}
    imageIndex = {i}
    handleToUpdate = {handleToUpdate.bind(this)}
    mainChord = {mainChord}  />)
  }

  this.setState({itemsSplit: items});
}

handleToSelect(someArg){
  console.log('New value' + someArg);
  this.setState({selected: someArg});
  this.setState({ mainChord: "", itemsSplit: [], chordProgression: []});
}

render() {

    const { mainChord, chordProgression, selected } = this.state;
    const EligibleChords =ListFamilyChord(mainChord);
    const notesToUse = PowerNotes(mainChord);

    var	handleToSplit	=	this.handleToSplit;
    var	handleToUpdate	=	this.handleToUpdate;
    var handleToSelect = this.handleToSelect;

    const onFinished = (winner) => {
      console.log(winner)
    }
    
    //var chordProgression = ['Am', 'Am','Am','FM', 'BbM', 'Gm'];
    var _dataMidi = getChords(chordProgression);

    return (
      <div>
        <div>
        <div>
            Image selected : {selected}
          </div>
          <SelectImage onSelected={handleToSelect.bind(this)}  />
          <div>
            This is the main Chord : {mainChord}
          </div>
          <div>
            Power notes associated : {notesToUse}
          </div>
          <p>
            Eligible chords : {EligibleChords}
          </p>
            <ImgScale src={require(`../../ressources/img/` + selected + `.png`)}
              handleToUpdate = {handleToUpdate.bind(this)}
              imageIndex = "-1"
              mainChord = ""/>
        </div>
        <div>
          Scales wheel
        </div>

        <div>
          <div>
            Chords : 
            <div><button onClick={handleToSplit.bind(this)}>Run split</button></div>
          </div>
          <p>
            {this.state.itemsSplit}
          </p>
        </div>

        <div>

        <MidiPlayer data={_dataMidi} />
        </div>
    </div>
    );
  }
}
export default ImagesPage;