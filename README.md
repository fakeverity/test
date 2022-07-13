# Simple WebSocket communication test task
## Prerequisite
  - Postgresql
  - Node.js

## How to run
```
$ > ./dbinit.sh
$ > npm i
$ > npx nodemon
```

## Endpoints
- http://127.0.0.1:3000/api/userlist - [GET]  -> get user list from the database
- http://127.0.0.1:3000/api/auth     - [POST] -> request auth token. Send user credentials in format:
  ```JSON
  {
    "name": "User1",
    "password": "pwd1"
  }
  ```
  Result will be an authentication token:
  ```JSON
  {
    "token": "..."
  }
  ```
  
- ws://127.0.0.1:3000/api/ws - WebSocket endpoint
  - To authenticate connection send:
    ```JSON
    { "name": "User1", "message": "auth <token>" }
    ```
  - To obtain message history send:
    ```JSON
    { "message": "history 10" }
    ```
    where '10' is the number of the recent messages wanted
  - To send the message to all clients send:
    ```JSON
    { "message" : "message1" }
    ```
