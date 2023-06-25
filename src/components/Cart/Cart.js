import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useState } from "react";
const Cart = function (props) {
  const cartContext = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = function (item) {
    cartContext.removeItem({ ...item, amount: 1 });
  };

  const cartItemAddHandler = function (item) {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          name={item.name}
          price={item.price}
          amount={item.amount}
          key={"cartItem" + item.id + Math.random()}
          onRemove={cartItemRemoveHandler.bind(null, item)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const orderHandler = function () {
    setIsCheckout(true);
  };

  const submitOrderHandler = async function (userData) {
    console.log("this ran");
    setIsSubmitting(true);
    await fetch(
      "https://react-http-2ee63-default-rtdb.firebaseio.com/Orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartContext.items,
        }),
      }
    );
    cartContext.clearCart();

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const modalCheckout = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onClick} className={styles["button--alt"]}>
          Close
        </button>
        <button
          className={styles.button}
          onClick={orderHandler}
          disabled={!hasItems}
        >
          Order
        </button>
      </div>
    </>
  );

  let dispComponent = modalCheckout;

  if (isCheckout) {
    dispComponent = (
      <>
        {cartItems}
        <div className={styles.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <Checkout
          onSubmit={submitOrderHandler}
          onClick={props.onClick}
        ></Checkout>
      </>
    );
  }

  if (isSubmitting) {
    dispComponent = <p>Sending Order...</p>;
  }

  if (submitted) {
    dispComponent = (
      <>
        <p>Order sent!</p>
        <div className={styles.actions}>
          <button className={styles.button} onClick={props.onClick}>
            Okay
          </button>
        </div>
      </>
    );
  }

  return <Modal onClose={props.onClick}>{dispComponent}</Modal>;
};

export default Cart;
