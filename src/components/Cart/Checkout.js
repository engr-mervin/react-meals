import styles from "./Checkout.module.css";
import CheckoutInput from "./CheckoutInput";
import useInputValidity from "../../hooks/use-inputValidity";
import { useState, useEffect } from "react";

const checkIfBlank = function (text) {
  return text.trim() !== "";
};

const checkIf5 = function (text) {
  return text.trim().length === 5;
};

const Checkout = function (props) {
  const [name, nameProps] = useInputValidity("", checkIfBlank);
  const [street, streetProps] = useInputValidity("", checkIfBlank);
  const [postal, postalProps] = useInputValidity("", checkIf5);
  const [city, cityProps] = useInputValidity("", checkIfBlank);

  const [formIsValid, setFormIsValid] = useState(false);

  const inputs = [name, street, postal, city];
  useEffect(() => {
    setFormIsValid(
      name.isValid && street.isValid && postal.isValid && city.isValid
    );
  }, [name.isValid, street.isValid, postal.isValid, city.isValid]);

  const confirmHandler = function (e) {
    e.preventDefault();
    if (!formIsValid) {
      inputs.forEach((input) => {
        input.touch();
        console.log(input);
        if (!input.isValid) {
          input.reference.current.focus();
        }
      });
      return;
    }
    const userData = {
      name: name.value,
      street: street.value,
      postalCode: postal.value,
      city: city.value,
    };
    props.onSubmit(userData);
  };
  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <CheckoutInput
        id="name"
        type="text"
        label="Your Name"
        className={
          nameProps.hasError
            ? `${styles.control} ${styles.invalid}`
            : styles.control
        }
        value={name.value}
        {...nameProps}
        ref={name.reference}
        errorText="Please fill in this field."
      ></CheckoutInput>
      <CheckoutInput
        id="street"
        type="text"
        label="Street"
        className={
          streetProps.hasError
            ? `${styles.control} ${styles.invalid}`
            : styles.control
        }
        value={street.value}
        {...streetProps}
        ref={street.reference}
        errorText="Please fill in this field."
      ></CheckoutInput>
      <CheckoutInput
        id="postal"
        type="text"
        label="Postal Code"
        className={
          postalProps.hasError
            ? `${styles.control} ${styles.invalid}`
            : styles.control
        }
        value={postal.value}
        ref={postal.reference}
        {...postalProps}
        errorText="Please input a valid postal code."
      ></CheckoutInput>
      <CheckoutInput
        id="city"
        type="text"
        label="City"
        className={
          cityProps.hasError
            ? `${styles.control} ${styles.invalid}`
            : styles.control
        }
        value={city.value}
        ref={city.reference}
        errorText="Please fill in this field."
        {...cityProps}
      ></CheckoutInput>
      <div className={styles.actions}>
        <button type="button" onClick={props.onClick}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
