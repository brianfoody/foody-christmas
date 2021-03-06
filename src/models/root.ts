import { useContext, createContext } from "react";
import { types, Instance, onSnapshot } from "mobx-state-tree";

import { Cousin } from "./cousins";

const RootModel = types.model({
  cousins: types.array(Cousin),
});

let initialState = RootModel.create({
  cousins: [
    {
      name: "Tom",
    },
    {
      name: "Emma",
    },
    {
      name: "Finn",
    },
    {
      name: "Aoife",
    },
  ],
});

const data = localStorage.getItem("rootState");

if (data) {
  const json = JSON.parse(data);
  if (RootModel.is(json)) {
    initialState = RootModel.create(json);
  }
}

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
  localStorage.setItem("rootState", JSON.stringify(snapshot));
});

export type RootInstance = Instance<typeof RootModel>;

const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
