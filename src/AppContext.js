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

        timeSelected: "daily",
        projects: "global",
        currentMedia: "videogame",
        currentRarity: "",
        resultQuality: "common",
        globalTime: "",

        currentResult:{ 

            maker:["Temporary"],
            mainTitle:["Time"],
            subTitle:["testy","testo","testooo"],
            extras:["balbo","balby","bamboon"], 
            
    },

}

const corrections = (_string) => {
    let _str = _string.toLowerCase();
    let _finalStr = ""; 
    let _split = _str.split("a ");
    let _aOccurences = _str.split("a ").length -1;
    console.log("occurences: ",_aOccurences," ",_split);
    let _occurIndex = 0;

    for (let _i = 0; _i < _aOccurences; _i++)
    {
        let _index = _str.indexOf("a ",_occurIndex);
         
        let _checkVowel = _str[_index+2];
        let _checkPrev =  _str[_index-1];
         
        if ( _checkPrev === " " || _checkPrev === "," || _checkPrev === "" || _index === 0 )
        {  
            if ( _checkVowel === "a" || _checkVowel === "e" || _checkVowel === "i" || _checkVowel === "o" || _checkVowel === "u" )
            {
                _finalStr += _str.slice(_occurIndex,_index+1)+"n ";
                _str = _str.slice(_index+2);
                console.log("remaining str: ","'"+_str+"'");
            }
            else
            { 
                _finalStr += _str.slice(_occurIndex,_index+2);
                _str = _str.slice(_index+2);
                console.log("remaining str: ","'"+_str+"'");
            } 
        }  
    }



    _finalStr += _str;
    return _finalStr;
}
 
const parseString = (_string,_data,_mediaType) => {

    let found = true;
    let _str = _string;
    let _finalStr = "";

    while (found === true)
    {
        _finalStr = "";
        found = false;
        
        //package check
        while (_str.indexOf("$",0) >= 0 ) 
        {
            found = true;
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

            const _keyword = _str.substr(_dollarIndex+1,_length-1); 
            _finalStr += _str.slice(0,_dollarIndex); 

            if ( _data.packages.hasOwnProperty(_keyword))
            {
                console.log("cat")
                const _rando = Math.floor(Math.random()*_data.packages[_keyword].length);
                _finalStr += _data.packages[_keyword][_rando]; 
            }
            else
            {
                _finalStr += "???";
                console.log("WRONG KEYWORD SUCKA: ",_keyword);
            }
            _str = _str.slice(_dollarIndex+_length+1);  
        }

        //random word check
        while (_str.indexOf("@",0) >= 0 )
        {
            found = true;
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

            if ( _data.keywords.indexOf(_keyword) >= 0 )
            {
                const _rando = Math.floor(Math.random()*_data[_mediaType][_keyword].length);
                _finalStr += _data[_mediaType][_keyword][_rando];
                if (Math.random() > 0.1 || _keyword === "none"){ 
                    _data[_keyword] -= 1;
                    _data[_mediaType][_keyword].splice(_rando,1);
                }
            }
            else
            {
                _finalStr += "???";
                console.log("WRONG KEYWORD SUCKA: ",_keyword);
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
        _str = _finalStr; 
    }
    _finalStr = corrections(_finalStr);
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
        case "set-date":  
            return (
                {
                    ...state,
                    globalTime:action.data,
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

    const setDate = async (data) =>{
        fetch('/',
        {
             method: "GET",  
             headers: { 
            "Content-Type":"application/json",
          },
        })
        .then((res)  =>{  
           const _date = res.headers.get("date");
          dispatch({
            type: "set-date",
            data: _date,
            })  
        })  

        

    }
 
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
        if (Math.random() > 0.9)
        {
            _rarity = 1;
        }
        

        let _rando = Math.floor(Math.random()*DATA.mainStruct.length);
        let _newStr = _data.mainStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.mainTitle.push(_newStr);

            _rando = Math.floor(Math.random()*_data.subStruct.length);
            _newStr = _data.subStruct[_rando];  
            _newStr = parseString(_newStr,_data,state.currentMedia);
            _newResult.mainTitle.push(_newStr); 
            _data.subStruct.splice(_rando,1);

            if (_rarity)
            {
                
            _rando = Math.floor(Math.random()*_data.subStruct.length);
            _newStr = _data.subStruct[_rando];  
            _newStr = parseString(_newStr,_data,state.currentMedia);
            _newResult.mainTitle.push(_newStr);
            
             }
    
        _rando = Math.floor(Math.random()*_data.detailStruct.length);
        _newStr = _data.detailStruct[_rando];
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.subTitle.push(_newStr);

        _rando = Math.floor(Math.random()*_data.detailStruct.length);
        _newStr = _data.detailStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.subTitle.push(_newStr);

        _rando = Math.floor(Math.random()*_data.detailStruct.length);
        _newStr = _data.detailStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.subTitle.push(_newStr);

        if (_rarity)
            {
                _rando = Math.floor(Math.random()*_data.detailStruct.length);
                _newStr = _data.detailStruct[_rando];  
                _newStr = parseString(_newStr,_data,state.currentMedia);
                _newResult.subTitle.push(_newStr);

                _rando = Math.floor(Math.random()*_data.detailStruct.length);
                _newStr = _data.detailStruct[_rando];  
                _newStr = parseString(_newStr,_data,state.currentMedia);
                _newResult.subTitle.push(_newStr);

                _rando = Math.floor(Math.random()*_data.detailStruct.length);
                _newStr = _data.detailStruct[_rando];  
                _newStr = parseString(_newStr,_data,state.currentMedia);
                _newResult.subTitle.push(_newStr);

                _rando = Math.floor(Math.random()*_data.detailStruct.length);
                _newStr = _data.detailStruct[_rando];  
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
                setDate,
            },
          }}
        >
          {children}
        </AppContext.Provider>
      );
}



export const AppContext = createContext();