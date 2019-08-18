const CardMapData: { [s: string]: string[] } = {};
const MapObject = {
  cobra: ['     ', '   x ', ' xo  ', '   x ', '     '],
  rabbit: ['     ', '   x ', '  o x', ' x   ', '     '],
  ox: ['     ', '  x  ', '  ox ', '  x  ', '     '],
  mantis: ['     ', ' x x ', '  o  ', '  x  ', '     '],
  eel: ['     ', ' x   ', '  ox ', ' x   ', '     '],
  frog: ['     ', ' x   ', 'x o  ', '   x ', '     '],
  horse: ['     ', '  x  ', ' xo  ', '  x  ', '     '],
  crane: ['     ', '  x  ', '  o  ', ' x x ', '     '],
  boar: ['     ', '  x  ', ' xox ', '     ', '     '],
  monkey: ['     ', ' x x ', '  o  ', ' x x ', '     '],
  tiger: ['  x  ', '     ', '  o  ', '  x  ', '     '],
  goose: ['     ', ' x   ', ' xox ', '   x ', '     '],
  rooster: ['     ', '   x ', ' xox ', ' x   ', '     '],
  crab: ['     ', '  x  ', 'x o x', '     ', '     '],
  elephant: ['     ', ' x x ', ' xox ', '     ', '     '],
  dragon: ['     ', 'x   x', '  o  ', ' x x ', '     ']
};

Object.entries(MapObject).forEach(([key, value]) => {
  CardMapData[key] = value;
});

export default CardMapData;
