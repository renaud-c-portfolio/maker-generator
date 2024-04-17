//react functionality
import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {styled, keyframes} from 'styled-components';

//created components
import Projects from './Projects';
import GlobalStyles from './GlobalStyles';
import MenuBar from './MenuBar';
import MainDisplay from './MainDisplay'; 

///function start
function App() {
  return (
    <> 
    <GlobalStyles/> 
    <Router>
    <MainAppDiv className="App">  
      <MenuBar/>
      <Routes>
        <Route path="/" element={<MainDisplay/>} />
        <Route path="/projects" element={<Projects/>} />
        
       </Routes>
    </MainAppDiv>
    </Router>
    </>
  );
}

const MainAppDiv = styled.div`
width:100vw;
height: 100vh;
display: flex;
flex-direction: column;
background: black;
color:white;
`

export default App;
