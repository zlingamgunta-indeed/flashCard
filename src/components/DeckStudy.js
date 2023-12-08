import {Link, useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Navigation from "./Navigation";
import {getDeck} from "../Layout";

function NotEnoughCards({history, deckId, deck}) {
    return (
        <div>
            <h2>Not enough cards.</h2>
            <h4>You need atleast 3 cards to study. There are {deck.cards.length} cards in this deck.</h4>
            <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add Cards</button>
        </div>
    )
}
function DeckStudy() {
    const {deckId} = useParams();
    const [deck, setDeck] = useState({});
    const {id, name, cards} = deck;
    const [cardIndex, setCardIndex] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const[flip, setFlip] = useState(0);
    const history = useHistory();

    useEffect(() => {
        getDeck(setDeck, deckId)
    }, [deckId])
    return (
        <div>
            <Navigation>
                <li><Link to={`/decks/${deckId}`}>{name}</Link></li>
                <li>/</li>
                <li>Study</li>
            </Navigation>
            <h1>{`${name}: Study`}</h1>

            {Object.keys(deck).length > 0 ? <div>

                { cards.length <= 2
                    ?
                    <NotEnoughCards history={history} deckId={deckId} deck={deck} />
                    :
                    <div>
                        <h6>{`Card ${cardIndex+1} of ${cards.length}`}</h6>

                        {flip === 0 ? <p>{cards[cardIndex].front}</p> : <p>{cards[cardIndex].back}</p>}

                        <button onClick={() => {
                            setFlip(1)
                            setShowNextButton(true)
                        }}>Flip</button>

                        {showNextButton
                            &&
                            <button onClick={() => {
                                setFlip(0)
                                setShowNextButton(false);
                                setCardIndex(cardIndex + 1)
                                if (cards.length - 1 === cardIndex) {
                                    const response = window.confirm("Restart cards? \n \n Click 'cancel' to return to home page.")
                                    if (response === true) {
                                        setCardIndex(0);
                                    } else {
                                        history.push("/");
                                    }
                                }
                            }}>Next</button>}
                    </div> }

            </div> : <p>Loading...</p>}
        </div>
    )
}

export default DeckStudy;