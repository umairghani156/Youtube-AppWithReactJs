import React from 'react'
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { useState } from 'react';
import { Upload } from './Upload';
import {useNavigate} from "react-router-dom";

const Container = styled.div`
position: sticky;
top: 0;
background-color:  ${({theme})=> theme.bgLighter};
height: 50px;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 20px;
  position: relative;

`
const Search = styled.div`
width: 40%;
position: absolute;
left: 0;
right: 0;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius: 6px;
color: ${({theme})=> theme.text}

 
`
const Input = styled.input`
border: none;
background-color: transparent;
outline: none;
color: white;
`
const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
cursor: pointer;
display: flex;
align-items: center;
margin-top: 6px;
gap: 5px;
font-size: 12px;

`;

const User = styled.div`
 display: flex;
 align-items: center;
 gap: 10px;
 font-weight: 500;
 color:  ${({theme})=> theme.text};
 cursor: pointer;
`;

const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;

`;
export const Navbar = () => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false);
  const [q, setQ] = useState("");
  const {currentUser} = useSelector(state => state.user);
  console.log(currentUser);
  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder='Search' onChange={(e)=> setQ(e.target.value)}/>
          <SearchOutlinedIcon onClick={()=> navigate(`/search?q=${q}`)}/>
        </Search>
        {currentUser ?
        <User>
          <VideoCallOutlinedIcon onClick={()=> setOpenModal(true)}/>
          <Avatar src={currentUser.img}/>
          {currentUser.name}
        </User>
        :<Link to='signin' style={{textDecoration:"none"}}>
        <Button>
          <AccountCircleOutlinedIcon/>
          SIGN IN
          </Button>
          </Link>}

      </Wrapper>
    </Container>
    {
      openModal && <Upload setOpenModal={setOpenModal}/>
    }
    </>
  )
}
