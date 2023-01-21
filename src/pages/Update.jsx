import styled from 'styled-components';
import arrow from '../assets/arrow.svg';
import drivenPlus from '../api/drivenPlus';
import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Update() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    name: user.name,
    cpf: user.cpf,
    email: user.email,
    currentPassword: '',
    newPassword: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      ...form,
    };
    if (body.newPassword === '') {
      delete body.newPassword;
    }
    drivenPlus
      .alterarUsuario(body, user.token)
      .then((__res) => navigate(`/users/${user.id}`))
      .catch((err) => alert(err.response.data.message));
  }

  function handleForm(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <UpdateContainer>
      <img src={arrow} alt="" onClick={() => navigate(`/users/${user.id}`)} />
      <Form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleForm}
          placeholder="Fulano"
        />
        <input
          name="cpf"
          type="text"
          onChange={handleForm}
          value={form.cpf}
          disabled
        />
        <input
          name="email"
          type="text"
          value={form.email}
          onChange={handleForm}
          placeholder="fulano@email.com"
        />
        <input
          name="currentPassword"
          type="password"
          onChange={handleForm}
          placeholder="Senha atual"
        />
        <input
          name="newPassword"
          type="password"
          onChange={handleForm}
          placeholder="Nova senha"
        />
        <button>SALVAR</button>
      </Form>
    </UpdateContainer>
  );
}

const UpdateContainer = styled.div`
  max-width: 500px;
  width: 90%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 138px;
  img {
    position: absolute;
    top: 22px;
    left: 22px;
  }
`;

const Form = styled.form`
  width: 100%;
  input {
    height: 52px;
    background: #ffffff;
    border-radius: 8px;
    border: none;
    padding-left: 14px;
    ::placeholder {
      font-size: 14px;
      line-height: 16px;
      color: #7e7e7e;
    }
    :disabled {
      background-color: #ebebeb;
    }
    :focus {
      outline: 2px solid #8c11be7f;
    }
  }

  input {
    width: 100%;
    margin-bottom: 16px;
  }

  button {
    width: 100%;
    height: 52px;
    background: #8c11be;
    border-radius: 8px;
    border: none;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
`;
