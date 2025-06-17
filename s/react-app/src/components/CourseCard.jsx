// src/components/CourseCard.jsx
import React from 'react';
import './CourseCard.css';

function CourseCard({ course, showActionButton, onAction, actionButtonText, paymentDate, showDeleteButton, onDelete }) {

  // Если courseDetails был сохранен при оплате, используем его
  // Иначе, если 'course' - это объект, переданный напрямую (как с ProgramPage), используем его
  const moduleData = course.courseDetails || course;

  return (
    <div className="course-card">
      <h3 className="module-title-card">{moduleData.name} {moduleData.period}</h3>
      <p className="module-focus-card">{moduleData.focus}</p>

      <ul className="module-skills-list-card">
        {moduleData.skills && moduleData.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      {/* Отображаем возрастную группу, если она есть (актуально для истории покупок) */}
      {moduleData.ageGroup && <p className="module-age-group-card">Возрастная группа: {moduleData.ageGroup}</p>}

      {moduleData.price && <p className="module-price-card">Цена: {moduleData.price}</p>}
      
      {paymentDate && <p className="payment-date">Оплачено: {paymentDate}</p>}

      {showActionButton && (
        <button onClick={() => onAction(moduleData)} className="action-button">
          {actionButtonText}
        </button>
      )}

      {showDeleteButton && (
        <button
          onClick={onDelete}
          className="delete-button"
        >
          Удалить
        </button>
      )}
    </div>
  );
}

export default CourseCard;
