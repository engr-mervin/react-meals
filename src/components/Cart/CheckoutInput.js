import React from "react";

const CheckoutInput = React.forwardRef(function (props, ref) {
  return (
    <div className={props.className}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={ref}
        onChange={props.onChange}
        onBlur={props.onBlur}
        type={props.type}
        id={props.id}
      ></input>
      {!props.hasError ? "" : <p>{props.errorText}</p>}
    </div>
  );
});

export default CheckoutInput;
