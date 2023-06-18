import { createContext } from "react";

const ModalContext = createContext({
  shown: false,
});

export default ModalContext;
