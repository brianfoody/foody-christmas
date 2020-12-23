import { types } from "mobx-state-tree";

export const Todo = types
  .model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setName(newName: string) {
      self.name = newName;
    },

    toggle() {
      self.done = !self.done;
    },
  }));
