import {
  types,
  SnapshotIn,
  Instance,
  destroy,
  getParent,
} from "mobx-state-tree";

export const Tag = types.model({
  name: types.string,
});

export const Present = types
  .model({
    name: types.optional(types.string, ""),
    price: types.optional(types.number, 0),
    tags: types.optional(types.array(Tag), []),
  })
  .actions((self) => ({
    changeName(newName: string) {
      self.name = newName;
    },
    changePrice(newPrice: number) {
      self.price = newPrice;
    },
    remove() {
      getParent<typeof Cousin>(self, 2).remove(self);
    },
  }));

export const Cousin = types
  .model({
    name: types.optional(types.string, ""),
    question: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    presents: types.optional(types.array(Present), []),
  })
  .actions((self) => ({
    addPresent(present: SnapshotIn<typeof Present> | Instance<typeof Present>) {
      self.presents.push(present);
    },
    remove(item: SnapshotIn<typeof Present>) {
      destroy(item);
    },
  }))
  .views((self) => ({
    get totalItems() {
      return self.presents.length;
    },
    get totalPrice() {
      return self.presents.reduce((sum, entry) => sum + entry.price, 0);
    },
  }));
