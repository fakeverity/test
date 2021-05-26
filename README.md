## Prerequisite
  - Postgresql
  - Node.js

## How to run
```
$> ./dbinit.sh
$> npm i
$> npx nodemon
```

## Endpoints
- http://127.0.0.1:3000/api/userlist - get users list from database
- ws://127.0.0.1:3000/api/ws - test WS connection (response: { "connection": "ok" })
