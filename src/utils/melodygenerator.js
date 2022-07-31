import MidiWriter from 'midi-writer-js';
import * as Chord from "tonal-chord"

export function getChords(chordsTab) {

    console.log(' Associated chords : ' + Chord.notes("A", "Min7")); //Chord.notes("CMin7"));

    var tracks = [];
    tracks[0] = new MidiWriter.Track();
    tracks[0].setTempo(128);
    
    chordsTab.map(chord => {
        console.log('chord ' + chord + ' notes : ' + Chord.notes(chord).map(i => i + '4'))
        Chord.notes(chord)
        tracks[0]
        .setTempo(100)
        .addEvent([
            new MidiWriter.ProgramChangeEvent({instrument : 1}),
            new MidiWriter.NoteEvent({pitch: Chord.notes(chord).map(i => i + '4'), duration: '1'})]);

    });

    // You can chain track methods.
    /*
    tracks[0]
        .setTempo(100)
        .addEvent([
            // addEvent() accepts an array of event objects like this...
            new MidiWriter.ProgramChangeEvent({instrument : 1}),
            new MidiWriter.NoteEvent({pitch: ['C6', 'G5', 'D5', 'C5'], duration: '1'}),
            new MidiWriter.NoteEvent({pitch: ['C6', 'G5', 'E5', 'C5'], duration: '1'})
            ], function(index, event) {
                return {velocity: 100};
            }
        );
      */  
        const write = new MidiWriter.Writer(tracks);
        return atob(write.dataUri().replace("data:audio/midi;base64,",""));

}