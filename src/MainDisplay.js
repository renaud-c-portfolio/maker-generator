import {styled, keyframes} from 'styled-components'; 
import { useContext } from 'react';
import { useEffect } from 'react';

import { AppContext } from './AppContext'; 


const MainDisplay = () =>{

    const {
        actions: {   
            getNewResult,
        },
        state: { 
            currentMedia,
            currentResult,
        },
    } = useContext(AppContext);
 
    useEffect(()=>{
        
        getNewResult(1);
    },[currentMedia])

    


    return (
        <> 
        <MainDiv>  
            <PaddingDiv></PaddingDiv>
            
            <SubDiv > 
                 
                <AbsThing 
                {...( currentResult.rarity === 1 ?{className:"glow"}:{})}  
                >
                <AbsThing >  
                    <SmallSpan>&nbsp;</SmallSpan>
                  {currentResult.maker.map((string,stringIndex)=>{ 
                        return( 
                                <h1
                                key={"h1"+String(stringIndex)}
                                >{string}</h1> 
                        )
                    })} 
                    
                    <Spacey>&nbsp;</Spacey>
                    {currentResult.mainTitle.map((string,stringIndex)=>{ 
                        return( 
                                <h2
                                key={"h2"+String(stringIndex)}
                                >{string}</h2> 
                        )
                    })} 
                    
                    <Spacey>&nbsp;</Spacey>
                    {currentResult.subTitle.map((string,stringIndex)=>{ 
                        return(
                            <p
                            key={"p1"+String(stringIndex)}
                            >{string}</p>
                        )
                    })}
 

                    {currentResult.extras.map((string,stringIndex)=>{ 
                        return(
                            <p
                            key={"p2"+String(stringIndex)}
                            >{string}</p>
                        )
                    })}    


                <AbsThing 
                {...( currentResult.rarity === 1 ?{className:"glower"}:{})}  
                >  
                <SmallSpan>&nbsp;</SmallSpan>
                    {currentResult.maker.map((string,stringIndex)=>{ 
                            return( 
                                    <h1
                                    key={"h1"+String(stringIndex)}
                                    >{string}</h1> 
                            )
                        })} 
                        
                        <Spacey>&nbsp;</Spacey>
                        {currentResult.mainTitle.map((string,stringIndex)=>{ 
                            return( 
                                    <h2
                                    key={"h2"+String(stringIndex)}
                                    >{string}</h2> 
                            )
                        })} 
                        
                        <Spacey>&nbsp;</Spacey>
                        {currentResult.subTitle.map((string,stringIndex)=>{ 
                            return(
                                <p
                                key={"p1"+String(stringIndex)}
                                >{string}</p>
                            )
                        })}
    

                        {currentResult.extras.map((string,stringIndex)=>{ 
                            return(
                                <p
                                key={"p2"+String(stringIndex)}
                                >{string}</p>
                            )
                        })}    
                     </AbsThing>

                  </AbsThing>
              </AbsThing> 
            </SubDiv>
            
            <PaddingDiv></PaddingDiv>
        </MainDiv> 
        </>
    )

}
 

const SmallSpan = styled.span`
font-size:2vh; 
`
 
const AbsThing = styled.div`
border-radius: inherit; 
position: absolute;  
background-color: #000000;  
z-index:1; 
width: 100%;
height: 100%;
border-radius: 7vh;
text-align: center; 
align-items: center;
text-align: center;
display: flex; 
flex-direction: column; 
p,h1,h2{
    padding-left:0.5vw;
    padding-right:0.5vw;
}
&.glower{   
    position: absolute;
    background-clip:text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;    
    animation: glowbe 6s ease-in-out infinite;
    pointer-events: none;
    z-index: 10;
    background-image: linear-gradient(
    0deg, #ffcc35  21%,  #ffeebb  24%, #aa7700 53%, transparent);
 }
`

const SubDiv = styled.div`
border-radius: 7vh; 
position: relative;
display: flex;
justify-content: center;
font-family: Zero4b;
text-align: center;
width: 100%;
height:100%; 
flex:13;  
h1{
    font-family: inherit;
    font-size: 6vh;
}
h2{
    font-family: inherit;
    font-size: 5vh;
}
p{
    font-family: inherit;
    font-size: 4vh;
}
&.glow{
    position: absolute;
}

`
const PaddingDiv = styled.div` 
position: static;
flex:2;
width:100%;
height:100%;
`
const MainDiv = styled.div`  
display: flex;
flex-direction: row; 
justify-content: center;
align-items: center;
padding: 2%;
max-width:100%;
height: 100%; 
font-size: 10vh;
color:white;
`
const Spacey = styled.p`
font-size:3vh;

`

export default MainDisplay