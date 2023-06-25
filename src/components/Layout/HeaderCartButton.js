import styles from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = function (props) {
  const [bumpButton, setBumpButton] = useState(false);
  const cartContext = useContext(CartContext);

  const stylesButton = `${bumpButton ? styles.bump : ""} ${styles.button}`;
  useEffect(() => {
    setBumpButton(true);
    const timer = setTimeout(() => setBumpButton(false), 300);

    return () => clearTimeout(timer);
  }, [cartContext.totalAmount]);

  const numberOfCartItems = cartContext.items.reduce((acc, val) => {
    return acc + val.amount;
  }, 0);
  return (
    <button onClick={props.onClick} className={stylesButton}>
      <span className={styles.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
