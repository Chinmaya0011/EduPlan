// src/components/Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import style from '../styles/Modal.module.css'; // Import modal styles

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // If not open, don't render the modal

  return ReactDOM.createPortal(
    <div className={style.modalBackdrop} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
