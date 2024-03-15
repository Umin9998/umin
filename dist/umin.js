"use strict";
// let debug = true;
// // socketController.ts
// import { Server as IOServer, Socket } from "socket.io";
// import * as CANNON from "cannon-es";
// const MAX_FPS = 60;
// const MAX_FPS_INV = 1 / 60;
// const TICK_RATE = 1000 / MAX_FPS; // 1000ms / 60fps = 16.6667ms // Target tick rate: 60 times per second
// // object without physics
// interface GeneralObject3D {
//   id: number; // index
//   sid: string; // socket ID
//   p: { x: number; y: number; z: number }; //🥛 position
//   r: { x: number; y: number; z: number }; //🥛 rotation
//   t: number; // timestamp
// }
// // object to hold physics bodies with identifiers
// interface PhysicsObject3D {
//   id: number; // index
//   sid: string; // socket ID
//   body: CANNON.Body;
//   t: number; // timestamp
// }
// //🥛 세계관 : 클라이언트는 여러개의 오브젝트를 가지고 있을 수 있음
// // interface PhysicsObject3DGroup {
// //   id: string; // socket ID
// //   physicsObjects: Map<number, PhysicsObject3D>;
// // }
// interface Object3DGroup {
//   id: string; // socket ID
//   physicsObject3Ds?: Map<number, PhysicsObject3D>;
//   GeneralObject3Ds?: Map<number, GeneralObject3D>;
// }
// interface Client {
//   id: string; // socket ID
//   o: Map<number, GeneralObject3D>;
//   op: Map<number, PhysicsObject3D>;
//   t: number; // timestamp
//   text?: string;
// }
// // Collection of physics objects
// //const physicsObjects: PhysicsObject[] = [];
// //const physicsObjects: { [id: string]: CANNON.Body } = {}; // Store physics objects with an ID
// // Map to associate socket IDs with their physics objects
// //const object3DGroups: Map<string, PhysicsObject3DGroup> = new Map(); // socket ID, physics objects //🥛 눈으로 보는 것들은 다 오브젝트로 표현을 하고, 그중에 물리법칙이 적용된 오브젝트와 그렇지 않은게 나눠져 있는데
// const object3DGroups: Map<string, Object3DGroup> = new Map(); //🥛스트링이 소켓이면 : 클라이언트에 속한 오브젝트 그룹
// const gameClients: Map<string, Client> = new Map(); // socket ID, client
// type UpdatePhysics = () => void;
// // Define a generic type for the update function
// // This function takes a deltaTime in seconds and any additional arguments you might need
// // UpdateFunction Type: This type definition allows you to specify what parameters your update function should accept. In this example, it takes deltaTime as a mandatory parameter, which represents the time elapsed since the last update, and an optional spread parameter ...args for any additional arguments you might need.
// type UpdateFunction = (deltaTime: number, ...args: any[]) => void;
// export class SocketIO {
//   private _io: IOServer;
//   private _sockets: Map<string, Socket> = new Map(); // Store sockets by ID
//   //private _world: CANNON.World | null = null;
//   private _world: CANNON.World;
//   //private _frameDelta: number = 0; // accumulator
//   //private _lastTime: number = Date.now();
//   private _lastTime: number = performance.now(); // Use performance.now() for higher precision if available
//   private _accumulator: number = 0.0; // Accumulate time to account for timing discrepancies
//   private _objectIndex: number = 0; //🥛 소듕햇..
//   constructor(io: IOServer, world: CANNON.World) {
//     //🥛 타입스크립트 세계에선 클래스가 짱이징 (냠)
//     this._io = io;
//     this._world = world;
//     // When you encounter an issue where a class property like _world becomes undefined in methods called asynchronously (e.g., via setTimeout or within a callback), the problem often stems from how this is handled in JavaScript. Specifically, the context (this) can change based on how and where a function is called, leading to scenarios where this doesn't refer to the class instance as expected.
//     // To fix this, you can explicitly bind the method to the class instance in the constructor, ensuring that this always refers to the class instance, regardless of how the method is called.
//     // To address this issue, ensure that methods accessing class properties are either:
//     // - Bound to the class instance explicitly
//     // - Defined as arrow functions, which don't have their own this context and therefore inherit this from the surrounding scope (i.e., your class instance)
//     //   (Called using an arrow function, which automatically binds this to the class instance)
//     // Both approaches ensure that this within updatePhysics (and any other method that needs access to class properties) correctly refers to the class instance, allowing you to access _world and other properties as intended, even when the methods are called asynchronously.
//     // Explicitly bind class methods to the instance in the constructor to ensure they maintain the correct this context.
//     // Explicitly bind the method to ensure 'this' refers to the class instance
//     this.updatePhysicsSimple = this.updatePhysicsSimple.bind(this);
//   }
//   public initializeSocket() {
//     //🥛 공개! ..
//     this._io.on("connection", (socket: Socket) => {
//       //console.log(socket.constructor.name);
//       console.log(`👽 A user connected: ${socket.id}`);
//       /** 지켜줘야 할 부분  */
//       this._sockets.set(socket.id, socket); // Store the socket
//       const newPhysicsObject = this.createPhysicsObject(socket); // Create a physics object for the new user
//       // let text_;
//       // socket.on("request_data", (data) => {
//       //   console.log(data, "request_data");
//       //   text_ = data.text;
//       //   this._io.emit("response_data", text_);
//       // });
//       // const newClient: Client = {
//       //   id: socket.id,
//       //   o: new Map(),
//       //   op: new Map(),
//       //   t: Date.now(),
//       //   text: "",
//       // };
//       // newClient.op.set(newPhysicsObject.id, newPhysicsObject);
//       // newClient.text = text_;
//       // console.log(newClient, "newClient");
//       // gameClients.set(socket.id, newClient);
//       // let room: any;
//       // let displayName: any;
//       let newClient: Client = {
//         id: socket.id,
//         o: new Map(),
//         op: new Map(),
//         t: Date.now(),
//         text: "",
//       };
//       // socket.on("joinRoom", async (data: any) => {
//       //   // 기존 방에서 나오기
//       //   if (room) {
//       //     socket.leave(room);
//       //   }
//       //   // 새로운 채팅방 입장
//       //   room = data.room;
//       //   displayName = data.displayName;
//       //   socket.join(room);
//       //   try {
//       //   } catch (e) {
//       //     // TODO: 실패 시 처리
//       //     return;
//       //   }
//       // });
//       socket.on("chat_request", async (data: any) => {
//         console.log(data, "chat_request");
//         this._io.emit("response_data", data.text);
//         try {
//           newClient.text = data.text;
//           newClient.op.set(newPhysicsObject.id, newPhysicsObject);
//           gameClients.set(socket.id, newClient);
//           //
//           // const currentRoomId = await db.get(`SELECT id FROM rooms WHERE name = ?`, data.room);
//           // console.log('currentRoomId', currentRoomId);
//           // result = await db.run(`INSERT INTO messages (room_id, content, userDisplayName) VALUES ( ?, ?, ?)`, [
//           //   currentRoomId.id,
//           //   data.text,
//           //   data.displayName
//           // ]);
//         } catch (e) {
//           console.log(e, "result");
//           // TODO: 실패 시 처리
//           return;
//         }
//         socket.emit("id", socket.id); // Send the user their ID
//         // Emit connected client to all clients
//         this._io.emit("clientConnected", socket.id);
//         this.broadcastSocketIds();
//         // Emit the list of connected clients to the new client
//         // 메시지와 함께 오프셋을 포함하여 응답
//       });
//       // get client information from database
//       // ...
//       // socket.on("connect", (msg: any) => {
//       //   console.log(
//       //     "🔥[socket] User connected: " + socket.id,
//       //     ", message: " + msg
//       //   );
//       //   // Emit connected client to all clients
//       //   this._io.emit("clientConnected", socket.id);
//       // });
//       // socket.on('disconnect', () => {
//       //   console.log('User disconnected: ' + socket.id);
//       //   // Remove the object from the world and the collection when the user disconnects
//       //   const index = physicsObjects.findIndex(obj => obj.id === socket.id);
//       //   if (index !== -1) {
//       //     this._world.removeBody(physicsObjects[index].body);
//       //     physicsObjects.splice(index, 1);
//       //   }
//       // });
//       // Setup event listeners or emitters for the socket
//       socket.on("disconnect", () => {
//         console.log("👽 The user disconnected: " + socket.id);
//         // Remove the object associated with the disconnecting client
//         const object3DGroup = object3DGroups.get(socket.id);
//         if (object3DGroup && object3DGroup.physicsObject3Ds) {
//           object3DGroup.physicsObject3Ds.forEach((obj) => {
//             this._world.removeBody(obj.body);
//             //physicsObjectGroup.physicsObjects.delete(obj.id);
//             // Optionally, emit the removed object to all clients
//             this._io.emit("objectRemoved", {
//               id: obj.id,
//               sid: socket.id,
//             });
//           });
//           object3DGroup.physicsObject3Ds.clear();
//           object3DGroups.delete(socket.id);
//         }
//         // Remove the client from the collection
//         //delete gameClients[socket.id];
//         gameClients.delete(socket.id);
//         // emit disconnected client to all clients
//         this._io.emit("clientDisconnected", socket.id);
//         // Remove the socket from the collection
//         this._sockets.delete(socket.id);
//         // Emit the updated list of connected clients to all clients
//         this.broadcastSocketIds();
//       });
//       socket.on("chat message", (msg: any) => {
//         console.log("message: " + msg);
//         this._io.emit("chat message", msg);
//       });
//       socket.on("send_temp_data", (data: any) => {
//         this._io.emit("recv_temp_data", data); // This will emit the event to all connected sockets
//         console.log("data", data);
//         console.log(data.userId);
//         console.log(data.value);
//       });
//       socket.on("shared_data", (data: any) => {
//         console.log("data", data);
//       });
//     });
//     return this;
//   }
//   private createPhysicsObject(socket: Socket) {
//     // Example of adding an object when a user connects
//     // const sphereBody = new CANNON.Body({
//     //   mass: 5,
//     //   shape: new CANNON.Sphere(1),
//     //   position: new CANNON.Vec3(0, 10, 0),
//     // });
//     // this._world.addBody(sphereBody);
//     const boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
//     const boxBody = new CANNON.Body({ mass: 1 });
//     boxBody.position.set(0, 10, 0);
//     boxBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 8);
//     boxBody.addShape(boxShape);
//     this._world.addBody(boxBody);
//     //physicsObjects.push({ id: socket.id, body: sphereBody }); // Use socket ID as an example identifier
//     // Store the association between the socket ID and the object
//     const newObject = {
//       id: this._objectIndex++,
//       sid: socket.id,
//       //body: sphereBody,
//       body: boxBody,
//       t: Date.now(),
//     };
//     // socket ID stands for the user's unique identifier
//     // physicsObjects are grouped by the user's socket ID in the object3DGroups map
//     if (object3DGroups.has(socket.id)) {
//       const physicsObjectGroup = object3DGroups.get(socket.id);
//       if (physicsObjectGroup) {
//         if (!physicsObjectGroup.physicsObject3Ds) {
//           physicsObjectGroup.physicsObject3Ds = new Map();
//         }
//         physicsObjectGroup.physicsObject3Ds.set(newObject.id, newObject);
//       }
//     } else {
//       const newPhysicsObjectGroup: Object3DGroup = {
//         id: socket.id,
//         physicsObject3Ds: new Map(),
//         // GeneralObject3Ds: null,
//       };
//       newPhysicsObjectGroup.physicsObject3Ds?.set(newObject.id, newObject);
//       object3DGroups.set(socket.id, newPhysicsObjectGroup);
//     }
//     /*
//     const existingObject = clientPhysicsObjects.get(socket.id);
//     if (existingObject) {
//       existingObject.id = socket.id;
//       // const updatedObject: PhysicsObject = {
//       //   ...existingObject, // Spread operator to copy existing properties
//       //   id: socket.id, // Update the id
//       //   // body remains unchanged
//       // };
//       //clientPhysicsObjects.set(socket.id, updatedObject);
//       clientPhysicsObjects.set(socket.id, existingObject);
//       // Or if you want to add the updated object as a new entry (and possibly delete the old one)
//       //clientPhysicsObjects.set(newId, updatedObject);
//       // Optionally remove the old entry if you're using a newId
//       //clientPhysicsObjects.delete(oldId);
//     }
//     */
//     // Optionally, emit the new object to all clients
//     // this._io.emit("objectCreated", {
//     //   id: socket.id,
//     //   idx: this._objectIndex++,
//     //   position: sphereBody.position,
//     // });
//     return newObject;
//   }
//   public initializePhysics() {
//     //this._world = new CANNON.World();
//     this._world.gravity.set(0, -9.82, 0); // Gravity setup
//     //this._world.gravity.set(0, -0.1, 0);
//     // Physics setup here. For example, creating a ground plane:
//     const groundBody = new CANNON.Body({
//       mass: 0, // mass == 0 makes the body static
//       shape: new CANNON.Plane(),
//     });
//     groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
//     this._world.addBody(groundBody);
//     // Setup an interval to update physics and emit changes
//     // setInterval(() => {
//     //   const currentTime = Date.now();
//     //   const deltaTime = (currentTime - this._lastTime) / 1000.0; // in seconds
//     //   this._world.step(1 / 60);
//     //   // Iterate over all physics objects and emit their updated positions
//     //   // physicsObjects.forEach((obj) => {
//     //   //   const { id, body } = obj;
//     //   //   this._io.emit("objectUpdated", { id, position: body.position });
//     //   // });
//     //   clientObjects.forEach((obj) => {
//     //     const { id, body } = obj;
//     //     this._io.emit("objectUpdated", { id, position: body.position });
//     //   });
//     // }, 1000 / 60);
//     // Start the physics update loop
//     //this.updatePhysicsSimple();
//     //this.updatePhysics(); // included in the startGameLoop method
//     this.startGameLoop(this.customUpdateFunction);
//     //this.updatePhysicsImmediate();
//   }
//   // This function initializes and starts the game loop. It accepts an update function of type UpdateFunction as a parameter. This update function is called once per tick before the physics simulation step with the appropriate deltaTime.
//   // Separation of Concerns: By passing the update logic as a parameter, the startGameLoop function becomes more versatile and decoupled from the specific game logic, making it reusable for different kinds of games or simulations.
//   private startGameLoop(update: UpdateFunction) {
//     // CPU Utilization: By controlling the update frequency, you can prevent the game loop from running too fast, which helps in managing CPU utilization effectively.
//     // This is especially important in multiplayer games, where the server must handle multiple clients and maintain a consistent game state across all of them.
//     // updatePhysics() { // X // uncaughtException: TypeError [ERR_INVALID_ARG_TYPE]: The "callback" argument must be of type function. Received undefined at setTimeout (node:timers:141:3)
//     const updatePhysics: UpdatePhysics = () => {
//       //const currentTime = Date.now();
//       // Performance.now(): This code uses performance.now() for time measurement, which provides a more precise timestamp than Date.now(). It's especially useful for high-resolution timing. Note that performance.now() is available in modern Node.js environments and browsers, but if you're using an older environment, you might need to stick with Date.now() or find a polyfill.
//       const currentTime = performance.now();
//       //const currentTime = (typeof performance === "undefined" ? Date : performance).now();
//       //const deltaTime = (currentTime - this._lastTime) / 1000.0; // Calculate delta time in seconds
//       const deltaTime = currentTime - this._lastTime; // Calculate delta time in milliseconds
//       // Accumulator: This variable accumulates the elapsed time that hasn't been consumed by the world.step() calls. By subtracting the TICK_RATE from the accumulator each time the world is stepped, it keeps track of the "leftover" time, which helps in maintaining an accurate update schedule over time.
//       this._accumulator += deltaTime;
//       // Update the world with fixed time step multiple times based on the accumulated time
//       while (this._accumulator >= TICK_RATE) {
//         //////////////////////////// GAME LOGIC
//         update(TICK_RATE / 1000); // Call the passed update function with fixed time step in seconds
//         ////////////////////////////
//         this._world.step(TICK_RATE / 1000); // Step the physics simulation with fixed time step in seconds
//         this._accumulator -= TICK_RATE;
//       }
//       // GAME LOGIC
//       // Emit updated positions to clients here (not shown for brevity)
//       // object3DGroups.forEach((group) => {
//       //   group.physicsObjects.forEach((obj) => {
//       //     const { id, body } = obj;
//       //     this._io.emit("objectUpdated", { id, position: body.position });
//       //   });
//       // });
//       // this._sockets.forEach((socket, id) => {
//       //   // Here, you would gather and send relevant physics state information
//       //   // For example, you could send the positions of all physics objects to the client
//       //   //console.log(`Emitting physics update to ${id}`); // id is the socket ID
//       // });
//       // Calculate the exact time to the next update to maintain a consistent tick rate
//       // Flexibility: You can easily adjust the tick rate by changing the tickRate variable. For example, to run the game at 30 frames per second, you can set the tickRate to 1000 / 30 = 33.3333ms.
//       // Time Correction: The time to the next update (timeToNextUpdate) is calculated using the accumulator, which corrects for any small discrepancies that occur from update to update. This helps in preventing delay accumulation.
//       const timeToNextUpdate = TICK_RATE - this._accumulator;
//       this._lastTime = currentTime;
//       //setTimeout(updatePhysics, TICK_RATE - ((typeof performance === "undefined" ? Date : performance).now() - currentTime));
//       setTimeout(updatePhysics, timeToNextUpdate);
//     };
//     updatePhysics(); // Start the update loop
//   }
//   // Define methods as arrow functions to lexically bind this context to the class instance. This ensures that this always refers to the class instance, regardless of how the method is called.
//   // private updatePhysicsSimple = () => {
//   updatePhysicsSimple() {
//     const currentTime = Date.now();
//     const deltaTime = (currentTime - this._lastTime) / 1000.0; // Calculate delta time in seconds
//     //console.log("this._world", this._world);
//     this._world.step(1 / 60, deltaTime, 3); // Step the physics simulation
//     // Emit updated positions to clients here (not shown for brevity)
//     object3DGroups.forEach((group) => {
//       group.physicsObject3Ds?.forEach((obj) => {
//         const { id, body } = obj;
//         this._io.emit("objectUpdated", { id, position: body.position });
//       });
//     });
//     this._lastTime = currentTime;
//     // Calculate the time to the next update to maintain a consistent tick rate
//     const timeToNextUpdate = TICK_RATE - (Date.now() - currentTime);
//     setTimeout(
//       this.updatePhysicsSimple,
//       timeToNextUpdate > 0 ? timeToNextUpdate : 0
//     ); // Ensure non-negative delay
//   }
//   // Instead of setInterval, you can implement a game loop that continuously updates the state of the world and emits changes to clients. This loop can use requestAnimationFrame on the client side for rendering updates. However, since requestAnimationFrame is not available in Node.js, you can simulate a game loop using setImmediate or process.nextTick for very tight loops, though it's crucial to manage the timing carefully to avoid overloading the CPU.
//   // This game loop continuously updates the physics simulation and calculates the deltaTime between updates, which is used to step the simulation. This method ensures that the simulation progresses at a consistent pace, regardless of how long each loop iteration takes.
//   private updatePhysicsImmediate = () => {
//     const currentTime = Date.now();
//     //const currentTime = performance.now();
//     const deltaTime = (currentTime - this._lastTime) / 1000.0; // Calculate delta time in seconds
//     //const deltaTime = currentTime - this._lastTime; // Calculate delta time in milliseconds
//     //this._frameDelta += deltaTime;
//     //console.log("frameDelta, deltaTime", this._frameDelta, deltaTime);
//     // while (this._frameDelta < MAX_FPS_INV) {
//     //   console.log("frameDelta, deltaTime", this._frameDelta, deltaTime);
//     //   this._frameDelta += deltaTime;
//     //   this._world.step(MAX_FPS_INV, deltaTime, 3);
//     // }
//     // while (this._frameDelta >= MAX_FPS_INV) {
//     //   this._world.step(MAX_FPS_INV, deltaTime, 3);
//     //   this._frameDelta -= MAX_FPS_INV;
//     // }
//     // step ( dt, [timeSinceLastCalled], [maxSubSteps=10] )
//     // Step the physics world forward in time.
//     // There are two modes. The simple mode is fixed timestepping without interpolation. In this case you only use the first argument.
//     // The second case uses interpolation. In that you also provide the time since the function was last used, as well as the maximum fixed timesteps to take.
//     // dt
//     // : The fixed time step size to use.
//     // : The time to step the simulation by. This can be used in fixed timestepping. If you are using interpolation, you can usually leave this out.
//     // timeSinceLastCalled
//     // : The time elapsed since the function was last called. If you don't want to use interpolation, just pass the same value as dt.
//     // maxSubSteps
//     // : Maximum number of fixed steps to take per function call. This is only for interpolation. If you don't want to use interpolation, just pass 0 or 1.
//     // physics frame rate, time step, max prediction iterations
//     this._world.step(MAX_FPS_INV, deltaTime, 3); // 1/60 = time step, 3 = max number of iterations
//     //this._world.step(MAX_FPS_INV, deltaTime / 1000.0, 3);
//     // Here, emit updated positions to clients
//     object3DGroups.forEach((group) => {
//       group.physicsObject3Ds?.forEach((obj) => {
//         const { id, body } = obj;
//         this._io.emit("objectUpdated", { id, position: body.position });
//       });
//     });
//     this._lastTime = currentTime;
//     setImmediate(this.updatePhysicsImmediate); // Schedule the next update;
//   };
//   // Function to broadcast the list of all connected socket IDs, excluding the sender
//   private broadcastSocketIds = (senderSocket?: Socket) => {
//     // Collect all socket IDs
//     const sockets = Array.from(this._io.sockets.sockets.keys()); // This gets all the socket IDs
//     if (senderSocket) {
//       // Broadcast the list of socket IDs to all connected clients except the sender
//       senderSocket.broadcast.emit("clientSocketList", sockets); // Sending to all clients except the sender
//     } else {
//       // Broadcast the list of socket IDs to all connected clients
//       this._io.emit("clientSocketList", sockets); // Sending to all clients, including the sender
//     }
//   };
//   // Define your custom update logic in a function that matches the UpdateFunction type
//   // This function will be called once per tick with the deltaTime as a parameter
//   // Custom Update Logic: The customUpdateFunction is an example of how you might define your game-specific update logic. This function is passed to startGameLoop and executed on each tick of the game loop.
//   // This approach allows you to cleanly separate the game loop mechanism from your game's specific update logic, making your codebase more modular and easier to manage.
//   private customUpdateFunction: UpdateFunction = (deltaTime) => {
//     // Your game's update logic here, e.g., update game entities
//     //console.log(`Updating game state with deltaTime: ${deltaTime}`);
//     // Updating game state with deltaTime: 0.016666666666666666
//     // GAME LOGIC
//     // Emit updated positions to clients here (not shown for brevity)
//     object3DGroups.forEach((group) => {
//       group.physicsObject3Ds?.forEach((obj) => {
//         const { id, body } = obj;
//         this._io.emit("objectUpdated", {
//           id,
//           position: body.position,
//           quaternion: body.quaternion,
//         });
//       });
//     });
//     this._sockets.forEach((socket, id) => {
//       // Here, you would gather and send relevant physics state information
//       // For example, you could send the positions of all physics objects to the client
//       //console.log(`Emitting physics update to ${id}`); // id is the socket ID
//     });
//   };
// }
// /////????????????????????????????????????????????????????????
// /////🐹 채팅의 서버 부분을 옮기고.... 히스토리 저장 안해도 댐! 디비는 디비디비딥 디비디비딥 디비디비딥
// /////🐹 indexeddb 디비에 저장할 건 생각좀 해보게
/**
 *
 *
 * const path = require('path');
const express = require('express');

const { createServer } = require('http'); //🐹
// https://socket.io/get-started/chat#integrating-socketio
const { Server } = require('socket.io'); //🐹
const sqlite3 = require('sqlite3'); //🐹
const { open } = require('sqlite'); //🐹

import { create } from 'sortablejs';
// const { createProxyMiddleware } = require('http-proxy-middleware');

import { nice } from './nice';
console.log(nice);

import niceRoutes from './nice'; // Adjust the path as necessary
//import { createServer } from 'http';//🐹

// https://medium.com/codex/running-next-js-on-azure-app-services-84f707af761d
// Your app will get the Azure port from the process.enc.PORT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Azure 로 서비스할 때 process.env.PORT 를 사용해야 한다.
const port = process.env.PORT || 3000;
const main = async () => {
  //🐹3000이거 아니예요..?? 맞아!
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
  });
  /** id: socket.id,
        text: input,
        time: time_,
        userDisplayName: displayName,
        room: room */
//   await db.exec(`
//   CREATE TABLE IF NOT EXISTS rooms (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT
// );
// `);
// await db.exec(`
// CREATE TABLE IF NOT EXISTS users (
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// username TEXT UNIQUE,
// userDisplayName TEXT
// );`);
// await db.exec(`
// CREATE TABLE IF NOT EXISTS messages (
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// room_id INTEGER,
// sender_id INTEGER,
// content TEXT,
// userDisplayName TEXT,
// sent_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// FOREIGN KEY(room_id) REFERENCES rooms(id),
// FOREIGN KEY(sender_id) REFERENCES users(id)
// );
// `);
// // create our 'messages' table (you can ignore the 'client_offset' column for now)
// const next = require('next');
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();
// app
//   .prepare()
//   .then(() => {
//     const server_ = express();
//     const httpServer = createServer(server_); //🐹
//     //새로운 Socket.IO 서버 생성
//     const io = new Server(httpServer, {
//       //🐹
//       //http || https 서버 객체
//       cors: {
//         //옵션 객체 cors : CORS(Cross-Origin Resource Sharing) 설정을 구성,
//         //클라이언트의 요청이 서버에 도달할 때의 동작을 제어
//         origin: '*', // 허용할 도메인 목록, *는 모든 도메인 허용
//         methods: ['GET', 'POST'] //허용할 HTTP 메서드
//         // origin: [
//         //   "*", // Allow all origins
//         //   "http://localhost:3000",
//         // ],
//       },
//       // https://socket.io/docs/v4/using-multiple-nodes
//       // https://socket.io/docs/v4/server-options/#path
//       path: '/comm/' //기본적으로 Socket.IO는 /socket.io/ 경로를 사용하지만, 여기서는 /comm/로 변경
//     });
//     io.on('connection', (socket: any) => {
//       let room: any;
//       let displayName: any;
//       socket.on('joinRoom', async (data: any) => {
//         // 기존 방에서 나오기
//         if (room) {
//           socket.leave(room);
//         }
//         // 새로운 채팅방 입장
//         room = data.room;
//         displayName = data.displayName;
//         console.log('room', room);
//         console.log('displayName', displayName);
//         socket.join(room);
//         console.log('joinRoom', room);
//         let result;
//         let userResult;
//         try {
//           console.log('data', data);
//           result = await db.run(`INSERT INTO rooms (name) VALUES (?)`, [room]);
//           userResult = await db.run(`INSERT INTO users (username, userDisplayName) VALUES (?,?)`, [
//             socket.id,
//             displayName
//           ]);
//           console.log('result', result);
//           console.log('userResult', userResult);
//         } catch (e) {
//           console.log(e, 'result');
//           // TODO: 실패 시 처리
//           return;
//         }
//         // 채팅방 테이블 생성
//       });
//       socket.on('chat_request', async (data: any) => {
//         console.log(data, 'chat_request');
//         let result;
//         //   const timestamp = Date.now(); // 현재 시간을 밀리초로 반환하여 타임스탬프로 사용
//         try {
//           //
//           const currentRoomId = await db.get(`SELECT id FROM rooms WHERE name = ?`, data.room);
//           console.log('currentRoomId', currentRoomId);
//           result = await db.run(`INSERT INTO messages (room_id, content, userDisplayName) VALUES ( ?, ?, ?)`, [
//             currentRoomId.id,
//             data.text,
//             data.displayName
//           ]);
//         } catch (e) {
//           console.log(e, 'result');
//           // TODO: 실패 시 처리
//           return;
//         }
//         // 메시지와 함께 오프셋을 포함하여 응답
//         io.emit('chat_response', data);
//       });
//     });
//     server_.set('views', path.join(__dirname, 'views'));
//     server_.set('view engine', 'ejs');
//     server_.get('/ejs', (req: any, res: any) => {
//       //res.send('Root routing');
//       // render the index template // ejs
//       res.render('index');
//     });
//     // Use the routes defined in nice.ts
//     server_.use(niceRoutes);
//     server_.all('*', (req: Request, res: Response) => {
//       return handle(req, res);
//     });
//     try {
//       httpServer.listen(port, () => {
//         console.log(`⚡️[server]: Ready on http://localhost:${port}`);
//       });
//     } catch (error) {
//       console.error(error);
//     }
//     // server_.listen(port, (err: any) => {
//     //   if (err) throw err;
//     //   console.log(`⚡️[server]: Ready on http://localhost:${port}`);
//     // });
//   })
//   .catch((ex: any) => {
//     console.error(ex.stack);
//     process.exit(1);
//   });
// };
// main();
//  */
