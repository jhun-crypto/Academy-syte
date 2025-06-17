// src/components/Modal.jsx
import React from 'react';

function Modal({ isOpen, onClose, onConfirm, title, message, confirmText = 'ОК', cancelText = 'Отмена', children }) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {title && <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '10px' }}>{title}</h3>}
        {message && <p style={{ color: '#555', fontSize: '1.1em', lineHeight: '1.5' }}>{message}</p>}
        
        {children} {/* Рендерим произвольные дочерние элементы здесь */}

        {/* Рендерим стандартные кнопки, только если не предоставлены children и есть onConfirm или onClose */}
        {!children && (onConfirm || onClose) && (
          <div style={{ display: 'flex', justifyContent: onConfirm ? 'space-around' : 'center', gap: '10px', marginTop: '20px' }}>
            {onConfirm && (
              <button
                onClick={handleConfirm}
                style={{
                  padding: '12px 25px',
                  backgroundColor: '#70A2FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1em',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease'
                }}
              >
                {confirmText}
              </button>
            )}
            {onClose && (
              <button
                onClick={handleCancel}
                style={{
                  padding: '12px 25px',
                  backgroundColor: onConfirm ? '#f44336' : '#70A2FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1em',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease'
                }}
              >
                {cancelText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
