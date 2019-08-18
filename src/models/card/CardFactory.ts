import Card from './Card';
import CardMap from './CardMap';

function CardFactory(type: string): Card {
  return new Card(type, new CardMap(type));
}

const cobra = 'cobra';
const rabbit = 'rabbit';
const ox = 'ox';
const mantis = 'mantis';
const eel = 'eel';
const frog = 'frog';
const horse = 'horse';
const crane = 'crane';
const boar = 'boar';
const monkey = 'monkey';
const tiger = 'tiger';
const goose = 'goose';
const rooster = 'rooster';
const crab = 'crab';
const elephant = 'elephant';
const dragon = 'dragon';

export const getTypes = (): { [s: string]: string } => ({
  cobra,
  rabbit,
  ox,
  mantis,
  eel,
  frog,
  horse,
  crane,
  boar,
  monkey,
  tiger,
  goose,
  rooster,
  crab,
  elephant,
  dragon
});

export default CardFactory;
