"use strict";
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require("http");
// https://socket.io/get-started/chat#integrating-socketio
const { Server } = require("socket.io");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
// app.get("/", (req: any, res: any) => {
//   res.sendFile(join('./src/', "index.html"));
// });
const port = process.env.PORT || 3000;
app
    .prepare()
    .then(() => {
    const app_ = express();
    const httpServer = createServer(app_);
    //새로운 Socket.IO 서버 생성
    const io = new Server(httpServer, {
        //http || https 서버 객체
        cors: {
            //옵션 객체 cors : CORS(Cross-Origin Resource Sharing) 설정을 구성,
            //클라이언트의 요청이 서버에 도달할 때의 동작을 제어
            origin: "*",
            methods: ["GET", "POST"], //허용할 HTTP 메서드
            // origin: [
            //   "*", // Allow all origins
            //   "http://localhost:3000",
            // ],
        },
        // https://socket.io/docs/v4/using-multiple-nodes
        // https://socket.io/docs/v4/server-options/#path
        path: "/comm/", //기본적으로 Socket.IO는 /socket.io/ 경로를 사용하지만, 여기서는 /comm/로 변경
    });
    io.on("connection", (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`);
        socket.on("connect", () => {
            console.log("🔥[socket] user connected", socket.id);
        });
        socket.on("disconnect", () => {
            console.log("🔥[socket] user disconnected", socket.id);
        });
        socket.on("chat_request", (data) => {
            console.log("message: " + socket.id + " " + data.text);
            io.emit("chat_response", { id: socket.id, text: data.text }); // This will emit the event to all connected sockets //브로드캐스팅...!
        });
        socket.on("image_request", (data) => {
            console.log("image_request: " + socket.id + " " + data.image);
            io.emit("image_response", { id: socket.id, text: data.image }); // This will emit the event to all connected sockets //브로드캐스팅...!
        });
    });
    app_.set("views", path.join(__dirname, "views"));
    app_.set("view engine", "ejs");
    app_.get("/ejs", (req, res) => {
        //res.send('Root routing');
        // render the index template // ejs
        res.render("index");
    });
    app.use(bodyParser.json());
    app.post("/execute", (req, res) => {
        const userInput = req.body.test;
        try {
            // 사용자 입력을 실행하고 결과를 반환
            const result = eval(userInput);
            res.json({ result });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
    app_.all("*", (req, res) => {
        return handle(req, res);
    });
    try {
        httpServer.listen(port, () => {
            console.log(`⚡️[server]: Ready on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error(error);
    }
})
    .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});
// server.listen(3000, () => {
//   console.log("server running at http://localhost:3000");
// });
