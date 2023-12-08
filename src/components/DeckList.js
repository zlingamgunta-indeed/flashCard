import Deck from "./Deck";
import {deleteDeck} from "../utils/api";

function DeckList({decksList, setDecksList}) {
    const deleteDeckObject = (deckIndex, name, description) => {
        const abortController = new AbortController();
        const deckIdFromList = decksList.find((deck) => deck.name === name && deck.description === description).id
        deleteDeck(deckIdFromList, abortController.signal)
            .then(r => setDecksList((currentDeckList) => currentDeckList.filter((deck, index) => index !== deckIndex)))
    }
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