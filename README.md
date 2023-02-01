# MEVN fullstack app frontend
This is the frontend for the MEVN stack app.
## Description
A vue web app with a todo list and a show section with products from fakestoreapi.com...
Built using vite with vue3 as the front and express, node, mongodb as the backend.
App is also ready for deployment.


## Config
As seen in the config.js file `mongoUri: process.env.MONGO_URI,`, the database uri is access through the environment variables so in order to set it up 
use the cmd `export MONGO_URI=<your_uri>` replacing your_uri with yours...

## Running the frontend
Run command: `npm i && npm run dev`