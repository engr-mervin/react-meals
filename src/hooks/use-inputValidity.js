import { useState } from "react";
import { useRef } from "react";

const useInputValidity = function (initialValue, checkValidityFunction) {
  const reference = useRef();
  const [isTouched, setIsTouched] = useState(false);
  const [value, setValue] = useState(initialValue);

  const isValid = checkValidityFunction(value);
  const hasError = !isValid && isTouched;

  const onChange = function (e) {
    setValue(e.target.value);
  };

  const onBlur = function () {
    setIsTouched(true);
  };

  const touch = function () {
    setIsTouched(true);
  };
  const reset = function () {
    setIsTouched(false);
    setValue("");
  };

  return [
    {
      value,
      isValid,
      reset,
      touch,
      reference,
    },
    {
      onBlur,
      onChange,
      hasError,
    },
  ];
};

export default useInputValidity;
