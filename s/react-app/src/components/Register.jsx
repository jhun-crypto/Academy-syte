// react-app/src/components/Register.jsx
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // Импортируем useSearchParams
import Modal from './Modal';

function Register({ registerUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const [searchParams] = useSearchParams(); // Хук для чтения параметров запроса
  const redirectTo = searchParams.get('redirect'); // Получаем значение параметра 'redirect'

  const handleRegister = () => {
    setError(null);
    setPasswordError(null);

    if (!username || !password) {
      setModalTitle('Ошибка регистрации');
      setModalMessage('Введите имя пользователя и пароль.');
      setShowModal(true);
      setError('Введите имя пользователя и пароль');
      return;
    }

    if (password.length < 6) {
      setModalTitle('Ошибка регистрации');
      setModalMessage('Пароль должен быть не менее 6 символов.');
      setShowModal(true);
      setPasswordError('Пароль должен быть не менее 6 символов');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) {
      setModalTitle('Ошибка регистрации');
      setModalMessage('Пользователь с таким именем уже существует.');
      setShowModal(true);
      setError('Пользователь с таким именем уже существует');
      return;
    }

    const newUser = { username, password, payments: [] };
    // Передаем registerUser путь для перенаправления
    registerUser(newUser, redirectTo);
    
    setModalTitle('Регистрация успешна!');
    setModalMessage('Вы успешно зарегистрированы и будете перенаправлены.');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalMessage('');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', maxWidth: '400px', margin: '50px auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Регистрация</h2>
      <input
        placeholder="Имя пользователя"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ width: 'calc(100% - 20px)', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }}
      />
      <input
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: 'calc(100% - 20px)', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }}
      />
      {passwordError && <p style={{ color: 'orange', fontSize: '0.85em', margin: '-5px 0 10px 0' }}>{passwordError}</p>}
      <button
        onClick={handleRegister}
        style={{
          width: '100%',
          padding: '12px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
          marginTop: '15px',
          transition: 'background-color 0.3s ease'
        }}
      >
        Зарегистрироваться
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <p style={{ marginTop: '20px', color: '#555' }}>
        Уже есть аккаунт?{' '}
        <Link to="/login" style={{ color: '#3f51b5', textDecoration: 'none', fontWeight: 'bold' }}>
          Войдите!
        </Link>
      </p>

      <Modal
        isOpen={showModal}
        title={modalTitle}
        message={modalMessage}
        onClose={closeModal}
        cancelText="ОК"
      />
    </div>
  );
}

export default Register;
