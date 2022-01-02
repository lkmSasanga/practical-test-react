import { createStore } from "redux";

function cartReducer(state = { items: [] }, action) {
  console.log("redux");
  switch (action.type) {
    case "cart/add":
      let newItems = state.items;
      newItems.push(action.payload);
      return { items: newItems };
    case "cart/remove":
      const index = state.items.indexOf(action.payload);
      if (index > -1) {
        state.items.splice(index, 1);
      }
      return { items: state.items };
    default:
      return state;
  }
}

let store = createStore(cartReducer);

export default store;

store.subscribe(() => console.log(store.getState()));
