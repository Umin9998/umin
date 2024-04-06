"use client";

import { Container, Form, Input, Button, Messages } from "./page.styled";
import React, { useEffect, useState } from "react";
import Image from "next/image";
//import { socket } from "./socket";
//import io from "socket.io-client";
import { socket } from "./socket";
import { ConnectionState } from "./ConnectionState";
import useUserInfoStore from "@/app/test/store/userInfoStore";
import styled from "styled-components";

type EventsProps = {
  events: string[];
};

const Page = () => {
  const userInfoStore = useUserInfoStore();
  const { displayName } = userInfoStore;
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [file, setFile] = useState<File | null>(null);

  const [input, setInput] = useState("");
  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };
    const onChatEvent = (data: any) => {
      console.log("onChatEvent", data);
      setMessages((prevMessages: any) => [...prevMessages, data]);
      window.scrollTo(0, document.body.scrollHeight);
      //setFooEvents((previous: any) => [...previous, data]);
      //setFooEvents(fooEvents.concat(value));
    };
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat_response", onChatEvent);
    socket.on("image_response", onChatEvent);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat_response", onChatEvent);
      socket.off("image_response", onChatEvent);
    };
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (input.trim() !== "") {
      console.log("input", input);
      socket.emit("chat_request", { id: 0, text: input });
      setInput("");
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const base64Data = e.target.result.toString().split(",")[1];
          console.log("base64Data", base64Data);
          socket.emit("image_request", { id: 0, image: base64Data });
        }
      };
      setFile(null);
      reader.readAsDataURL(file);
    }
  };
  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  console.log("messages", messages);

  return (
    <Container>
      <ConnectBtns>
        <Button onClick={connect}>connect</Button>
        <Button onClick={disconnect}>Disconnect</Button>
      </ConnectBtns>
      <ConnectionState isConnected={isConnected} />
      <Messages>
        {messages.map((msg: any, index: any) => {
          console.log(msg.text);
          return (
            <li key={index}>
              <div>{`[${displayName.toUpperCase()} HAMSTER]`}</div>
              <div className="content">
                {msg.text != undefined ? (
                  <div className="textBox">{msg.text}</div>
                ) : (
                  <Image
                    className="imageBox"
                    src={`data:image/png;base64,${msg.image}`}
                    alt="hamster"
                    width={0}
                    height={0}
                    quality={100}
                    sizes="100vw"
                    style={{
                      width: "20rem",
                      height: "auto",
                      borderRadius: "0.8rem",
                    }}
                    unoptimized
                  ></Image>
                )}
                <span>{formattedDate}</span>
              </div>
            </li>
          );
        })}
      </Messages>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="file">
          <Image
            src="/image/hamsters/hamster10.png"
            alt="hamster"
            width={0}
            height={0}
            quality={100}
            sizes="100vw"
            style={{
              width: "10rem",
              height: "auto",
              filter: "drop-shadow(0px 0px 3px #fff)",
            }}
            unoptimized
          ></Image>
        </Label>
        <input
          id="file"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Input
          type="text"
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          onKeyDown={handleEnter}
        />
        <Button type="submit">Send</Button>
      </Form>
    </Container>
  );
};

export default Page;

const ConnectBtns = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 0.5rem;
`;

const Label = styled.label`
  width: 5rem;
  height: 5remn;

  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hotpink;
  cursor: pointer;
  border-radius: 0.8rem;
  overflow: hidden;
`;
