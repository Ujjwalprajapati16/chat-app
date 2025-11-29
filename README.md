# Real-Time Chat Application

## Overview

This project is a real-time chat application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack and Socket.io. It allows users to engage in real-time messaging with random active users. The application focuses on providing a seamless and responsive user experience with robust features for authentication and message handling.

### System Architecture Diagram

```mermaid
graph TD
    subgraph Client_Side ["Frontend (React + Vite)"]
        UI[User Interface]
        Zustand[Zustand Store]
        SocketClient[Socket.io Client]
        AuthContext[Auth Context]
    end

    subgraph Server_Side ["Backend (Node.js + Express)"]
        API[REST API Routes]
        SocketServer[Socket.io Server]
        AuthMiddleware[ProtectRoute Middleware]
        Controllers[Controllers]
    end

    subgraph Database ["Database"]
        MongoDB[(MongoDB)]
    end

    UI -->|Interacts| Zustand
    UI -->|Reads| AuthContext
    Zustand -->|State Updates| UI
    
    Zustand -->|HTTP Requests| API
    SocketClient <-->|WebSocket Events| SocketServer
    
    API --> AuthMiddleware
    AuthMiddleware --> Controllers
    Controllers -->|Mongoose Queries| MongoDB
    
    SocketServer -->|Emit Events| SocketClient
```
---

## Features

- **Real-Time Messaging:** Users can send and receive messages instantly.
- **User Authentication:** Secure user registration and login.
- **Dynamic Conversations:** Engage in multiple conversations simultaneously.
- **Responsive Design:** Optimized for various screen sizes and devices.
- **Scalable Backend:** Handles concurrent users efficiently.

### Sequence Diagram: Sending a Message

```mermaid
sequenceDiagram
    actor Sender
    participant ClientA as Client (Sender)
    participant Server as Express API
    participant DB as MongoDB
    participant Socket as Socket.io Server
    participant ClientB as Client (Receiver)
    actor Receiver

    Note over Sender, ClientA: User types message and clicks send
    Sender->>ClientA: Submit Message
    
    ClientA->>Server: POST /api/messages/send/:id
    activate Server
    
    Server->>DB: Find or Create Conversation
    Server->>DB: Save New Message
    Server->>DB: Update Conversation (push message ID)
    
    par Parallel Actions
        Server-->>ClientA: Return New Message JSON
        
        Server->>Socket: Identify Receiver Socket ID
        Socket->>ClientB: emit("newMessage", message)
    end
    deactivate Server

    ClientA->>Sender: Update UI (Append Message)
    ClientB->>Receiver: Play Notification Sound
    ClientB->>Receiver: Update UI (Shake & Append)
```
---

## Technology Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-Time Communication:** Socket.io
- **Authentication:** JSON Web Tokens (JWT)
---

## Database Schema

```mermaid
erDiagram
    User ||--o{ Conversation : "participants (Array)"
    User ||--o{ Message : "sends/receives"
    Conversation ||--|{ Message : "contains (Array)"

    User {
        ObjectId _id PK
        String fullName
        String username
        String password
        String gender
        String profilePic
        Date createdAt
        Date updatedAt
    }

    Conversation {
        ObjectId _id PK
        ObjectId[] participants FK "Ref: User"
        ObjectId[] messages FK "Ref: Message"
        Date createdAt
        Date updatedAt
    }

    Message {
        ObjectId _id PK
        ObjectId senderId FK "Ref: User"
        ObjectId receiverId FK "Ref: User"
        String message
        Date createdAt
        Date updatedAt
    }
```
---
## Application Flow

```mermaid
flowchart TD
    Start((Start)) --> AuthCheck{Has Valid JWT?}
    
    AuthCheck -- No --> Login[Login / Signup Page]
    Login -->|POST /api/auth| ServerAuth[Authenticate User]
    ServerAuth -->|Success| GenerateToken[Generate JWT & Set Cookie]
    GenerateToken --> Home[Home Page]
    
    AuthCheck -- Yes --> Home
    
    subgraph Dashboard [Home Dashboard]
        Home --> FetchUsers[Fetch Sidebar Users]
        Home --> ConnectSocket[Connect Socket.io]
        
        FetchUsers --> SelectUser[Select Conversation]
        SelectUser --> FetchMsgs[Fetch Message History]
        FetchMsgs --> ChatActive[Chat Window Active]
        
        ChatActive --> SendMsg[Send Message]
        ChatActive --> ReceiveMsg[Listen for Incoming]
    end
    
    SendMsg -->|Update UI| ChatActive
    ReceiveMsg -->|Notification Sound| ChatActive
```
---
## Live Demo
[click Here](https://chat-app-pooy.onrender.com)

## Installation
Clone the repository:

```bash
git clone https://github.com/Ujjwalprajapati16/chat-app.git
cd repo-name
```

Install dependencies:

For backend:
```bash
cd backend
npm install
```
For frontend:
```bash
cd frontend
npm install
```
Environment Variables:

Create a .env file in the backend directory and add the following:
```bash
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
Running the Application
Start the backend server:

```bash
cd backend
npm start
```
Start the frontend application:

```bash
cd frontend
npm start
```

Open your browser and navigate to:

```plaintext
http://localhost:3000
Usage
Sign Up: Register a new user account.
Log In: Authenticate with existing user credentials.
Start Chatting: Begin a conversation with active users.
Real-Time Updates: Experience real-time messaging with instant updates.
Contributing
```
##Fork the repository.
Create a new branch:
```bash
git checkout -b feature-branch
```
Make your changes and commit them:
```bash
git commit -m 'Add some feature'
```
Push to the branch:
```bash
git push origin feature-branch
```
Create a pull request.
License
This project is licensed under the MIT License.

##Contact
Email : ujjwalprajapati154@gmail.com
For any inquiries or issues, please contact [yourname@example.com].

