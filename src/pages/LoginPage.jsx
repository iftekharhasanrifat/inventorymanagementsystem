import React, { useContext,useState ,useEffect} from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import { ErrorContext, UserContext } from '../App';
import axios from 'axios';
const  LoginPage=()=> {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useContext(ErrorContext);
  const navigate = useNavigate();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/');
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMsg('');
    const user = {
        username: username,
        password: password
    }
    if (!username || !password) {
        setErrorMsg('Please fill in both fields.');
        return;
      }
    const url = `http://localhost:5555/auth/login`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            if (typeof (data) == 'object') {
                setLoggedInUser(data);
                alert('Login successful!');
                // sessionStorage.setItem('user',JSON.stringify(data.username));
                localStorage.setItem('user',JSON.stringify(data.username));
            }
            else {
                setErrorMessage(data)
            }
            navigate(from);
            console.log(data)
        })

    

    // if (username === 'user' && password === 'pass') {
    //   alert('Login successful!');
    //   // You can redirect the user or perform additional actions here.
    // } else {
    //   setErrorMsg('Invalid username or password.');
    // }
  };

  // Inline styles
  const pageStyle = {
    margin: 0,
    padding: 0,
    background: '#f2f2f2',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  const containerStyle = {
    background: '#fff',
    padding: '40px 30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '320px'
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333'
  };

  const inputGroupStyle = {
    position: 'relative',
    marginBottom: '30px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.3s',
    background: 'none'
  };

  const baseLabelStyle = {
    position: 'absolute',
    left: '12px',
    background: '#fff',
    padding: '0 5px',
    pointerEvents: 'none',
    transition: 'top 0.3s, fontSize 0.3s, color 0.3s'
  };

  const usernameLabelStyle = {
    ...baseLabelStyle,
    top: (usernameFocused || username !== '') ? '0' : '50%',
    transform: (usernameFocused || username !== '') ? 'translateY(0)' : 'translateY(-50%)',
    fontSize: (usernameFocused || username !== '') ? '12px' : '16px',
    color: (usernameFocused || username !== '') ? '#007BFF' : '#aaa'
  };

  const passwordLabelStyle = {
    ...baseLabelStyle,
    top: (passwordFocused || password !== '') ? '0' : '50%',
    transform: (passwordFocused || password !== '') ? 'translateY(0)' : 'translateY(-50%)',
    fontSize: (passwordFocused || password !== '') ? '12px' : '16px',
    color: (passwordFocused || password !== '') ? '#007BFF' : '#aaa'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: buttonHovered ? '#059669' : '#10B981',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s'
  };

  const errorStyle = {
    color: '#E11D48',
    textAlign: 'center',
    marginTop: '15px'
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              style={{
                ...inputStyle,
                borderColor: usernameFocused ? '#007BFF' : '#ccc'
              }}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
              required
            />
            <label htmlFor="username" style={usernameLabelStyle}>
              Username
            </label>
          </div>
          <div style={inputGroupStyle}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              style={{
                ...inputStyle,
                borderColor: passwordFocused ? '#007BFF' : '#ccc'
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              required
            />
            <label htmlFor="password" style={passwordLabelStyle}>
              Password
            </label>
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            Login
          </button>
          {errorMessage && <div style={errorStyle}>{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
