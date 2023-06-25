import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = function (state, action) {
  let updatedState = {
    items: [...state.items],
    totalAmount: state.totalAmount,
  };

  if (action.type === "ADD_ITEM") {
    const index = updatedState.items.findIndex(
      (item) => item.id === action.item.id
    );

    const found = index !== -1;

    if (found) {
      updatedState.items[index].amount += action.item.amount;
    } else {
      updatedState.items.push(action.item);
    }

    updatedState.totalAmount += action.item.price * action.item.amount;

    return updatedState;

    // const index = state.items.findIndex((item)=>item.id ===action.item.id);

    // const found = index !==-1;
    // const newAmount = state.items[index].amount + action.item.amount;
    // let updatedItems;
    // if(found){
    //   const updatedItem = {...state.items[index],amount: newAmount}
    //   updatedItems =
    // }
    // else{

    // }
  }
  if (action.type === "REMOVE_ITEM") {
    const index = updatedState.items.findIndex(
      (item) => item.id === action.item.id
    );

    console.log(updatedState, action.item.id);

    // const found = index !== -1;

    // if (!found) return updatedState;

    updatedState.items[index].amount -= action.item.amount;

    updatedState.totalAmount -= action.item.price * action.item.amount;

    if (updatedState.items[index].amount === 0) {
      updatedState.items.splice(index, 1);
    }

    return updatedState;
  }
  if (action.type === "CLEAR_ITEMS") {
    return {
      items: [],
      totalAmount: 0,
    };
  }
  /*
  








*/
  if (action.type === "TRY_UPDATE") {
    return state;
  }
  return defaultCartState;
};

const CartProvider = function (props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const clearCartHandler = function () {
    dispatchCartAction({ type: "CLEAR_ITEMS" });
  };

  const addItemToCartHandler = function (item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromCartHandler = function (item) {
    dispatchCartAction({ type: "REMOVE_ITEM", item: item });
  };
  const tryUpdate = function () {
    dispatchCartAction({ type: "TRY_UPDATE" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    update: tryUpdate,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
