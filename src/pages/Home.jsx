import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import myWallet from '../api/myWallet';
import logout from '../assets/logout.svg';
import plus from '../assets/plus.svg';
import minus from '../assets/minus.svg';

export default function Home() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState();
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user?.token) {
      navigate('/');
    } else {
      myWallet
        .listarEntradas(user.token)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          const result = res.data.entries.reduce((acc, entry) => {
            switch (entry.operation) {
              case 'credit':
                return acc + entry.value;
              case 'debit':
                return acc - entry.value;
              default:
                return acc;
            }
          }, 0);

          setBalance(result.toFixed(2));
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    }
  }, []);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <HomeContainer>
      <TopContainer>
        <h1>Olá, {data.user.name}</h1>
        <img
          src={logout}
          alt="logout"
          onClick={() => {
            navigate('/');
          }}
        />
      </TopContainer>
      {data.entries.length > 0 && (
        <ContentDiv>
          <ul>
            {data.entries.map((entry) => (
              <li key={entry._id}>
                <p>
                  <div>
                    <span style={{ color: '#C6C6C6', marginRight: '8px' }}>
                      {entry.date}
                    </span>
                    <span>{entry.description}</span>
                  </div>
                  <span
                    style={{
                      color:
                        entry.operation === 'credit' ? '#03AC00' : '#C70000',
                    }}
                  >
                    {entry.value.toFixed(2).replace('.', ',')}
                  </span>
                </p>
              </li>
            ))}
          </ul>
          {data.entries.length > 0 ? (
            <div>
              <SaldaoBolado>SALDO</SaldaoBolado>
              <span style={{ color: balance >= 0 ? '#03AC00' : '#C70000' }}>
                {balance.replace('.', ',').replace('-', '')}
              </span>
            </div>
          ) : null}
        </ContentDiv>
      )}
      {data.entries.length === 0 && (
        <NoContentDiv>
          <NoContentLi>
            Não há registros de
            <br />
            entrada ou saída
          </NoContentLi>
        </NoContentDiv>
      )}
      <ButtonsDiv>
        <div
          onClick={() => {
            navigate('/nova-entrada');
          }}
        >
          <img
            src={plus}
            alt="plus"
            onClick={() => {
              navigate('/');
            }}
          />
          <p>
            Nova
            <br />
            entrada
          </p>
        </div>
        <div
          onClick={() => {
            navigate('/nova-saida');
          }}
        >
          <img src={minus} alt="minus" />
          <p>
            Nova
            <br />
            saída
          </p>
        </div>
      </ButtonsDiv>
    </HomeContainer>
  );
}

const NoContentDiv = styled.div`
  background-color: #fff;
  height: 446px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ContentDiv = styled.div`
  padding: 23px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 446px;
  color: #000;
  background-color: #fff;
  border-radius: 5px;
  p {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  div {
    display: flex;
    justify-content: space-between;
  }
`;

const SaldaoBolado = styled.span`
  font-family: 'Raleway';
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
`;

const NoContentLi = styled.li`
  list-style-type: none;
  font-family: 'Raleway';
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #868686;
`;

const HomeContainer = styled.div`
  max-width: 500px;
  width: 90%;
  height: 100%;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 78px;
  h1 {
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #fff;
  }
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
  div {
    background-color: #a328d6;
    width: calc(50% - 15px / 2);
    height: 114px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    cursor: pointer;
    img {
      height: 25px;
      width: 25px;
    }
    p {
      font-family: 'Raleway';
      font-weight: 700;
      font-size: 17px;
      line-height: 20px;
    }
  }
`;
