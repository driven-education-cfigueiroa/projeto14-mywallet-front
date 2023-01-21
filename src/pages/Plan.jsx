import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import arrow from '../assets/arrow.svg';
import drivenPlus from '../api/drivenPlus';
import list from '../assets/list.svg';
import Modal from '../components/Modal';
import money from '../assets/money.svg';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import masks from '../utils/masks';

export default function Plan() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [plan, setPlan] = useState(undefined);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    securityNumber: '',
    expirationDate: '',
  });

  useEffect(() => {
    drivenPlus
      .listarPlano(id, user.token)
      .then((res) => {
        console.log(res.data);
        setPlan(res.data);
      })
      .catch((err) => console.log(err));
  }, [user, id]);

  const fieldMasks = {
    expirationDate: masks.expirationDate,
  };

  function handleForm(event) {
    setForm({
      ...form,
      [event.target.name]: fieldMasks[event.target.name]
        ? fieldMasks[event.target.name](event.target.value)
        : event.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setModal(true);
  }

  return (
    <>
      <SubscriptionsContainer>
        <img src={arrow} alt="" onClick={() => navigate(-1)} />
        {plan && (
          <>
            <img src={plan.image} alt="" />
            <h1>{plan.name}</h1>
            <div>
              <img src={list} alt="" />
              <h2>Benefícios:</h2>
            </div>
            <ol>
              {plan.perks.map((perk, i) =>
                i !== 0 ? (
                  <li key={perk.id}>{perk.title}</li>
                ) : (
                  <li key={perk.id}>Brindes exclusivos</li>
                )
              )}
            </ol>
            <div>
              <img src={money} alt="" />
              <h2>Benefícios:</h2>
            </div>
            <p>R$ {plan.price.replace('.', ',')} cobrados mensalmente</p>
            <Form onSubmit={handleSubmit}>
              <input
                name="cardName"
                onChange={handleForm}
                type="text"
                placeholder="Nome impresso no cartão"
                value={form.cardName}
                required
              />
              <input
                name="cardNumber"
                onChange={handleForm}
                type="text"
                placeholder="Digitos do cartão"
                value={form.cardNumber}
                required
              />
              <input
                name="securityNumber"
                onChange={handleForm}
                type="text"
                placeholder="Código de segurança"
                value={form.securityNumber}
                required
              />
              <input
                name="expirationDate"
                onChange={handleForm}
                type="text"
                placeholder="Validade"
                value={form.expirationDate}
                minLength="5"
                required
              />
              <button>Assinar</button>
            </Form>
          </>
        )}
      </SubscriptionsContainer>
      {modal && (
        <Modal
          token={user.token}
          membershipId={id}
          form={form}
          setModal={setModal}
          planName={plan.name}
          planPrice={plan.price.replace('.', ',')}
        />
      )}
    </>
  );
}

const SubscriptionsContainer = styled.div`
  max-width: 500px;
  width: 90%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 87px;
  > img:first-child {
    position: absolute;
    top: 22px;
    left: 22px;
  }
  h1 {
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #ffffff;
    margin: 16px 0 22px;
  }
  > div:nth-of-type(1) {
    width: 100%;
    display: flex;
    gap: 5px;
  }
  ol {
    width: 100%;
    margin: 10px 0 12px;
    li {
      list-style: decimal;
      list-style-position: inside;
      font-family: 'Raleway', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #ffffff;
    }
  }
  > div:nth-of-type(2) {
    width: 100%;
    display: flex;
    gap: 5px;
  }
  p {
    margin-top: 4px;
    width: 100%;
    font-size: 14px;
    line-height: 16px;
  }
`;

const Form = styled.form`
  width: 100%;
  margin-top: 34px;
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
  }

  > input:nth-of-type(1) {
    width: 100%;
  }
  > input:nth-of-type(2) {
    width: 100%;
    margin: 8px 0;
  }
  > input:nth-of-type(3) {
    width: 49%;
    margin-right: 2%;
    padding-left: 6px !important;
  }
  > input:nth-of-type(4) {
    width: 49%;
    padding-left: 6px !important;
  }

  button {
    width: 100%;
    height: 52px;
    background: #8c11be;
    border-radius: 8px;
    margin-top: 12px;
    border: none;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
`;
