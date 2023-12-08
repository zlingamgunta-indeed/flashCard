import {useHistory} from "react-router-dom";

function Deck({index, id, name, description, cardsLength, deleteDeck}) {
    const history = useHistory();
    return (
        <div className="decksList">
            <div>
                <h5>{name}</h5>
                <p>{cardsLength} cards</p>
            </div>
            <div>{description}</div>
            <div>
                <div>
                    <button onClick={() => {
                        history.push(`/decks/${id}`)
                    }}>View</button>
                    <button onClick={() => {
                        history.push(`/decks/${id}/study`)
                    }}>Study</button>
                </div>
                <button onClick={() => {
                    const answer = window.confirm("Delete this deck? \n \n You will not be able to recover it.")
                    answer && deleteDeck(index, name, description)
                }}>Delete</button>
            </div>
        </div>
    )
}

export default Deck;