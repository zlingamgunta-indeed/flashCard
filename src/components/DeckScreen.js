import Navigation from "./Navigation";
import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {deleteCard, readDeck} from "../utils/api";

function getCardId(deckId, abortController, card) {
    return readDeck(deckId, abortController.signal)
        .then(res => res.cards.find((eachCard) => eachCard.front === card.front && eachCard.back === card.back));
}

function DeckScreen() {
    const {deckId} = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [cards, setCard] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(r => {
            setDeck(r)
            setCard(r.cards)
        })
        // getDeck(setDeck, deckId)
    }, [deckId])
    if (Object.keys(deck).length === 0) {
        return 'Loading...'
    }
    return (
        <div>
            <Navigation>
                <li>React Router</li>
            </Navigation>
            <h5>{deck.name}</h5>
            <p>{deck.description}</p>
            <div className="deckScreenButtons">
                <button onClick={() => history.push(`/decks/${deckId}/edit`)}>Edit</button>
                <button onClick={() => history.push(`/decks/${deckId}/study`)}>Study</button>
                <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add Cards</button>
                <button>Delete</button>
            </div>
            <br/>
            <h2>Cards</h2>
            {cards.map((card, index) => (
                <div key={index} className="decksList">
                    <div>
                        <p>{card.front}</p>
                        <p>{card.back}</p>
                    </div>
                    <button onClick={() => {
                        const abortController = new AbortController();
                        getCardId(deckId, abortController, card)
                            .then((res) => history.push(`/decks/${deckId}/cards/${res.id}/edit`));
                    }}>Edit</button>
                    <button onClick={() => {
                        const answer = window.confirm("Delete this card? \n \n You will not be able to recover it.")
                        if (answer === true) {
                            const abortController = new AbortController();
                            getCardId(deckId, abortController, card)
                                .then(r => {
                                    deleteCard(r.id, abortController.signal).then(r => setCard(cards.filter((eachCard) => eachCard.front !== card.front && eachCard.back !== card.back)))
                                })
                        }
                    }}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default DeckScreen;