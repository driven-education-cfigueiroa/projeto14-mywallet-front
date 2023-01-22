import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import myWallet from '../api/myWallet';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login(event) {
    event.preventDefault();
    myWallet
      .fazerLogin({ email, password })
      .then((response) => {
        setUser(response.data);
        if (response.data.token !== null) {
          navigate('/home');
        }
      })
      .catch((error) => {
        window.alert(error.response.data);
      });
  }

  return (
    <LoginContainer>
      <h1>MyWallet</h1>
      <form onSubmit={login}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          type="email"
          value={email}
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          type="password"
          value={password}
          required
        />
        <button type="submit">ENTRAR</button>
      </form>
      <StyledLink to="/cadastro">
        <p>Primeira vez? Cadastre-se!</p>
      </StyledLink>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 90%;
  h1 {
    margin-bottom: 24px;
    width: 100%;
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    font-weight: 400;
    line-height: 50px;
    letter-spacing: 0em;
    text-align: center;
  }
  form {
    width: 100%;
    input {
      border-radius: 8px;
      border: none;
      color: #000;
      font-family: 'Raleway', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      height: 52px;
      line-height: 16px;
      padding-left: 14px;
      width: 100%;
      &::placeholder {
        color: #7e7e7e;
      }
      &:focus {
        outline: 2px solid #8c11be7f;
      }
    }

    input[type='email'] {
      margin-bottom: 16px;
    }
    button {
      background-color: #a328d6;
      border-radius: 8px;
      border: none;
      color: #fff;
      font-family: 'Raleway', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      height: 52px;
      line-height: 16px;
      margin: 24px 0;
      width: 100%;
    }
    button:active {
      background-color: #b04bdc;
      font-size: 16px;
      font-weight: 700;
    }
  }

  p {
    text-align: center;
  }
`;

export const StyledLink = styled(Link)`
  color: #fff;
  text-decoration-line: none;
`;
