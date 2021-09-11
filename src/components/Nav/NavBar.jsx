import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from '../../store/authAction';
import logo from '../../assets/logo.png';
import CarLogo from '../../assets/car.png';
import { Link } from 'react-router-dom';
import './NavBar.scss';

function NavBar(props) {
  // Nav Toggle
  const [navOpen, setNavOpen] = useState();
  const closeHandler = () => {
    setNavOpen(false);
  };
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.login);
  const user = useSelector((state) => state.auth.user);

  const logoutHandler = () => {
    dispatch(authAction.logout());
  };
  const [time, setTime] = useState('');
  useEffect(() => {
    const currentdate = new Date();
    if (currentdate.getHours() >= '18' || currentdate.getHours() <= '4') {
      setTime('Good Evening');
    } else if (
      currentdate.getHours() >= '12' &&
      currentdate.getHours() < '18'
    ) {
      setTime('Good Afternoon');
    } else {
      setTime('Morning');
    }
  }, [time]);

  return (
    <React.Fragment>
      <nav className='nav'>
        <div className='nav-container'>
          <Link to='/home' className='logo'>
            <img src={logo} className='logo-img' alt=''></img>
            <div className='logo-text'>WTFood</div>
          </Link>
          <ul className={navOpen ? 'nav-ul open' : 'nav-ul'}>
            {!login && (
              <li>
                <Link to='/login'>
                  <button className='nav-btn' onClick={closeHandler}>
                    Login
                  </button>
                </Link>
              </li>
            )}
            {!login && (
              <li>
                <Link to='/sign-up'>
                  <button className='nav-btn' onClick={closeHandler}>
                    Sign Up
                  </button>
                </Link>
              </li>
            )}
            {login && (
              <li>
                <p className='welcome'>{`${time} ${
                  user ? user.displayName.split(' ')[0] : ''
                }`}</p>
              </li>
            )}
            {login && (
              <li>
                <button className='nav-btn'>Profile</button>
              </li>
            )}
            {login && (
              <li>
                <button className='nav-btn' onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            )}

            <li>
              <img src={CarLogo} alt='' className='car-logo'></img>
            </li>
          </ul>
          <div className='nav-icon' onClick={() => setNavOpen(!navOpen)}>
            <i
              className={navOpen ? 'fas fa-times-circle' : 'fas fa-utensils'}
            ></i>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default NavBar;
