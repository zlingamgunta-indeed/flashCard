import Deck from "./Deck";
import {useEffect, useState} from "react";
import {deleteDeck, listDecks, readDeck} from "../utils/api";

function DeckList() {
    const [decksList, setDecksList] = useState([]);
    const deleteDeckObject = (deckIndex, name, description) => {
        const abortController = new AbortController();
        const deckIdFromList = decksList.find((deck) => deck.name === name && deck.description === description).id
        deleteDeck(deckIdFromList, abortController.signal)
            .then(r => setDecksList((currentDeckList) => currentDeckList.filter((deck, index) => index !== deckIndex)))
    }
    useEffect(() => {
        const abortController = new AbortController();
        async function readDecks() {
            const json = await listDecks(abortController.signal);
            setDecksList(json)
        }
        readDecks();
    }, [])
    if (decksList.length > 0) {
        return (
            <div>
                {decksList.map((deck, index) => <Deck
                    key={index}
                    index={index}
                    name={deck.name}
                    description={deck.description}
                    cardsLength={deck.cards.length}
                    deleteDeck={deleteDeckObject}
                />)}
            </div>
        )
    }
    if (decksList.length === 0) {
        return <h4>No Decks Found. Create one....</h4>
    }
    return <p>Loading...</p>
}

export default DeckList;