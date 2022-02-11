import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppNavigator from "./components/AppNavigator";
import Pokedex from "./containers/Pokedex";
import PokemonDetails from "./containers/PokemonDetails";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Favorites from "./containers/Favorites";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppNavigator />
          <Routes>
            <Route exact path="/" element={<Pokedex></Pokedex>}></Route>
            <Route exact path="/pokemon/:id" element={<PokemonDetails />} />
            <Route exact path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
