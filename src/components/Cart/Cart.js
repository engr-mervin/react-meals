import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = function (props) {
  const cartContext = useContext(CartContext);

  console.log(cartContext.totalAmount);
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

  return (
    <Modal onClose={props.onClick}>
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
          onClick={(e) => console.log(e)}
          disabled={!hasItems}
        >
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
