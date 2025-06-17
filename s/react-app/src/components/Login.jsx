// react-app/src/components/Login.jsx
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // Импортируем useSearchParams
import Modal from './Modal';

function Login({ loginUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const [searchParams] = useSearchParams(); // Хук для чтения параметров запроса
  const redirectTo = searchParams.get('redirect'); // Получаем значение параметра 'redirect'

  const handleLogin = () => {
    setError(null);
    // Передаем loginUser путь для перенаправления
    const success = loginUser(username, password, redirectTo); 
    if (!success) {
      setModalTitle('Ошибка входа');
      setModalMessage('Неверное имя пользователя или пароль.');
      setShowModal(true);
      setError('Неверные данные');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalMessage('');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', maxWidth: '400px', margin: '50px auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Вход</h2>
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
      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: '12px 20px',
          backgroundColor: '#70A2FF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
          marginTop: '15px',
          transition: 'background-color 0.3s ease'
        }}
      >
        Войти
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <p style={{ marginTop: '20px', color: '#555' }}>
        Нет аккаунта?{' '}
        <Link to="/register" style={{ color: '#3f51b5', textDecoration: 'none', fontWeight: 'bold' }}>
          Зарегистрируйтесь!
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

export default Login;
