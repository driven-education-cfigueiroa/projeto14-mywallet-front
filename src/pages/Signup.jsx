import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import myWallet from '../api/myWallet';
import styled from 'styled-components';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function login(event) {
    event.preventDefault();
    myWallet
      .fazerCadastro(form)
      .then((response) => {
        console.log(response.data);
        navigate('/');
      })
      .catch((error) => {
        window.alert(error.response.data);
      });
  }

  function handleForm(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <SignupContainer>
      <h1>MyWallet</h1>
      <form onSubmit={login}>
        <input
          name="name"
          onChange={handleForm}
          placeholder="Nome"
          type="text"
          value={form.name}
          required
        />
        <input
          name="email"
          onChange={handleForm}
          placeholder="E-mail"
          type="email"
          value={form.email}
          required
        />
        <input
          name="password"
          onChange={handleForm}
          placeholder="Senha"
          type="password"
          value={form.password}
          required
        />
        <input
          name="confirmPassword"
          onChange={handleForm}
          placeholder="confirmPassword"
          type="password"
          value={form.confirmPassword}
          required
        />
        <button type="submit">CADASTRAR</button>
      </form>
      <Link to={'/'}>
        <p>Já possuí uma conta? Entre</p>
      </Link>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    input {
      width: 100%;
      height: 52px;
      background: #ffffff;
      border-radius: 8px;
      padding-left: 14px;
      font-family: 'Raleway', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #000;
      border: none;
      ::placeholder {
        color: #7e7e7e;
      }
      :focus {
        outline: 2px solid #8c11be7f;
      }
    }
    button {
      height: 52px;
      margin-top: 8px;
      margin-bottom: 24px;
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
    }

    button:active {
      background-color: #b04bdc;
      font-size: 16px;
      font-weight: 700;
    }
  }

  a {
    color: #fff;
    text-decoration-line: none;
  }

  p {
    text-align: center;
  }
`;
