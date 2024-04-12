import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import styled from "styled-components"
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import {auth, provider} from "../firebase.js";
import {signInWithPopup} from "firebase/auth"
const Container = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
height: calc(100vh - 86px);
color: ${({theme})=> theme.text};
margin-top: 30px;

`;

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
background-color: ${({theme})=> theme.bgLighter};
border:1px solid ${({theme})=> theme.soft};
padding: 20px 50px;
gap: 10px;

`;

const Title = styled.h1`
font-size: 24px;
`;

const SubTitle = styled.h2`
font-size: 20px;
font-weight: 300;
`;

const Input = styled.input`
border: 1px solid ${({theme})=> theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
width: 100%;
color: white;
`;

const Button = styled.button`
border-radius: 3px;
border: none;
padding: 7px 20px;
font-weight: 500;
cursor: pointer;
background-color: ${({theme})=> theme.soft};
color: ${({theme})=> theme.textSoft};
&:hover {
  background-color: #3ea6ff;
  color: black;
}

`;

const More = styled.div`
display: flex;
margin-top: 10px;
font-size: 12px;
font-size: 10px;
color: ${({theme})=> theme.textSoft};

`;

const Links = styled.div`
margin-left: 50px;
`;

const Link = styled.span`
margin-left: 30px;
`;

export const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
 const handleLogin = async (e)=>{
   e.preventDefault();
   dispatch(loginStart())
   try{
     const res = await axios.post(`http://localhost:8000/api/auth/signin`, {name, password},{
      withCredentials: true,
     });
     console.log("res",res.data);
     dispatch(loginSuccess(res.data))
   }catch(err){
     dispatch(loginFailure())
   }
 } 

 const signInWithGoogle = () =>{
  dispatch(loginStart())
  signInWithPopup(auth,provider).then( async(result)=> {
    await axios.post(`http://localhost:8000/api/auth/google`,{
      name: result.user.displayName,
      email: result.user.email,
      img: result.user.photoURL,
    },{
      withCredentials: true,
    }).then((res)=>{
      dispatch(loginSuccess(res.data))
    })
  }).catch((error)=>{
    dispatch(loginFailure(error))
  })
 }
  return (
    <Container>
       <Wrapper>
          <Title>Sign in</Title>
          <SubTitle>to continue to GhaniTube</SubTitle>
          <Input placeholder='username' onChange={(e)=> setName(e.target.value)}/>
          <Input type='password' placeholder='password' onChange={(e)=> setPassword(e.target.value)}/>
          <Button onClick={handleLogin}>Sign in</Button>
          <Button onClick={signInWithGoogle}>Signin with Google</Button>
          <Title>or</Title>
          <Input placeholder='username' onChange={(e)=> setName(e.target.value)}/>
          <Input type='email' placeholder='email' onChange={(e)=> setEmail(e.target.value)}/>
          <Input type='password' placeholder='password' onChange={(e)=> setPassword(e.target.value)}/>
          <Button>Sign up</Button>
       </Wrapper>
       <More>
        English(USA)
        <Links>
        <Link>
         Help
        </Link>
        <Link>
         Privacy
        </Link>
        <Link>
         Terms
        </Link>
        </Links>
       </More>
    </Container>
  )
}
