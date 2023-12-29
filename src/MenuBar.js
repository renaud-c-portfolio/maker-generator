import styled from "styled-components"


const MenuBar = () =>{


    return (
        <BarDiv>
            <BarButtonDiv>cat</BarButtonDiv>
            <BarButtonDiv>cat</BarButtonDiv>
            <BarButtonDiv>cat</BarButtonDiv>
            <BarButtonDiv>cat</BarButtonDiv>
            <BarButtonDiv>cat</BarButtonDiv>
            <BarButtonDiv>cat</BarButtonDiv>
        </BarDiv>
    )
}

const BarDiv = styled.div`
width:100%;
height:8vh; 
display: flex;
flex-direction: row; 
justify-content: space-around;
gap:5px;
align-items: center; 
`

const BarButtonDiv = styled.div`
font-size:2.8vh;
background-color: #232323;
width:200px;
height:100%;
text-align: center;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
`

export default MenuBar