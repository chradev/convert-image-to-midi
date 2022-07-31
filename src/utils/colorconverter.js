export const ScaleList  = [
    'CM',
    'GM',
    'DM',
    'AM',
    'EM',
    'BM',
    'F#M',
    'DbM',
    'AbM',
    'EbM',
    'BbM',
    'FM'
  ]

export const SegmentColor = [
  '#d27ede',
  '#b57efe',
  '#9da7ff',
  '#86dffd',
  '#7efffb',
  '#90f9ce',
  '#a1ff9c',
  '#b4f273',
  '#d2d86e',
  '#eba478',
  '#ff8097',
  '#f17fb3'
]

  export const ScaleMinorList  = [
    'Am',
    'Em',
    'Bm',
    'F#m',
    'Dbm',
    'Abm',
    'Em',
    'Bbm',
    'Fm',
    'cm',
    'Gm',
    'Dm'
  ]

  export const SegmentMinorColor = [
    '#e0aeed',
    '#d0adff',
    '#c3c1ff',
    '#b4e7fc',
    '#affffe',
    '#c3ffc1',
    '#d4f9a9',
    '#e3e4a8',
    '#f5c6ac',
    '#ffaeba',
    '#f5aece',
    '#f7aecc'
  ]

export function colorToScale(color) {
  var res = [];
  SegmentColor.map(col => (res.push(getDiffColor(col, color))));

  return ScaleList[res.indexOf(Math.min.apply(null, res))];
}

export function colorToChord(color, chordRoot) {
  var res = [];
  var segment = [];

  var scales = ListFamilyChord(chordRoot);
  scales.map(scl => (segment.push(ScaleToColor(scl))));

  segment.map(col => (res.push(getDiffColor(col, color))));

  return scales[res.indexOf(Math.min.apply(null, res))];
}

export function ScaleToColor(scale) {
  if (scale.indexOf("m")>-1) {
    return SegmentMinorColor[ScaleMinorList.findIndex(itm => itm === scale)];
  } else {
    return SegmentColor[ScaleList.findIndex(itm => itm === scale)];
  }
}

export function ListFamilyChord(scale) {
  var res = [];
  if (scale === "") {
    return res;
  }

  var refIndex = ScaleList.findIndex(itm => itm === scale);

  //Root
  res.push(ScaleList[refIndex]);

  //Sister Chord
  res.push(ScaleList[(refIndex-1).mod(12)]);
  res.push(ScaleList[(refIndex+1).mod(12)]);

  //Cousin Chords
  res.push(ScaleList[(refIndex+2).mod(12)].replace("M","m"));
  res.push(ScaleList[(refIndex+3).mod(12)].replace("M","m"));
  res.push(ScaleList[(refIndex+4).mod(12)].replace("M","m"));

  return res;
}


export function PowerNotes(scale) {
  var res = [];
  if (scale === "") {
    return res;
  }

  var refIndex = ScaleList.findIndex(itm => itm === scale);

  res.push(ScaleList[refIndex]);
  res.push(ScaleList[(refIndex+1).mod(12)]);
  res.push(ScaleList[(refIndex+2).mod(12)]);
  res.push(ScaleList[(refIndex+3).mod(12)]);
  res.push(ScaleList[(refIndex+4).mod(12)]);

  res = res.map(x => x.replace("M",""));

  return res;
}

Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
};

  function getDiffColor(cola, colb) {
    console.log('Looking for diff between ' + cola + ' ' + colb);
    const a = hexToRgb(cola);
    const b = hexToRgb(colb);
    return Math.sqrt(Math.pow((a.r - b.r),2) + Math.pow((a.g - b.g),2) + Math.pow((a.b - b.b),2));
  }

  function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
  }
