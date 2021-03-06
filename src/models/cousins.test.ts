import { Present, Cousin } from "./cousins";
import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree";
import { reaction } from "mobx";

it("should create a model instance", () => {
  const item = Present.create({
    name: "Google Pixel 3",
    price: 499,
  });
  const patches: any = [];

  onPatch(item, (snapshot) => {
    patches.push(snapshot);
  });

  item.changeName("Google Pixel 4");
  item.changePrice(799);
  expect(patches).toMatchSnapshot();
});

it("should create a cart instance", () => {
  const cart = Cousin.create({
    presents: [
      {
        name: "Instance Item",
        price: 2.83,
        tags: [{ name: "first" }],
      },
    ],
  });
  expect(getSnapshot(cart)).toMatchSnapshot();
});

it("can add new presents to the cart", () => {
  const cart = Cousin.create();
  const states: any = [];

  onSnapshot(cart, (snapshot) => {
    states.push(snapshot);
  });

  cart.addPresent({
    name: "New Item 1",
    price: 1,
  });
  cart.addPresent({
    name: "New Item 2",
    price: 2,
  });

  expect(states).toMatchSnapshot();
});

it("can remove an item from the cart", () => {
  const cart = Cousin.create();
  const states: any = [];

  onSnapshot(cart, (snapshot) => {
    states.push(snapshot);
  });

  cart.addPresent({
    name: "New Item 1",
    price: 1,
  });
  cart.addPresent({
    name: "New Item 2",
    price: 2,
  });
  cart.presents[0].remove();
  cart.presents[0].remove();
  expect(states).toMatchSnapshot();
});

it("can rename an item in the cart", () => {
  const cart = Cousin.create();
  const patches: any = [];

  onPatch(cart, (snapshot) => {
    patches.push(snapshot);
  });

  cart.addPresent({
    name: "New Item 1",
    price: 1,
  });

  cart.presents[0].changeName("New Item (new)");
  expect(patches).toMatchSnapshot();
});

it("can return the total presents of the cart", () => {
  const cart = Cousin.create();

  cart.addPresent({
    name: "Item 1",
    price: 1,
  });

  expect(cart.totalItems).toBe(1);
});

it("can calculate the total price of the cart", () => {
  const cart = Cousin.create();

  cart.addPresent({
    name: "Item 1",
    price: 1,
  });
  cart.addPresent({
    name: "Item 2",
    price: 1,
  });

  expect(cart.totalPrice).toBe(2);
  let changed = 0;
  reaction(
    () => cart.totalPrice,
    () => changed++
  );

  expect(changed).toBe(0);
  cart.presents[0].changeName("Item 1 (new)");
  expect(changed).toBe(0);

  cart.presents[0].changePrice(2);
  expect(changed).toBe(1);
  expect(cart.totalPrice).toBe(3);
});
