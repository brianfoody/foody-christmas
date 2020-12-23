import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Provider, rootStore } from "./models/root";
import { Todos } from "./components/Todos";

const App = () => {
  return (
    <Provider value={rootStore}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>

          <Todos />
        </header>
      </div>
    </Provider>
  );
};

export default App;
