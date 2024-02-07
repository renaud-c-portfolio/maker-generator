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
let randomSeed = 999999;
let timeSelect = "daily";
let projectsSelect = "global";
let globalTime = "";

const initialState = {    

        timeSelected: "",
        projectsSelected: "global",
        lastDay: 0,
        lastWeek: 0,
        lastMonth: 0,
        lastSeason: 0,
        lastYear: 0, 
        

        currentMedia: "videogame",
        currentRarity: "",
        resultQuality: "common",
        globalTime: "",
        userName: "",
 
        currentResult:{ 

            maker:["Temporary"],
            mainTitle:["Time"],
            subTitle:["testy","testo","testooo"],
            extras:["balbo","balby","bamboon"], 
            
    },

}

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    var millisecsInDay = 86400000;
    return Math.ceil((((this - onejan) / millisecsInDay) + onejan.getDay() + 1) / 7);
  };

 
const setSeed = () => {
    if (globalTime != "")
    {
 

        let _projData = 0;
        projectsSelect.split("").forEach(element => { 
            _projData+=element.charCodeAt(0);
        });
        let _day = 0;
        let _weekday = 0;

       if (timeSelect === "daily")
       { 
           _day = globalTime.getDate()+1;
          _weekday = globalTime.getDay()+1;
       } 

       let _week = 0;
       if (timeSelect === "daily" || timeSelect === "weekly")
       {
         _week = globalTime.getWeek();
       } 

       let _month = 0 
       if (timeSelect != "seasonal" && timeSelect != "yearly")
       {
        _month = globalTime.getMonth()+1; 
       }

       let _season = 0;
       if (timeSelect != "yearly")
       {
        _season = Math.floor(globalTime.getMonth()/4)+1;
       } 

       const _year = globalTime.getFullYear();
       
       let _bigNumber = ((_day*773)*(_day*773)+(_weekday*1523)*(_weekday*1523)+(_week*19)*(_week*19)+(_month*17)*(_month*17)+(_season*11)+(_season*11)+(52711*_year)*(52711*_year))*_projData;
       let _gigaNumber = _bigNumber*_bigNumber;

       randomSeed = _gigaNumber;  
       console.log("seed was set ",_gigaNumber)
    }
    else
    {
        console.log("no time for it...")
    } 
} 

const randomer = (data) => { 

        
    const _cool = (randomSeed % 10000)/10000*data;

    let _newSeed = Math.floor(randomSeed/10000);
    _newSeed = ((data+1)*(data+1)*(_cool+1)*1523*_newSeed)  % 10000000000000; 

    randomSeed = _newSeed
    return _cool;  
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
                const _rando = Math.floor(randomer(_data.packages[_keyword].length));
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
                const _rando = Math.floor(randomer(_data[_mediaType][_keyword].length));
                _finalStr += _data[_mediaType][_keyword][_rando];
                if (randomer(10) > 1 || _keyword === "none"){ 
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






//====REDUCER==============================================


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
        globalTime = new Date(action.data);
        globalTime = new Date(1995, 5, 3);
            return (
                {
                    ...state,
                    globalTime:new Date(action.data),
                }
            ) 
        //--------------------------------
        case "change-project":
            return (
                {
                    ...state,
                    projectsSelected:action.data,
                } 
            )
        case "change-time":
            return (
                {
                    ...state,
                    timeSelected:action.data,
                } 
            ) 
                
        default:
            throw new Error(`Unrecognized action: ${action.type}`);
        break;
        //---------the end----------====================================================
    }
}

 

///=================================provider functions====================
export const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    //send a random get to server and extracts server time from it
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
    

    const setSeedRandom = () => {
         if (state.globalTime != "")
         {
            setSeed(); 
         } 
    } 
   
     
    //change global section
    const changeProject = (data) => { 
        
        projectsSelect = data;
        dispatch({
            type: "change-project",
            data: data,
            })  
    }

    //change time result
    const changeTime = (data) => { 
        
        timeSelect = data;
        dispatch({
            type: "change-time",
            data: data,
            })  
    }


    //gets a result from the current 
    const getNewResult = (data) =>{ 

        setSeed();

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
        if (randomer(10) > 5)
        {
            _rarity = 1;
        }
        

        let _rando = Math.floor(randomer(DATA.mainStruct.length));
        let _newStr = _data.mainStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.mainTitle.push(_newStr);

            _rando = Math.floor(randomer(_data.subStruct.length));
            _newStr = _data.subStruct[_rando];  
            _newStr = parseString(_newStr,_data,state.currentMedia);
            _newResult.mainTitle.push(_newStr); 
            _data.subStruct.splice(_rando,1);

            if (_rarity)
            {
                
            _rando = Math.floor(randomer(_data.subStruct.length));
            _newStr = _data.subStruct[_rando];  
            _newStr = parseString(_newStr,_data,state.currentMedia);
            _newResult.mainTitle.push(_newStr);
            
             }
    
        _rando = Math.floor(randomer(_data.detailStruct.length));
        _newStr = _data.detailStruct[_rando];
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.subTitle.push(_newStr);

        _rando = Math.floor(randomer(_data.detailStruct.length));
        _newStr = _data.detailStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.subTitle.push(_newStr);

        _rando = Math.floor(randomer(_data.detailStruct.length));
        _newStr = _data.detailStruct[_rando];  
        _newStr = parseString(_newStr,_data,state.currentMedia);
        _newResult.subTitle.push(_newStr);

        if (_rarity)
            {
                _rando = Math.floor(randomer(_data.detailStruct.length));
                _newStr = _data.detailStruct[_rando];  
                _newStr = parseString(_newStr,_data,state.currentMedia);
                _newResult.subTitle.push(_newStr);

                _rando = Math.floor(randomer(_data.detailStruct.length));
                _newStr = _data.detailStruct[_rando];  
                _newStr = parseString(_newStr,_data,state.currentMedia);
                _newResult.subTitle.push(_newStr);

                _rando = Math.floor(randomer(_data.detailStruct.length));
                _newStr = _data.detailStruct[_rando];  
                _newStr = parseString(_newStr,_data,state.currentMedia);
                _newResult.subTitle.push(_newStr);

                _rando = Math.floor(randomer(_data.detailStruct.length));
                _newStr = _data.detailStruct[_rando];  
                _newStr = parseString(_newStr,_data,state.currentMedia);
                _newResult.subTitle.push(_newStr);
            
                 heavenChoir.play();
            } 
            console.log("da resulto",_newResult);
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
                changeProject,changeTime,
                getNewResult,
                setDate,
                setSeedRandom,
                randomer,
            },
          }}
        >
          {children}
        </AppContext.Provider>
      );
}



export const AppContext = createContext();