import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useStickyState from '../hooks/useStickyState';
import GlobalStyle from '../styles/GlobalStyle';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import NewCredit from './NewCredit';
import NewDebit from './NewDebit';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';

export default function Index() {
  const [user, setUser] = useStickyState('', 'token');

  return (
    <>
      <GlobalStyle />
      <IndexContainer>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/nova-entrada" element={<NewCredit />} />
              <Route path="/nova-saida" element={<NewDebit />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </IndexContainer>
    </>
  );
}

const IndexContainer = styled.div`
  align-items: center;
  background-color: #8c11be;
  color: #fff;
  display: flex;
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  height: 100vh;
  justify-content: center;
  max-width: 100vw;
  overflow: hidden;
`;
