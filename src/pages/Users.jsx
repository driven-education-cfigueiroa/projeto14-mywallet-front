import styled from 'styled-components';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate('update');
  }

  return (
    <UsersContainer>
      {/* <img src={arrow} alt="" onClick={() => navigate('/home')} /> */}
      <Form onSubmit={handleSubmit}>
        <input type="text" placeholder="Fulano" value={user.name} disabled />
        <input
          type="text"
          placeholder="111.111.111-11"
          value={user.cpf}
          disabled
        />
        <input
          type="text"
          placeholder="fulano@email.com"
          value={user.email}
          disabled
        />
        <button>ATUALIZAR</button>
      </Form>
    </UsersContainer>
  );
}

const UsersContainer = styled.div`
  max-width: 500px;
  width: 90%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 206px;
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
