import { createContext,useReducer } from "react";    
import { Howl, Howler } from "howler";
import choirURL from "./sfx/heavenchoir.ogg";
import DATA from "./data.js";


const heavenChoir = new Howl({
    src: choirURL,
    format: ['ogg'],
    autoplay: false,
    loop: false,
    volume: 0.15, 
  });


const initialState = {   
         
        currentMedia: "videogame",
        currentRarity: "",
        resultQuality: "common",
        currentResult:{ 

            maker:["Temporary"],
            mainTitle:["Time"],
            subTitle:["testy","testo","testooo"],
            extras:["balbo","balby","bamboon"], 
            
    },

}



const parseString = (string,data,mediaType) => {
    let _str = string;
    let _finalStr = "";

    //package check
    while (_str.indexOf("$",0) >= 0 )
    {
        let _dollarIndex = _str.indexOf("$",0);
        let _spaceIndex = _str.indexOf("#",_dollarIndex);
        let _length = 0;
        if (_spaceIndex === -1)
        {
            _length = _str.length - _dollarIndex;
        }
        else
        {
            _length = _spaceIndex - _dollarIndex;
        } 
    }

    //random word check
    while (_str.indexOf("@",0) >= 0 )
    {
        let _atIndex = _str.indexOf("@",0);
        let _spaceIndex = _str.indexOf("#",_atIndex);
        let _length = 0;
        if (_spaceIndex === -1)
        {
            _length = _str.length - _atIndex;
        }
        else
        {
            _length = _spaceIndex - _atIndex;
        } 
        const _keyword = _str.substr(_atIndex+1,_length-1); 
        _finalStr += _str.slice(0,_atIndex);

        if ( data.keywords.indexOf(_keyword) >= 0)
        {
            const _rando = Math.floor(Math.random()*data[_keyword]);
            _finalStr += data[mediaType][_keyword][_rando];
            if (Math.random() > 0.1){ 
                data[_keyword] -= 1;
                data[mediaType][_keyword].splice(_rando,1);
            }
        }
        else
        {
            _finalStr += "???";
            console.log("WRONG KEYWORD SUCKA");
        }

        _str = _str.slice(_atIndex+_length+1); 

        if (_str.indexOf("@",0) <= 0)
        {
            if (_finalStr.indexOf("@",0) >= 0)
            {
                _finalStr += _str; 
                _str = _finalStr;
                _finalStr = "";
            }
        }  
    }
    _finalStr += _str; 

    return(_finalStr);
 

}

//====REDUCER==================================
const reducer = (state, action) => { 
    switch(action.type) { 
 
        case "get-new-result": 
        console.log("bamboon");
            return (
                {
                    ...state,
                    currentResult:action.data,
                }
            ) 
        //--------------------------------

        default:
            throw new Error(`Unrecognized action: ${action.type}`);
        break;
        //---------the end----------===============
    }
}


export const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

 
    const getNewResult = (data) =>{ 

        console.log(data);
        let _data = structuredClone(DATA);
        const _newResult = {
            maker:["MAKE A NEW GAME:"],
            mainTitle:[],
            subTitle:[],
            extras:[], 
            rarity:0,
        };
        let _rarity = 0;
        if (Math.random() > 0.8)
        {
            _rarity = 1;
        }
        

        let _rando = Math.floor(Math.random()*DATA.mainStruct.length);
        let _newStr = DATA.mainStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.mainTitle.push(_newStr);

            _rando = Math.floor(Math.random()*DATA.subStruct.length);
            _newStr = DATA.subStruct[_rando];  
            _newStr = parseString(_newStr,_data,state.currentMedia);
            _newResult.mainTitle.push(_newStr);

            if (_rarity)
            {
                
            _rando = Math.floor(Math.random()*DATA.subStruct.length);
            _newStr = DATA.subStruct[_rando];  
            _newStr = parseString(_newStr,_data,state.currentMedia);
            _newResult.mainTitle.push(_newStr);
            
             }
    
        _rando = Math.floor(Math.random()*DATA.detailStruct.length);
        _newStr = DATA.detailStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.subTitle.push(_newStr);

        _rando = Math.floor(Math.random()*DATA.detailStruct.length);
        _newStr = DATA.detailStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.subTitle.push(_newStr);

        if (_rarity)
            {
        _rando = Math.floor(Math.random()*DATA.detailStruct.length);
        _newStr = DATA.detailStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.subTitle.push(_newStr);

        _rando = Math.floor(Math.random()*DATA.detailStruct.length);
        _newStr = DATA.detailStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.subTitle.push(_newStr);

        _rando = Math.floor(Math.random()*DATA.detailStruct.length);
        _newStr = DATA.detailStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.subTitle.push(_newStr);

        _rando = Math.floor(Math.random()*DATA.detailStruct.length);
        _newStr = DATA.detailStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.subTitle.push(_newStr);
            
            heavenChoir.play();
            }

         _newResult.rarity = _rarity;
            dispatch({
            type: "get-new-result",
            data: _newResult,
            }) 

    }
 
    
    return (
        <AppContext.Provider
          value={{

            state,  
            actions: {    
                getNewResult,
            },
          }}
        >
          {children}
        </AppContext.Provider>
      );
}



export const AppContext = createContext();