// src/components/ProgramPage.jsx
import React, { useState } from 'react';
import CourseCard from './CourseCard';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import FAQSection from './FAQSection';

import './FAQSection.css';
// Новая структура данных для курсов (теперь модулей)
const courses = [
  {
    id: 1,
    name: "1 модуль",
    period: "(ноябрь – январь)",
    focus: "Фокус на развитии личных и коммуникативных навыков:",
    price: "10000 KZT", // Цена для модуля
    skills: [
      "Soft Skills",
      "Финансовая грамотность",
      "Ораторское мастерство",
      "Нестандартное мышление",
      "Медиаменеджмент",
      "Стиль и самопрезентация"
    ]
  },
  {
    id: 2,
    name: "2 модуль",
    period: "(февраль – май)",
    focus: "Углублённое погружение в бизнес-практики:",
    price: "12000 KZT", // Цена для модуля
    skills: [
      "Soft Skills (продвинутый уровень)",
      "Экономика и предпринимательство",
      "Дебаты",
      "Этикет",
      "Медиаменеджмент",
      "Блогерство и работа с медиа"
    ]
  },
  // Добавляйте сюда другие модули/курсы по аналогии
];

function ProgramPage({ user, addPayment }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Для основной модалки (ошибка/успех)
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalConfirmAction, setModalConfirmAction] = useState(null);
  const [modalCancelText, setModalCancelText] = useState('ОК');

  const [showAgeGroupModal, setShowAgeGroupModal] = useState(false); // Для модалки выбора возраста
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState(null); // Для хранения выбранного курса

  const handlePay = (course) => { // 'course' теперь содержит полную информацию о модуле
    if (!user) {
      setModalTitle('Необходима авторизация');
      setModalMessage('Для оплаты курса, пожалуйста, войдите или зарегистрируйтесь.');
      setModalConfirmAction(() => () => navigate('/login'));
      setModalCancelText('Закрыть');
      setShowModal(true); // Показываем модалку авторизации
      return;
    }

    // Если пользователь авторизован, показываем модалку выбора возрастной группы
    setSelectedCourseForPayment(course);
    setShowAgeGroupModal(true);
  };

  const handleAgeGroupSelection = (ageGroup) => {
    // Эта функция будет вызвана после выбора возрастной группы
    if (selectedCourseForPayment && user) {
      // Создаем объект платежа, включая возрастную группу
      const newPaymentCourseDetails = {
        ...selectedCourseForPayment, // Копируем все детали модуля
        ageGroup: ageGroup // Добавляем выбранную возрастную группу
      };

      // Вызываем addPayment с обновленными деталями курса
      addPayment(newPaymentCourseDetails, user); 
      
      setModalTitle('Оплата успешна!');
      setModalMessage(`Оплата за "${selectedCourseForPayment.name} ${selectedCourseForPayment.period}" для группы ${ageGroup} прошла успешно.`);
      setModalConfirmAction(null);
      setModalCancelText('ОК');
      setShowModal(true); // Показываем модалку успеха
    }
    setShowAgeGroupModal(false); // Закрываем модалку выбора возраста
    setSelectedCourseForPayment(null); // Очищаем выбранный курс
  };

  const closeModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalMessage('');
    setModalConfirmAction(null);
    setModalCancelText('ОК');
  };

  const closeAgeGroupModal = () => {
    setShowAgeGroupModal(false);
    setSelectedCourseForPayment(null); // Очищаем выбранный курс при отмене
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div className='hg'>Доступные программы обучения</div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course} // Передаем полный объект модуля
            showActionButton={true}
            onAction={handlePay}
            actionButtonText="Оплатить"
          />
        ))}
      </div>

      {/* Основная модалка для авторизации/успеха */}
      <Modal
        isOpen={showModal}
        title={modalTitle}
        message={modalMessage}
        onClose={closeModal}
        onConfirm={modalConfirmAction}
        cancelText={modalCancelText}
      />

      {/* Модалка для выбора возрастной группы */}
      <Modal
        isOpen={showAgeGroupModal}
        title="Выберите возрастную группу"
        onClose={closeAgeGroupModal}
        // Здесь мы передаем кастомные кнопки как children
        children={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button
              onClick={() => handleAgeGroupSelection('9-12 лет')}
              style={{
                padding: '12px 25px',
                backgroundColor: '#70A2FF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1.1em',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease'
              }}
            >
              9-12 лет
            </button>
            <button
              onClick={() => handleAgeGroupSelection('13-18 лет')}
              style={{
                padding: '12px 25px',
                backgroundColor: '#70A2FF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1.1em',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease'
              }}
            >
              13-18 лет
            </button>
            <button
              onClick={closeAgeGroupModal}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.9em',
                marginTop: '10px'
              }}
            >
              Отмена
            </button>
          </div>
        }
      />
      <FAQSection />
    </div>
  );
}

export default ProgramPage;
