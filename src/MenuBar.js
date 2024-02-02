import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {styled, keyframes} from 'styled-components'; 

import { AppContext } from './AppContext';

const MenuBar = () =>{
    
 
    const {
        actions: {   
            getNewResult,
            setDate,
        },
        state: { 
            currentResult,
            globalTime,
            
        },
    } = useContext(AppContext);n

    useEffect(
        ()=>{
            setDate();
        }
    ,[])

    return (
        <> 
        <BarDiv>
            <FirstBarDiv>
                <BarButtonDiv 
                onClick={()=>{}}
                >
                    
                    <span>media type:  
                <span> </span>
                <MediaSelect>
                    <MediaOption>videogame</MediaOption>
                    <MediaOption>boardgame</MediaOption>
                    <MediaOption>story</MediaOption>
                    <MediaOption>character design</MediaOption>
                    <MediaOption>creature design</MediaOption>
                </MediaSelect></span>
                </BarButtonDiv>

                <BarButtonDiv
                    onClick={()=>{
                        getNewResult(11115);
                    }}
                >Global</BarButtonDiv>
                <BarButtonDiv>Personal</BarButtonDiv>
                <BarButtonDiv>Projects only</BarButtonDiv>
                <BarButtonDiv>Setup Projects</BarButtonDiv> 
                <BarButtonDiv>History</BarButtonDiv> 
            </FirstBarDiv>
        <SecondBarDiv>
              <div></div>
              <DailyButtonDiv
              style={{fontSize:"5vh"}}
               > 
                        <AbsButton 
                        {...( currentResult.rarity === 1 ?{className:"glow"}:{})}  
                        
                        >
                            <AbsButton > 
                                    Daily
                                    <AbsButton  
                                    {...( currentResult.rarity === 1 ?{className:"glower"}:{})}  
                                    >
                                    Daily
                                    </AbsButton>
                            </AbsButton>
                            </AbsButton> 
                </DailyButtonDiv>
              <BarButtonDiv>Weekly</BarButtonDiv>
              <BarButtonDiv>Monthly</BarButtonDiv>
              <BarButtonDiv>Seasonal</BarButtonDiv>
              <BarButtonDiv>Yearly</BarButtonDiv>
              <BarButtonDiv>{globalTime}</BarButtonDiv>
              <div></div>
              <div></div>
              <div></div>
        </SecondBarDiv>
        </BarDiv>
        </>
    )
}
 

const FirstBarDiv = styled.div`
width:84%;
height:6vh; 
display: flex;
flex-direction: row; 
justify-content: space-around;
gap:5px;
align-items: center;  
background-color: #232323;
padding-left:4%;
padding-right:12%;
`

const SecondBarDiv = styled.div`
border-top: 1px solid white;
width:98%;
height:9vh; 
padding-bottom: 1vh;
display: flex;
flex-direction: row; 
justify-content: space-around; 
align-items: end;
background-color: #232323; 
`
 

const BarDiv = styled.div`
width:100%;  
z-index: 2;
display: flex;
flex-direction: column; 
justify-content: space-around;
gap:5px;
align-items: center;  
background-color: #232323; 
border-radius: 0 0 10px 10px;
`

const MediaSelect = styled.select`
font-size: 25px;
padding:5px;
border: none;
border-radius: 5px;
color: orange;
background-color: black;

&::selection{
    color:blue;
}
`

const MediaOption = styled.option`
font-family: zero4B, '04b03', arial;
border: 2px solid orange; 
` 

const AbsButton = styled.div`  
font-size: 6vh;
border-radius: 14px; 
color: inherit;
position: absolute;
background-color: #232323;
z-index:1;
width: 98%;
height: 95%;
border-radius: 10px;
text-align: center;
justify-content: center;
align-items: center;
text-align: center;
display: flex; 
&.glow{ 
 
}
 &.glower{  
    background-clip:text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;    
    animation: glowbe 6s ease-in-out infinite;
    background-image: linear-gradient(
    0deg
    , #ffcc35  21%,  #ffeebb  24%, #aa7700 53%, transparent);
 }
`

const DailyButtonDiv = styled.div`   
 
border-radius: 14px; 
border-radius: 10px; 
padding: 0 50px 0 50px;
position: relative;     
cursor:pointer;
font-size:2.8vh;
width:15%;
height:90%;
text-align: center;
justify-content: center;
align-items: center;
text-align: center;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;  
&:hover{ 
    transition: all 300ms ease-out;
    -webkit-text-stroke: 2px yellow; 
    
}
`

const BarButtonDiv = styled.div`
font-size:2.8vh;
background-color: #232323;
padding: 1vh 4vh 1vh 4vh;
border-radius: 16px;
cursor:pointer;
width:calc(max(20vh,fit-content));
height:50%;
text-align: center;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
&:hover{ 
    transition: all 300ms ease-out;
    -webkit-text-stroke: 2px yellow;
    filter: drop-shadow(0 0 0.75rem crimson);
}
`

export default MenuBar