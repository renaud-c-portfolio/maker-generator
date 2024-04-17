import { createContext,useReducer } from "react";    
import { Howl, Howler } from "howler";
import choirURL from "./sfx/heavenchoir.ogg";
import DATA from "./data.js";
import { type } from "@testing-library/user-event/dist/type/index.js";


const heavenChoir = new Howl({
    src: choirURL,
    format: ['ogg'],
    autoplay: false,
    loop: false,
    volume: 0.15, 
  });

const _userProjectsTemplate = [];
for (let _i = 0; _i < DATA.medias.length; _i++ )
{
    _userProjectsTemplate[DATA.medias[_i]] = [];
}

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
        userProjects: {..._userProjectsTemplate},

        editingProject:[null,null],
 
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

 
const setSeed = (_type) => {
    if (globalTime != "")
    {
        if (_type === 1)
        {

        }

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

//returns a real from 0 and below (data) using our seed
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


//changing initial idea that generated strings, now to accomodate multiple media types 
const parseResult = (_result,_state) => {

    const _makerType = DATA[_state.currentMedia]["maker"];
    const _projectsType = _result[0][0];
    console.log("projects type",_projectsType)
    const _newResult = {
        maker:["MAKE A NEW "+_makerType+":"],
        mainTitle:[],
        subTitle:[],
        extras:[], 
        rarity:0,
    }; 

    if (_projectsType === 1)
    {
        if (_state.userProjects[_state.currentMedia].length > 0)
        {
            let _randomy = _result[0][1];
            while (_randomy >= _state.userProjects[_state.currentMedia].length)
            {
                _randomy -= _state.userProjects[_state.currentMedia].length;
                while (_randomy < 0)
                {
                    _randomy += Math.floor(_state.userProjects[_state.currentMedia].length/2);
                }
            }
            let _str = _state.userProjects[_state.currentMedia][_randomy].name;
            _newResult.maker = ["WORK ON YOUR OLD "+_makerType+", "+ _str+"!"] 
        }
        else
        {
            _newResult.maker = ["YOU HAVE NO "+_makerType+" PROJECTS YET.. BUT IF YOU MADE ONE"];
        }
        
    }

    const _newResultObj = {
        maker:[],
        mainTitle: [],
        subTitle: [],
        rarity: 0,
    };



    for (let _i = 1; _i < _result.length; _i++)
    {
        const _smallResultArr = _result[_i]; 
        console.log("checking the results to parse ",_smallResultArr);
        
        const _dest = _smallResultArr[0];
        const _struct = _smallResultArr[1];
        let _resultIndex = _smallResultArr[2];
        while (_resultIndex >=  DATA[_state.currentMedia][_struct].length)
        {
            _resultIndex -= DATA[_state.currentMedia][_struct].length;
            if (_resultIndex < 0) {_resultIndex = 0;}
        }
        const _mainStructString = DATA[_state.currentMedia][_struct][_resultIndex]; 
        const _finalStr = parseStringFromResultIndex(_mainStructString,DATA,_state.currentMedia,_smallResultArr);
        _newResult[_dest].push(_finalStr);
    }

    return _newResult;

}

///New parsestring to get a clean string from an array of RNG results to use as indexes
const parseStringFromResultIndex = (_string,_data,_mediaType,_resultIndexArray) => {
    
    let found = true;
    let _str = _string;
    let _finalStr = "";
    let _resultIndex = 3;

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
                let _checkIndex = _resultIndexArray[_resultIndex];
                const _packLength = _data.packages[_keyword].length; 
 
                while (_checkIndex >= _packLength)
                {  
                    _checkIndex -= _packLength; 
                    if (_checkIndex < 0) {_checkIndex = -_checkIndex;}
                }
                const _rando = _checkIndex; 
                _finalStr += _data.packages[_keyword][_rando];   
                _resultIndex += 1; 
                if (_resultIndex >= _resultIndexArray.length) {_resultIndex = 3;}
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
                let _checkIndex = _resultIndexArray[_resultIndex];
                const _packLength = _data[_mediaType][_keyword].length; 
                
                while (_checkIndex >= _packLength)
                {  
                    _checkIndex -= _packLength; 
                    if (_checkIndex < 0) {_checkIndex = -_checkIndex;}
                } 

                const _rando = _checkIndex;
                _finalStr += _data[_mediaType][_keyword][_rando];  
                
                _resultIndex += 1;
                if (_resultIndex >= _resultIndexArray.length) {_resultIndex = 3;}
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
 

///Old parsestring to get a clean string while using the RNG
const parseString = (_string,_data,_mediaType,_resultArray) => {

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
                _resultArray.push(_rando);
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
                _resultArray.push(_rando);
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




const saveProjectsToLocal = (state) =>{

    const projectsJson = JSON.stringify(state.userProjects); 
    localStorage.setItem("projects",projectsJson);

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
        case "add-new-project":{
            
            const _projectCat = action.data;
            const _projects = {...state.userProjects};
            const _categoryProjects = _projects[_projectCat];
                _categoryProjects.push({name:"new project",category:_projectCat,genre:"none",completion:0});
            return ( 
                
                {
                    ...state,
                    editingProject:[_projectCat,_categoryProjects.length-1],
                    userProjects: {..._projects}
                } 

            )}

            case "delete-project":{
            
                const _projectCat = action.data[0];
                const _projects = {...state.userProjects};
                const _categoryProjects = _projects[_projectCat];

                _categoryProjects.splice(action.data[1],1);

                saveProjectsToLocal(state);

                return ( 
    
                    {
                        ...state,
                        editingProject:[_projectCat,_categoryProjects.length-1],
                        userProjects: {..._projects}
                    } 
                )}

            case "select-project":{ 

                return ( 
    
                    {
                        ...state,
                        editingProject:[state.currentMedia,action.data], 
                    } 
                )

            }

            case "change-project-info":
            {
                const _project = action.data[0];
                _project[action.data[1]] = action.data[2];
                saveProjectsToLocal(state);



            return ( 

                {
                    ...state, 
                } 
            )} 

            case "load-projects":
            {  
                const _jsonProj = localStorage.getItem("projects");
                let _projectObject = state.userProjects;
                if (_jsonProj != undefined)
                {
                    _projectObject = JSON.parse(_jsonProj); 
                }

                console.log(_projectObject);
                return (
                    {
                        ...state,
                        userProjects: {..._projectObject},
                    }
                )
            }
            

            case "change-media":
                {  
                      
                    return (
                        {
                            ...state,
                            currentMedia : action.data,
                        }
                    )
                }
            


            
                
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
            setSeed(0); 
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
    // ------------MAIN RNG FUNCTION------------
    const getNewResult = (resultType) =>{ 
         
        setSeed(resultType);  
        console.log("result type",resultType)
         
        const _newResultArray = [];
        const _projectsArray = [];
        _newResultArray.push(_projectsArray);
        let _rando = 0;
         
        let _data = structuredClone(DATA);
        let _newResult = {
            maker:["MAKE A NEW GAME:"],
            mainTitle:[],
            subTitle:[],
            extras:[], 
            rarity:0,
        };

        if (resultType >= 1)
        {
            let _projecting = 0;
            if (resultType == 2)
            {
                _projectsArray.push(1);
                _projecting = 1;
                _newResult.maker = ["Work on your old project"];
            }
            else
            {
                _projecting = 1;
                _rando = Math.floor(randomer(2));
                _projectsArray.push(_rando);
                if (_rando){_newResult.maker = ["Work on your old project"];}
                
            }
            if (_projecting)
            {
                _rando = Math.floor(randomer(9999)); 
                _projectsArray.push(_rando);
            }
        }
        else
        {
            _projectsArray.push(0);
        }

        

    
        
        let _rarity = 0;

        if (randomer(10) > 9)
        {
            _rarity = 1;
        }

        
        

        _rando = Math.floor(randomer(DATA.mainStruct.length));
        let _newStr = _data.mainStruct[_rando];  
        let _newArr = ["mainTitle","mainStruct",_rando]; 
        _newStr = parseString(_newStr,_data,"videogame",_newArr);
        _newResult.mainTitle.push(_newStr);
        _newResultArray.push(_newArr);

            _rando = Math.floor(randomer(_data.subStruct.length));
            _newStr = _data.subStruct[_rando];  
             _newArr = ["mainTitle","subStruct",_rando];
            _newStr = parseString(_newStr,_data,"videogame",_newArr);
            _newResult.mainTitle.push(_newStr); 
            _data.subStruct.splice(_rando,1);
            _newResultArray.push(_newArr);

            if (_rarity)
            { 
                _rando = Math.floor(randomer(_data.subStruct.length));
                _newStr = _data.subStruct[_rando];  
                _newArr = ["mainTitle","subStruct",_rando];
                _newStr = parseString(_newStr,_data,"videogame",_newArr);
                _newResult.mainTitle.push(_newStr); 
                _newResultArray.push(_newArr);
             }
    
        _rando = Math.floor(randomer(_data.detailStruct.length));
        _newStr = _data.detailStruct[_rando];
        _newArr = ["subTitle","detailStruct",_rando];
        _newStr = parseString(_newStr,_data,"videogame",_newArr);
        _newResult.subTitle.push(_newStr);
        _newResultArray.push(_newArr);

        _rando = Math.floor(randomer(_data.detailStruct.length));
        _newStr = _data.detailStruct[_rando];  
        _newArr = ["subTitle","detailStruct",_rando];
        _newStr = parseString(_newStr,_data,"videogame",_newArr);
        _newResult.subTitle.push(_newStr);
        _newResultArray.push(_newArr);

        _rando = Math.floor(randomer(_data.detailStruct.length));
        _newStr = _data.detailStruct[_rando];  
        _newArr = ["subTitle","detailStruct",_rando];
        _newStr = parseString(_newStr,_data,"videogame",_newArr);
        _newResult.subTitle.push(_newStr);
        _newResultArray.push(_newArr);

        if (_rarity)
            {
                _rando = Math.floor(randomer(_data.detailStruct.length));
                _newStr = _data.detailStruct[_rando];  
                _newArr = ["subTitle","detailStruct",_rando];
                _newStr = parseString(_newStr,_data,"videogame",_newArr);
                _newResult.subTitle.push(_newStr);
                _newResultArray.push(_newArr);

                _rando = Math.floor(randomer(_data.detailStruct.length));
                _newStr = _data.detailStruct[_rando];  
                _newArr = ["subTitle","detailStruct",_rando];
                _newStr = parseString(_newStr,_data,"videogame",_newArr);
                _newResult.subTitle.push(_newStr);
                _newResultArray.push(_newArr);

                _rando = Math.floor(randomer(_data.detailStruct.length));
                _newStr = _data.detailStruct[_rando];  
                _newArr = ["subTitle","detailStruct",_rando];
                _newStr = parseString(_newStr,_data,"videogame",_newArr);
                _newResult.subTitle.push(_newStr);
                _newResultArray.push(_newArr);

                _rando = Math.floor(randomer(_data.detailStruct.length));
                _newStr = _data.detailStruct[_rando];  
                _newArr = ["subTitle","detailStruct",_rando];
                _newStr = parseString(_newStr,_data,"videogame",_newArr);
                _newResult.subTitle.push(_newStr);
                _newResultArray.push(_newArr);
            
                 heavenChoir.play();
            }  
            
            _newResult = parseResult(_newResultArray,state);

         _newResult.rarity = _rarity;
            dispatch({
            type: "get-new-result",
            data: _newResult,
            })  
    }

    const changeMedia = (mediaType) => {
        dispatch({
            type: "change-media",
            data: mediaType,
            }) 

    }

    const addNewProject = (projectCategory) =>{

        dispatch({
            type: "add-new-project",
            data: projectCategory,
            }) 
    }

    const deleteProject = (projectMedia,projectIndex) =>{


        dispatch({
            type:"delete-project",
            data:[projectMedia,projectIndex]
        })
    }

    const selectProject = (projectIndex) => {


        dispatch({
            type:"select-project",
            data:projectIndex,
        })
    }

    const changeProjectInfo = (project,projectKey,projectValue) => {

        dispatch({
            type: "change-project-info",
            data: [project,projectKey,projectValue],
            }) 
    }

    const loadProjects = () => {

        dispatch(
            {
                type:"load-projects",
                data: null,
            }
        )
    }
 
    
    return (
        <AppContext.Provider
          value={{

            state,  
            actions: {    
                changeMedia,

                changeProject,changeTime,
                getNewResult,
                setDate,
                setSeedRandom,
                randomer,

                selectProject,
                addNewProject,
                deleteProject,
                changeProjectInfo,

                loadProjects,
            },
          }}
        >
          {children}
        </AppContext.Provider>
      );
} 

export const AppContext = createContext();