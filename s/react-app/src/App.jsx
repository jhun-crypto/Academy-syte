
 import React, { useState, useEffect,  } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import ProgramPage from './components/ProgramPage';
import Dashboard from './components/Dashboard';



import './components/Footer.css';
import './components/HamburgerMenu.css';


const PrivateRoute = ({ children, user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true }); 
    }
  }, [user, navigate]);
  return user ? children : null;
};

function App() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Ошибка при парсинге currentUser из localStorage:", e);
      localStorage.removeItem('currentUser');
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
      if (['/dashboard'].includes(window.location.pathname)) {
        navigate('/programs', { replace: true });
      }
    }
  }, [user, navigate]);

  
  const closeBurgerMenu = () => {
    const menuCheckbox = document.getElementById('menuCheckbox');
    if (menuCheckbox && menuCheckbox.checked) {
      menuCheckbox.checked = false;
    }
  };

  const registerUser = (newUserData, redirectPathFromUrl) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === newUserData.username)) {
      return false;
    }
    const updatedUsers = [...users, { ...newUserData, payments: [] }];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser(newUserData);
    
    const finalRedirectPath = redirectPathFromUrl || '/programs';

    if (finalRedirectPath === '/') {
        window.location.href = '/';
    } else {
        navigate(finalRedirectPath, { replace: true });
    }
    closeBurgerMenu(); 
    return true;
  };

  const loginUser = (username, password, redirectPathFromUrl) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);

      const finalRedirectPath = redirectPathFromUrl || '/programs';

      if (finalRedirectPath === '/') {
          window.location.href = '/';
      } else {
          navigate(finalRedirectPath, { replace: true });
      }
      closeBurgerMenu(); 
      return true;
    }
    return false;
  };

  const addPaymentToUser = (course, currentUser) => {
    const newPayment = {
      id: Date.now(),
      courseName: course.name,
      amount: course.price,
      date: new Date().toLocaleString(),
      courseDetails: course
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => {
      if (u.username === currentUser.username) {
        const updatedPayments = [...(u.payments || []), newPayment];
        return { ...u, payments: updatedPayments };
      }
      return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const updatedCurrentUser = { ...currentUser, payments: [...(currentUser.payments || []), newPayment] };
    setUser(updatedCurrentUser);
    return true;
  };

  const updatePaymentsForUser = (updatedPayments, currentUser) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => {
      if (u.username === currentUser.username) {
        return { ...u, payments: updatedPayments };
      }
      return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser({ ...currentUser, payments: updatedPayments });
  };

  const handleLogout = () => {
    setUser(null);
    closeBurgerMenu(); 
  };

  
  const handleAnchorLinkClick = (hash) => {
    window.location.href = `/${hash}`; 
    closeBurgerMenu(); 
  };

  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      <header className="main-header">
        
        <span role="navigation" className="mobile-only-nav">
          <div id="menuToggle">
            <input type="checkbox" id="menuCheckbox" />
            <span className="so"></span>
            <span className="so"></span>
            <span className="so"></span>
            <ul id="menu">
              <li>
                <h3 className="logoo">Fortune Academy</h3> 
              </li>
              <li>
                <a href="/" onClick={(e) => { e.preventDefault(); handleAnchorLinkClick('#tech'); }}>
                  <label htmlFor="menuCheckbox">Главная</label> 
                </a>
              </li>
              <li>
                <a href="/#tech" onClick={(e) => { e.preventDefault(); handleAnchorLinkClick('#tech'); }}>
                  <label htmlFor="menuCheckbox">Наставники</label> 
                </a>
              </li>
              <li>
                
                <Link to="/programs" onClick={closeBurgerMenu}>
                    <label htmlFor="menuCheckbox">Программы</label>
                </Link>
                  
                
              </li>
              <li>
                <a href="/#otz" onClick={(e) => { e.preventDefault(); handleAnchorLinkClick('#otz'); }}> 
                  <label htmlFor="menuCheckbox">Отзывы</label>
                </a>
              </li>
              <li>
                <a href="/#kont" onClick={(e) => { e.preventDefault(); handleAnchorLinkClick('#kont'); }}> 
                  <label htmlFor="menuCheckbox">Контакты</label>
                </a>
              </li>
              <li>
                <a href="/#zaps" onClick={(e) => { e.preventDefault(); handleAnchorLinkClick('#zaps'); }}> 
                  <label htmlFor="menuCheckbox">Консультация</label>
                </a>
              </li>
              <li>
                <Link to="/dashboard" onClick={closeBurgerMenu}> 
                  <label htmlFor="menuCheckbox">Личный кабинет</label>
                </Link>
              </li>
              <li id="authButtonContainerMobile">
                {user ? (
                  <label htmlFor="menuCheckbox" onClick={handleLogout}>Выйти</label> 
                ) : (
                  <Link to="/login?redirect=/app/programs" onClick={closeBurgerMenu}> 
                    <label htmlFor="menuCheckbox">Войти</label>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </span>


        <nav className="main-nav pc-nav">
          <div className="item">
            <p className="logo-text">Fortune Academy</p>
          </div>
          <div className="item2">
                <ul className="main-nav-list pc-nav-list">
            <li className="main-nav-item pc-nav-item">
              <a href="/" className="main-nav-link pc-nav-link">Главная</a>
            </li>
            <li className="main-nav-item pc-nav-item">
              <a href="/#tech" className="main-nav-link pc-nav-link">Наставники</a>
            </li>
            <li className="main-nav-item pc-nav-item">
              <a href="/#otz" className="main-nav-link pc-nav-link">Отзывы</a>
            </li>
            <li className="main-nav-item pc-nav-item">
              <a href="/#kont" className="main-nav-link pc-nav-link">Контакты</a>
            </li>
            <li className="main-nav-item pc-nav-item">
              <Link to="/programs" className="main-nav-link pc-nav-link">Программы</Link>
            </li>
            <li className="main-nav-item pc-nav-item">
              <Link to="/dashboard" className="main-nav-link pc-nav-link">Личный кабинет</Link>
            </li>
            <li className="main-nav-item pc-nav-item">
              {user ? (
                <button onClick={handleLogout} className="main-nav-button logout-btn pc-nav-button">
                  Выйти
                </button>
              ) : (
                <Link to="/login" className="main-nav-link login-btn pc-nav-link">
                  Войти
                </Link>
              )}
            </li>
          </ul>
          </div>
          
        </nav>
      </header>
      
      
      <div style={{ flexGrow: 1 }}> 
        <Routes>
          <Route path="/" element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h1>Welcome to the Fortune Academy React App!</h1>
              <p>Use the navigation above to get started.</p>
            </div>
          } />
          <Route path="/programs" element={<ProgramPage user={user} addPayment={addPaymentToUser} />} />

          {/* Login and Register routes */}
          <Route path="/login" element={<Login loginUser={loginUser} />} />
          <Route path="/register" element={<Register registerUser={registerUser} />} />
          
          {/* Protected Dashboard route */}
          <Route path="/dashboard" element={
            <PrivateRoute user={user}>
              <Dashboard user={user} updatePaymentsForUser={updatePaymentsForUser} handleLogout={handleLogout} />
            </PrivateRoute>
          } />
        </Routes>
      </div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <h2>Fortune Academy</h2>
            <p>Академия лидерства и предпринимательства для подростков</p>
          </div>
          <div className="footer-contacts">
            <h3>Контакты</h3>
            <p>г. Петропавловск, ул. Карима Сутюшева, 60<br/>БЦ Kvartal, офис 816 (8 этаж)</p>
            <p>+7 777 123 45 67</p>
            <p>academy@fortune.kz</p>
          </div>
          <div className="footer-social">
            <h3>Мы в соцсетях</h3>
            <a href="https://www.instagram.com/fortune__academy/" target="_blank" rel="noopener noreferrer">Instagram</a><br/>
            <a href="https://t.me/+77054120771" target="_blank" rel="noopener noreferrer">Telegram</a> <br/>
            <a href="https://api.whatsapp.com/send/?phone=77054120771&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%0A%0A%D0%9F%D0%B8%D1%88%D1%83+%D0%B8%D0%B7+%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F+2%D0%93%D0%98%D0%A1.%0A%0A&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Fortune Academy. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

const AppWrapper = () => (
    <Router basename="/app">
        <App />
    </Router>
);

export default AppWrapper;
