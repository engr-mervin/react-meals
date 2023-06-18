import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = function (props) {
  const overlay = document.getElementById("overlays");
  return (
    <>
      {createPortal(
        <div onClick={props.onClose} className={styles.backdrop}></div>,
        overlay
      )}
      {createPortal(
        <div className={styles.modal}>
          <div className={styles.content}>{props.children}</div>
        </div>,
        overlay
      )}
    </>
  );
};

export default Modal;
