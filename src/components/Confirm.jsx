// ConfirmDialog.jsx
import React from 'react';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  const handleOverlayClick = () => {
    onCancel(); // 👈 close on outside click
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // 👈 prevent modal body click from closing
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal} onClick={handleModalClick}>
        <p>{message}</p>
        <div style={styles.buttons}>
          <button onClick={onConfirm} style={styles.confirm}>Yes</button>
          <button onClick={onCancel} style={styles.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    minWidth: '250px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  buttons: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  confirm: {
    background: 'red',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  cancel: {
    background: 'gray',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};
