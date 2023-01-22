import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import myWallet from '../api/myWallet';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';

export default function Login() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  function login(event) {
    event.preventDefault();
    const obj = { value: Number(value), description, operation: 'credit' };
    console.log(obj);
    myWallet
      .inserirEntrada(obj, user.token)
      .then((response) => {
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
      <TopContainer>
        <h1>Nova entrada</h1>
      </TopContainer>
      <form onSubmit={login}>
        <input
          onChange={(e) => setValue(e.target.value)}
          placeholder="Valor"
          type="text"
          value={value}
          required
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          type="text"
          value={description}
          required
        />
        <button type="submit">Salvar entrada</button>
      </form>
    </LoginContainer>
  );
}

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 40px;
`;

const LoginContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 90%;
  h1 {
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #fff;
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

    input:nth-child(1) {
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
