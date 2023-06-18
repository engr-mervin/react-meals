import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import React from "react";
import CartContext from "../../../store/cart-context";
import { useState } from "react";
import { useRef } from "react";

const MealItemForm = function (props) {
  const [qtyIsValid, setQtyIsValid] = useState(1);
  const quantity = useRef();

  const changedInputHandler = function (e) {
    e.preventDefault();
    const enteredAmount = +quantity.current.value;
    if (enteredAmount === NaN || enteredAmount < 1 || enteredAmount > 5) {
      return;
    }
    setQtyIsValid(true);
  };

  const clickHandler = function (e) {
    e.preventDefault();
    const enteredAmount = +quantity.current.value;
    if (enteredAmount === NaN || enteredAmount < 1 || enteredAmount > 5) {
      setQtyIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
  };
  return (
    <form className={styles.form}>
      <Input
        ref={quantity}
        label="amount"
        input={{
          id: "amount-" + props.id,
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
          onChange: changedInputHandler,
        }}
      ></Input>
      <button type={props.type} onClick={clickHandler}>
        Add
      </button>
      {!qtyIsValid ? <p>Please enter a valid amount(1-5).</p> : <></>}
    </form>
  );
};

export default MealItemForm;
