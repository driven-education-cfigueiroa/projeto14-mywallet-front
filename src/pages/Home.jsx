import styled from 'styled-components';
import usericon from '../assets/usericon.svg';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import drivenPlus from '../api/drivenPlus';

export default function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);
  return (
    <HomeContainer>
      <TopContainer>
        <img src={user.membership.image} alt="img" />
        <img
          src={usericon}
          alt="user"
          onClick={() => navigate(`/users/${user.id}`)}
        />
      </TopContainer>
      <h1>Olá, {user.name}</h1>
      <ButtonsContainer>
        <TopButtons>
          {user.membership.perks.map((perk) => (
            <a href={perk.link} target="_blank" rel="noreferrer">
              <button key={perk.id}>{perk.title}</button>
            </a>
          ))}
        </TopButtons>
        <BotButtons>
          <button onClick={() => navigate('/subscriptions')}>
            Mudar Plano
          </button>
          <button
            onClick={() =>
              drivenPlus
                .cancelarPlano(user.token)
                .then((_res) => navigate('/subscriptions'))
                .catch((_err) =>
                  console.log('Não foi possível cancelar o plano')
                )
            }
          >
            Cancelar Plano
          </button>
        </BotButtons>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  max-width: 500px;
  width: 90%;
  height: 100%;
  h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    margin-top: 12px;
    margin-bottom: 53px;
  }
`;

const TopContainer = styled.div`
  position: relative;
  padding-top: 32px;
  img:first-child {
    width: 75px;
  }
  img:last-child {
    position: absolute;
    right: 0;
    top: 22px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 71.81%;
  justify-content: space-between;
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
    width: 100%;
  }

  button:active {
    background-color: #b04bdc;
    font-size: 16px;
    font-weight: 700;
  }
`;

const TopButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BotButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  button:last-child {
    background-color: #ff4747;
  }
  button:last-child:active {
    background-color: #f82b2b;
    font-size: 16px;
    font-weight: 700;
  }
`;
