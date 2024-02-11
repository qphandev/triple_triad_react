import { CardData } from '../data/CardData';
import { Card } from './Card';
import '../styles/TripleTriadReact.scss';

const CARD_PATH = "./images/cards"; // cards have to be in public/images/cards
const TEST_CARD = CardData[0];

const BOARD = [

]

function GameManager() {

    const cardImagePath = TEST_CARD.img;

    return (
        <div className="triple-triad-container">

            {/* Player 1 Hand */}
            <div className="hand">
                {Array(5).fill(0).map((_, i) => (<div key={i} className="card card--blue-card">
                    <img src={`${CARD_PATH}/${cardImagePath}`} alt="Card" />
                </div>))}

                <div className="score">5</div>
            </div>

            {/* BOARD */}
            <div className="board">
                {Array(9).fill(0).map((_, i) => (<div key={i} className="cell">
                    <Card card={TEST_CARD} color="red" />
                </div>))}
            </div>

            {/* Player 2 Hand */}
            <div className="hand">
                {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="card card--red-card">
                        <img src={`${CARD_PATH}/${cardImagePath}`} alt="Card" />
                    </div>
                ))}

                <div className="score">5</div>
            </div>

        </div>
    )
}

export default GameManager