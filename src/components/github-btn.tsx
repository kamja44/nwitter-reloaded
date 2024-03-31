import { GithubAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    margin-top: 40px;
    background-color: white;
    font-weight: 500;
    width: 100%;
    color: black;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Logo = styled.img` 
    height: 25px;
`;

export default function GithubButton(){
    const nagivate = useNavigate();
    const onClick = async () => {
        try{
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider); // 팝업창을 이용한 로그인
            // await signInWithRedirect(auth, provider); // redirect를 이용한 로그인
            nagivate("/")
        }catch(error){
            console.log(error)
        }
    }
    return <Button onClick={onClick}>
        <Logo src="/github-logo.svg" />
        Continue with Github
    </Button>
}