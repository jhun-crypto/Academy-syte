// src/components/FAQSection.jsx
import React, { useState } from 'react';
import './FAQSection.css'; // Импортируем стили для FAQ

const faqData = [
  {
    question: "Как записаться на курс?",
    answer: "Чтобы записаться на курс, выберите нужный модуль на этой странице и нажмите кнопку 'Оплатить'. Если вы не авторизованы, система предложит вам войти или зарегистрироваться. После оплаты курс будет доступен в вашем личном кабинете."
  },
  {
    question: "Какова продолжительность каждого модуля?",
    answer: "1 модуль длится с ноября по январь (3 месяца), а 2 модуль – с февраля по май (4 месяца). Общая продолжительность полной программы составляет 7 месяцев."
  },
  {
    question: "Могу ли я оплатить курс в рассрочку?",
    answer: "На данный момент мы не предоставляем оплату в рассрочку. Оплата производится за каждый модуль целиком."
  },
  {
    question: "Предоставляются ли сертификаты по окончании курса?",
    answer: "Да, по успешному завершению каждого модуля и всей программы в целом выдаются сертификаты об окончании Fortune Academy."
  },
  {
    question: "Какие требования к участникам курса?",
    answer: "Наши программы предназначены для подростков в возрасте от 13 до 17 лет. Специальные предварительные знания не требуются, главное – желание развиваться и учиться."
  },
  {
    question: "Есть ли поддержка во время обучения?",
    answer: "Да, в течение всего периода обучения студентам доступна поддержка наставников, а также возможность задавать вопросы в общем чате группы."
  }
];

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2 className="faq-title">Часто задаваемые вопросы</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <button
              className={`faq-question ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </button>
            <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQSection;
