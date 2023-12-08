import {useEffect, useState} from "react";
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import {getDeck} from "../Layout";
import Navigation from "./Navigation";
import {createCard, readCard, updateCard} from "../utils/api";

function CardForm() {
    const [card, setCard] = useState({});
    const {deckId, cardId} = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const location = useLocation();

    useEffect(() => {
        const abortController = new AbortController();
        getDeck(setDeck, deckId)

        if (location.pathname.includes("edit")) {
            readCard(cardId, abortController.signal).then(value => setCard(value));
        }

    }, [deckId])
    return (
        <div>

            <Navigation>
                <li><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li>/</li>
                <li>Add Card</li>
            </Navigation>

            <h4>{`${deck.name}: Add Card`}</h4>

            <form onSubmit={(event) => {
                const abortController = new AbortController();
                event.preventDefault();
                if (location.pathname.includes("edit")) {
                    updateCard(card, abortController.signal).then(r => setCard({front: '', back: ''}));
                } else {
                    createCard(deckId, card, abortController.signal).then(r => setCard({front: '', back: ''}));
                }
            }}>
                <label htmlFor="front">Front</label>
                <br/>

                <textarea cols={100} onChange={(event) => {
                    setCard({ ...card, front: event.target.value})
                }}  rows={4} id="front" value={card.front} name="front" placeholder="Front side of card" />
                <br/>
                <label htmlFor="back">Back</label>
                <br/>

                <textarea cols={100} onChange={(event) => {
                    setCard({ ...card, back: event.target.value})
                }}  rows={4} value={card.back} id="back" name="back" placeholder="Back side of card" />
                <br/>

                <button onClick={() => history.push(`/decks/${deckId}`)}>Done</button>

                <button type="submit">Save</button>
            </form>

        </div>
    )
}

export default CardForm;