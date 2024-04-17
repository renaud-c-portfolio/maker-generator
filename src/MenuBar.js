import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {styled, keyframes} from 'styled-components'; 

import { AppContext } from './AppContext';

const MenuBar = () =>{
    
 
    const {
        actions: {   
            changeMedia,

            getNewResult,
            setDate,
            changeProject, changeTime, 
            setSeedRandom, randomer,

            loadProjects,
        },
        state: { 
            currentMedia,
            currentResult,
            globalTime,
            timeSelected, projectsSelected,
            
        },
    } = useContext(AppContext);
 

    useEffect(
        ()=>{
            setDate();
            loadProjects();
        }
    ,[])

    useEffect(
        ()=>{ 
            setSeedRandom();
        }
    ,[globalTime])

    return (
        <> 
        <BarDiv>
            <FirstBarDiv>
                <OtherBarDiv 
                onClick={()=>{}}
                >
                    
                    <span>media type:  
                <span> </span>
                <MediaSelect
                onChange = {(event)=>{
                    changeMedia(event.target.value);
                }}
                >
                    <MediaOption>videogame</MediaOption>
                    <MediaOption>boardgame</MediaOption>
                    <MediaOption>story</MediaOption>
                    <MediaOption>characterDesign</MediaOption>
                    <MediaOption>creatureDesign</MediaOption>
                    <MediaOption>worldDesign</MediaOption>
                </MediaSelect></span>
                </OtherBarDiv>

                <Link to='/'><BarButtonDiv
                    onClick={()=>{
                        changeProject("global"); 
                        getNewResult(0);
                    }}
                    {...( projectsSelected === "global" ? {className:"selected"}:{})}
                    >Global</BarButtonDiv></Link>
                <Link to='/'><BarButtonDiv
                    onClick={()=>{
                        changeProject("personal");
                        getNewResult(1);
                    }}
                    {...( projectsSelected === "personal" ? {className:"selected"}:{})}
                >Personal</BarButtonDiv></Link>
                <Link to='/'><BarButtonDiv
                    onClick={()=>{
                        changeProject("project"); 
                        getNewResult(2);
                    }}
                    {...( projectsSelected === "project" ? {className:"selected"}:{})}
                >Projects only</BarButtonDiv></Link>
                <Link to='/projects'><BarButtonDiv
                 onClick={()=>{
                    changeProject("");
                 }}
                >Setup Projects</BarButtonDiv></Link>
                <BarButtonDiv>History</BarButtonDiv> 
            </FirstBarDiv>
            { window.location.pathname === "/" && 
            (

           
        <SecondBarDiv
        onClick={()=>{

            console.log("window:",window.location.pathname)
        }}
         >
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
                                    onClick={()=>{ changeTime("daily");  
                                    getNewResult(1);}}
                                    {...( currentResult.rarity === 1 ?{className:"glower"}:{})}  
                                    {...( timeSelected === "daily" ? {className:"selected"}:{})}
                                    >
                                    <ExclamationDiv >!New</ExclamationDiv>
                                    Daily
                                    </AbsButton> 
                            </AbsButton>
                            </AbsButton> 
                </DailyButtonDiv>

              <BarButtonDiv
              onClick={()=>{ changeTime("weekly");  
              getNewResult(1);}}
              {...( timeSelected === "weekly" ? {className:"selected"}:{})}
              >Weekly</BarButtonDiv>
              <BarButtonDiv
              onClick={()=>{ changeTime("monthly");  
              getNewResult(1);}}
              {...( timeSelected === "monthly" ? {className:"selected"}:{})}
              >Monthly</BarButtonDiv>
              <BarButtonDiv
              onClick={()=>{ changeTime("seasonal");  
              getNewResult(1);}}
              {...( timeSelected === "seasonal" ? {className:"selected"}:{})}
              >Seasonal</BarButtonDiv>
              <BarButtonDiv
              onClick={()=>{ changeTime("yearly");  
              getNewResult(1);}}
              {...( timeSelected === "yearly" ? {className:"selected"}:{})}
              >Yearly</BarButtonDiv>
              <div
              onClick={
                ()=>{ 
                    randomer(10); 
                }
              }
              >{ 
                ( globalTime != "" &&  <>{globalTime.toLocaleDateString()}</>)
                
              }</div>
               
              <div></div>
              <div></div>
        </SecondBarDiv> )}
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
padding-bottom:0.5%;
`

const SecondBarDiv = styled.div`
border-top: 1px solid white;
width:98%;
height:9vh; 
padding-bottom: 1.6vh;
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

const ExclamationDiv = styled.div`
position: absolute;
width: 100%;
text-align: right;
margin-right:20vh;
margin-bottom: 2vh;
font-size: 2vh;
color: #ff2277;
background-clip: unset;
-webkit-background-clip: unset;
-webkit-text-fill-color: unset;    

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
&.selected{   
    background: linear-gradient(
    5deg
    ,   transparent 0%,  #070707 20%, #000000 85%, transparent);
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
 &.selected{  
    background: linear-gradient(
    5deg
    ,   transparent 0%,  #070707 20%, #000000 85%, transparent);
}
&:active{
    transition: none;
    margin-top:5px; 
    background-color:black;
}
&:hover{ 
    -webkit-text-stroke: 2px yellow;
    filter: drop-shadow(0 0 0.75rem crimson);
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
&.selected{
    font-size: 2.9vh; 
    background: linear-gradient(
    5deg
    ,   transparent 0%,  #070707 20%, #000000 85%, transparent);
}
&:active{
    transition: none;
    margin-top:5px;
    font-size:2.5vh;
    background-color:black;
}
&:hover{ 
    -webkit-text-stroke: 2px yellow;
    filter: drop-shadow(0 0 0.75rem crimson);
}
`

const OtherBarDiv = styled.div`
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
text-align: center;
transition: all 100ms ease-in;
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
text-align: center;
transition: all 100ms ease-in;
filter: drop-shadow(0 0 0 crimson);
&.selected{
    font-size: 2.9vh;
    color: #cceeff;
    background: linear-gradient(
    5deg
    ,   transparent 0%,  #070707 20%, #000000 85%, transparent);  
    filter: drop-shadow(0 0 0.2rem transparent) drop-shadow(0 0 0.2rem #121212);  
}

&:active{
    padding: 0.95vh 4vh 0.95vh 4vh;
    transition: none;
    margin-top:0.1vh;
    font-size:2.5vh;
    background-color:black;
}

&:hover{ 
    //-webkit-text-stroke: 2px yellow;
    filter: drop-shadow(0 0 0.75rem crimson);
}
` 
export default MenuBar