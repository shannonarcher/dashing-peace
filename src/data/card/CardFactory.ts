import Card from "./Card";
import CardMap from "./CardMap";

function CardFactory(type: string): Card {
    return new Card(
        type,
        new CardMap(type),
    );
}

const cobra: string = 'cobra';
const rabbit: string = 'rabbit';
const ox: string = 'ox';
const mantis: string = 'mantis';
const eel: string = 'eel';
const frog: string = 'frog';
const horse: string = 'horse';
const crane: string = 'crane';
const boar: string = 'boar';
const monkey: string = 'monkey';
const tiger: string = 'tiger';
const goose: string = 'goose';
const rooster: string = 'rooster';
const crab: string = 'crab';
const elephant: string = 'elephant';
const dragon: string = 'dragon';

export const getTypes = 
    (): { [s: string]: string } => ({
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
        dragon,
    });

export default CardFactory;