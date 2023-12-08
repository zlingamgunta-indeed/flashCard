import React from "react";
import Header from "./Header";
import {Route, Switch, useHistory} from "react-router-dom";
import NotFound from "./NotFound";
import Decks from "../components/Decks";
import Deck from "../components/Deck";
import DeckList from "../components/DeckList";
import {readDeck} from "../utils/api";


export function getDeck(setDeck, deckId) {
    const abortController = new AbortController();
    async function getDeck() {
        const response = await readDeck(deckId, abortController.signal)
        setDeck(response)
    }
    getDeck();
}

function Layout() {
    const history = useHistory();
  return (
    <>
      <Header />
      <div className="container">
          <Switch>
              <Route exact path="/">
                  <button onClick={() => {
                      history.push("/decks/new")
                  }}>Create Deck</button>
                  <DeckList />
              </Route>
              <Route path="/decks">
                  <Decks />
              </Route>
              <Route>
                  <NotFound />
              </Route>
          </Switch>
      </div>
    </>
  );
}

export default Layout;
