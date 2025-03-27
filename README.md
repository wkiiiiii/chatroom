# Simple Chat Room

A simple real-time chat application where users can enter by typing their name. This application uses Express.js for the server, Socket.IO for real-time communication, and vanilla JavaScript for the frontend.

## Features

- Single global chat room
- Users can join by entering their name
- Real-time messaging
- Display of online users
- System notifications when users join/leave

## Setup and Installation

1. Clone the repository or download the files

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

   For development with auto-reload:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## How to Use

1. Enter your name in the input field and click "Join Chat" or press Enter
2. Start chatting with everyone in the room
3. The list of current online users is displayed on the right side
4. System notifications will appear when users join or leave the chat

## Deployment to Render

### Option 1: Deploy via GitHub

1. Fork or push this repository to your GitHub account
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Sign up or log in to your Render account
4. Click on "New+" and select "Web Service"
5. Connect your GitHub account and select this repository
6. Configure as follows:
   - Name: simple-chatroom (or your preferred name)
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free
7. Click "Create Web Service"
8. Wait for the deployment to complete

### Option 2: Deploy with Blueprint

1. Fork or push this repository to your GitHub account
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Sign up or log in to your Render account
4. Click on "New+" and select "Blueprint"
5. Connect your GitHub account and select this repository
6. Render will automatically deploy the application based on the render.yaml configuration
7. Wait for the deployment to complete

After deployment is successful, your application will be available at the URL provided by Render.

## Technologies Used

- Node.js and Express.js
- Socket.IO
- HTML5, CSS3, and JavaScript (ES6+)

## License

MIT 