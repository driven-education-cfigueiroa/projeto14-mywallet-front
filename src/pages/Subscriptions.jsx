import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import drivenPlus from '../api/drivenPlus';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';

export default function Subscriptions() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [plans, setPlans] = useState(undefined);

  useEffect(() => {
    if (!user.token) {
      navigate('/');
    }
    console.log(user.token);
    drivenPlus
      .listarPlanos(user.token)
      .then((response) => {
        setPlans(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate, user.token]);

  return (
    <SubscriptionsContainer>
      <h1>Escolha seu Plano</h1>
      <Cards>
        {plans &&
          plans.map((plan) => (
            <Link to={`${plan.id}`} key={plan.id}>
              <Card>
                <img src={plan.image} alt="img plan" />
                <p>R$ {plan.price.replace('.', ',')}</p>
              </Card>
            </Link>
          ))}
      </Cards>
    </SubscriptionsContainer>
  );
}

const SubscriptionsContainer = styled.div`
  a {
    color: inherit;
    text-decoration: inherit;
  }

  h1 {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    margin-bottom: 24px;
    text-align: center;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Card = styled.div`
  border: 3px solid #7e7e7e;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 42px 16px;
  p {
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
  }
`;
