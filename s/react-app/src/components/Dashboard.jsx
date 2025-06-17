// src/components/Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';
import CourseCard from './CourseCard';
import Modal from './Modal'; // Импортируем модальное окно

function Dashboard({ user, updatePaymentsForUser, handleLogout }) {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalConfirmAction, setModalConfirmAction] = useState(null);
  const [modalConfirmText, setModalConfirmText] = useState('ОК');
  const [modalCancelText, setModalCancelText] = useState('Отмена');


  if (!user) {
    return <p>Пользователь не авторизован.</p>;
  }

  const username = user.username || 'Гость';

  const handleDeletePayment = (paymentIdToDelete) => {
    setModalTitle('Подтверждение удаления');
    setModalMessage('Вы уверены, что хотите удалить эту программу из истории оплат?');
    setModalConfirmAction(() => { // Используем колбэк для сохранения paymentIdToDelete
      return () => {
        const updatedPayments = user.payments.filter(payment => payment.id !== paymentIdToDelete);
        updatePaymentsForUser(updatedPayments, user);
        setModalTitle('Успешно!');
        setModalMessage('Программа удалена из истории оплат.');
        setModalConfirmAction(null); // Сброс для информационного модала
        setModalCancelText('ОК'); // Меняем на "ОК" для информационного модала
      };
    });
    setModalConfirmText('Удалить');
    setModalCancelText('Отмена');
    setShowModal(true);
  };

  const handleClearPayments = () => {
    setModalTitle('Подтверждение очистки');
    setModalMessage('Вы уверены, что хотите полностью очистить историю оплат?');
    setModalConfirmAction(() => { // Используем колбэк
      return () => {
        const updatedPayments = [];
        updatePaymentsForUser(updatedPayments, user);
        setModalTitle('Успешно!');
        setModalMessage('История оплат успешно очищена.');
        setModalConfirmAction(null); // Сброс для информационного модала
        setModalCancelText('ОК'); // Меняем на "ОК" для информационного модала
      };
    });
    setModalConfirmText('Очистить');
    setModalCancelText('Отмена');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalMessage('');
    setModalConfirmAction(null);
    setModalConfirmText('ОК');
    setModalCancelText('Отмена');
  };

  return (
    <div className='container'>
      <main>
        
        
        <div className="history">
          <div className="name_user">
              <h2>Личный кабинет: {username}</h2> 
              <h3>Мои программы:</h3>
          </div>
          

          {user.payments && user.payments.length > 0 && (
            <div className="fg">
                            <button
              onClick={handleClearPayments}
              style={{  border:'none', background:'none', cursor: 'pointer', marginBottom: '20px' }}
            >
              <img src="/app/trash.png" alt="trash"  style={{width:'10%'}}/>
            </button>
            </div>

          )}

          {user.payments && user.payments.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {user.payments.map((payment) => (
                <CourseCard
                  key={payment.id}
                  course={payment.courseDetails || { name: payment.courseName, price: payment.amount }}
                  showActionButton={false}
                  paymentDate={payment.date}
                  showDeleteButton={true}
                  onDelete={() => handleDeletePayment(payment.id)}
                  style={{
                      /* Стиль для каждой карточки внутри flex-контейнера */
                      /* Занимаем примерно 1/3 ширины за вычетом отступов.
                         flex-grow: 1 позволяет карточкам растягиваться
                         flex-shrink: 0 предотвращает их сжатие ниже min-width, если контента мало
                      */
                      flex: '1 0 calc(33.33% - 20px)', /* min-width 33.33% - gap, no shrink, allow grow */
                      maxWidth: '300px', /* Ограничиваем максимальный размер карточки */
                      boxSizing: 'border-box' /* Учитываем padding и border в размере */
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="noprgarm" style={{ textAlign: 'center', padding: '20px' }}>
              <p>Вы не приобрели ни одной программы</p>
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={showModal}
        title={modalTitle}
        message={modalMessage}
        onClose={closeModal}
        onConfirm={modalConfirmAction}
        confirmText={modalConfirmText}
        cancelText={modalCancelText}
      />
    </div>
  );
}

export default Dashboard;
