import Navigation from "./Navigation";
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createDeck, updateDeck} from "../utils/api";
import {getDeck} from "../Layout";

function DeckForm({setDecksList}) {
    const history = useHistory()
    const location = useLocation();
    let [deckObject, setDeckObject] = useState({
        name: '',
        description: ''
    });
    const {deckId} = useParams();

    useEffect(() => {
        if (location.pathname !== "/decks/new") {
            getDeck(setDeckObject, deckId)
        }
    }, [deckId])

    return (
        <div>
            <Navigation>
                {location.pathname === "/decks/new"
                    ? <li>Create Deck</li>
                    : <div>
                        <li><Link to={`/decks/${deckId}`}>{deckObject.name}</Link></li>
                        <li>/</li>
                        <li>Study</li>
                    </div>}
            </Navigation>
            {location.pathname === "/decks/new" ? <h1>Create Deck</h1> : <h1>Edit Deck</h1>}
            <form onSubmit={(event) => {
                event.preventDefault()
                const abortController = new AbortController();
                if (location.pathname === "/decks/new") {
                    createDeck(deckObject, abortController.signal).then(r => {
                        setDecksList((oldList) => [...oldList, {...r, cards: []}])
                        setDeckObject({name: '', description: ''})
                        history.push(`/decks/${r.id}`)
                    })
                } else {
                    updateDeck({id: deckId, ...deckObject}, abortController.signal).then(r => history.push(`/decks/${deckId}`))
                }
            }}>
                <label htmlFor="name">Name</label>
                <br/>
                <input size={100} id="name" onChange={(event) => {
                    setDeckObject({...deckObject, name: event.target.value})
                }} name="name" value={deckObject.name} placeholder="Deck Name" />
                <br/>
                <br/>
                <label htmlFor="description">Description</label>
                <br/>
                <textarea cols={100} onChange={(event) => {
                    setDeckObject({...deckObject, description: event.target.value})
                }}  rows={4} id="description" value={deckObject.description} name="description" placeholder="Brief description of the deck" />
                <br/>
                <br/>
                <button onClick={() => history.push("/")}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default DeckForm;