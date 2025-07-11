import React from "react";
import "./ConfirmModal.css"; // Add your styles

const ConfirmModel = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="yes" onClick={onConfirm}>Yes</button>
          <button className="no" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModel;