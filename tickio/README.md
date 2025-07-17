# ⭕❌ Tickio

A fullstack TypeScript application for playing Tic Tac Toe online

Users can connect to the server with REST api as well as a Socket connection for instant game updates

## Game modes
- 3x3 board
- 4x4 board
- 5x5 board

## Current features
- REST api (mainly for user related actions)
- Ability to register a new user and sign in if user exists
- Periodic user data saving (just saves to /data/users.json file so it runs/checks every 30s)
- Socket connection (mainly for game related actions)
- Sending currently active users to Socket connections
- Game Room Manager 
- Creating new game rooms
- Joining game rooms with ID (think of Kahoot games)
- Game logic (coded but not implemented yet - /logic/game/Game.ts)
- Dynamic calculation of possible winning combinations for each game type (/functions/calculateBoardData.ts)
- Periodic game room removal (removes game rooms with no players every 30s)
