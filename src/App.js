 import MenuBar from "./MenuBar";
 import styled from "styled-components";

function App() {
  return (
    <MainAppDiv className="App"> 
      <MenuBar/>

    </MainAppDiv>
  );
}

const MainAppDiv = styled.div`
width:100vw;
height: 100vh;
background: black;
color:white;
`

export default App;
