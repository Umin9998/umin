"use client";

import useUserInfoStore from "@/app/test/store/userInfoStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
const Page = () => {
  const userInfoStore = useUserInfoStore();
  const { displayName, setDisplayName } = userInfoStore;
  const welcome = "welcome to hamster world";
  const router = useRouter();
  const handleSubmit = () => {
    alert(`Welcome ${displayName.toUpperCase()} hamster!`);
    router.push("/test/kr/test1/chat");
  };
  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Container>
      <Image
        src="/image/hamsters/hamster5.jpg"
        alt="hamster"
        width={0}
        height={0}
        quality={100}
        unoptimized
        style={{ width: "30rem", height: "auto", borderRadius: "50%" }}
      ></Image>
      <h1>{welcome.toUpperCase()}</h1>
      <div>
        <UserName
          placeholder="Enter your name"
          type="text"
          value={displayName}
          onKeyDown={(e: any) => {
            handleEnter(e);
          }}
          onChange={(e: any) => {
            setDisplayName(e.target.value);
          }}
        />
        <Button onClick={handleSubmit}>Enter</Button>
      </div>
    </Container>
  );
};

export default Page;

const fadeIn = keyframes`
  0% {
    
   text-shadow: 0 0 2px #fff, 0 0 3px #fff, 0 0 4px #fff, 0 0 5px #f0f,
  }
  100% {
   
    text-shadow: 0 0 4px #fff, 0 0 5px #fff, 0 0 6px #fff, 0 0 7px #f0f,
    0 0 8px #f0f, 0 0 9px #f0f, 0 0 10px #f0f, 0 0 11px #f0f;
  }
`;
const imageAnimation = keyframes`
  0% {
    
filter: drop-shadow(0px 0px 10px #fff);
  }
  100% {
   
    filter: drop-shadow(0px 0px 10px #f0f);
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000;
  h1 {
    color: hotpink;
    font-size: 4rem;
    font-weight: 700;
    animation: ${fadeIn} 0.5s ease-in-out alternate infinite;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  img {
    animation: ${imageAnimation} 0.5s ease-in-out alternate infinite;
  }
`;

const UserName = styled.input`
  width: 20rem;
  height: 3rem;

  padding: 0.5rem;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
`;
const Button = styled.button`
  width: 20rem;
  height: 3rem;

  padding: 0.5rem;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  background-color: hotpink;
  color: #fff;
`;
