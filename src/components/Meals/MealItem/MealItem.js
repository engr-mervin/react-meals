import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import { useContext } from "react";

const MealItem = function (props) {
  const cartContext = useContext(CartContext);
  const price = `$ ${props.meal.price.toFixed(2)}`;

  const addToCartHandler = function (amount) {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={styles.description}>{props.meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm
          onAddToCart={addToCartHandler}
          id={props.id}
          type="submit"
        ></MealItemForm>
      </div>
    </li>
  );
};

export default MealItem;
