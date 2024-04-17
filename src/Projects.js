import styled from "styled-components"
import { useContext } from 'react';
import { useEffect } from 'react';

import { AppContext } from './AppContext'; 

import DATA from "./data.js";

const Projects = () =>{

    

    const {
        actions: {   
            getNewResult,
            addNewProject,
            changeProjectInfo, 
            deleteProject,
            selectProject,
        },
        state: { 
            currentMedia,
            userProjects,
            editingProject,
        },
    } = useContext(AppContext);

    

    return (
        <MainProjectsDiv>
          { 
            Object.keys(userProjects).map( (_projectCats,index) => { 
              return(
                
                <CategoryDiv key={"catDiv"+toString(index)}><h2>{_projectCats}</h2>
                    {userProjects[_projectCats].map((_project,_projectIndex)=>{
                        return( 
                            <ProjectsParagraph key={"projectsPara"+(_projectIndex.toString())}>
                                
                                {(editingProject[0] === _projectCats &&editingProject[1] === _projectIndex )&&(
                                    
                                    <NameInput
                                    key={"nameInput"+(_projectIndex.toString())}
                                    value={_project.name}
                                     onChange={(event)=>{
                                        changeProjectInfo(_project,"name",event.target.value)
                                     }}
                                    /> 
                                ) || ( <NameSpan
                                    key={"nameSpan"+(_projectIndex.toString())}
                                onClick={()=>{
                                    selectProject(_projectIndex);
                                }}
                                >{_project.name}</NameSpan>  )}
                            
                            &nbsp;- Genre:  <GenreSelect
                                    key={"genreSelect"+(_projectIndex.toString())}
                                onChange={(event)=>{
                                    changeProjectInfo(_project,"genre",event.target.value)
                                 }}
                                 value={_project.genre}
                            
                            >
                                {DATA[_projectCats].genre.map((_media,_mediaIndex)=>{
                                    return (
                                        <option key={_media+(_projectIndex.toString())}> {_media} </option>
                                    )
                                })}
                            </GenreSelect> - 
                            
                            Completion: 
                            
                            <CompletionInput  
                                key={"completionInput"+(_projectIndex.toString())}
                                type="number"
                                value = {_project.completion}

                                onChange={(event)=>{
                                    changeProjectInfo(_project,"completion",event.target.value)
                                }} 
                            ></CompletionInput>% - &nbsp;
                            
                            <DeleteButton
                            
                            key={"deleteButton"+(_projectIndex.toString())}
                                onClick={()=>{
                                    deleteProject(currentMedia,_projectIndex)
                                }}
                            >DELETE</DeleteButton></ProjectsParagraph>
                        )
                    })}

                <AddButton
                    onClick={()=>{
                        addNewProject(_projectCats)
                    }}
                >Add New</AddButton>
                </CategoryDiv>
              )  
            })
          }
        </MainProjectsDiv>
    )
}

export default Projects

const MainProjectsDiv = styled.div` 
width:100%;
height:100%;

`

const ProjectsParagraph = styled.div`
margin-left:20px;
line-height:20px;

`

const CompletionInput = styled.input`
padding:2px;
max-width:3em;
color:black;
margin:0.5em;
`

const GenreSelect = styled.select`
padding:4px;
color:black;
`

const NameSpan = styled.button` 
background:none;
border:none;
text-align:left;
width:20em;
color:white;

`

const NameInput = styled.input`
padding:2px;
width:20em;
color:black;
`

const DeleteButton = styled.button`
padding:2px 20px 2px 20px;
color:red;
`

const CategoryDiv = styled.div`
margin:10px;
h2{
    font-size:25px;
}
`

const AddButton = styled.button`
color:black;
padding:5px;
margin-left:30px;
`