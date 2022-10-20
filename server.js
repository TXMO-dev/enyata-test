require('dotenv').config();  
const express = require("express");
var cookieParser = require('cookie-parser');
const cors = require("cors");
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const app = express();
// app.use(express.static(path.join(__dirname, 'client/build')));
const db = require("./models");
// if(process.env.NODE_ENV === "Development"){
//   const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
//   }
// } else {
  // let corsOptions
  // if(process.env.NODE_ENV !== 'Development'){
  //   corsOptions ={
  //     origin:'https://testapi.goldentintona.com', 
  //     credentials:true,            //access-control-allow-credentials:true
  //     optionSuccessStatus:200
  //   } 
  // }

  const whitelist = ['https://testapi.goldentintona.com', 'http://localhost:8080', 'http://localhost:8081']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require(`${process.env.NODE_ENV === 'Development' ? './swagger-dev.json':'./swagger-prod.json'}`);
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
// let express to use this
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss})); 


const block_trace = (req, res, next) => {  
  // NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
  const allowedMethods = [
    "OPTIONS",
    "HEAD",
    "CONNECT",
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
  ];

  if (!allowedMethods.includes(req.method)) {
    res.status(405).send(`${req.method} not allowed.`);
  }

  next();
};
      
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(morgan('combined'));
  app.use(block_trace);
  // parse requests of content-type - application/json
  app.use(express.json());
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  // if(process.env.NODE_ENV==='Development'){
  //   db.sequelize.sync({ force: true }).then(() => {
  //     console.log("Drop and re-sync db.");
  //   })
  //   // db.sequelize.sync()
  //     .catch((err) => {  
  //         console.log("Failed to sync db: " + err.message);
  //     }); 
  // } else {
    db.sequelize.sync().then(() => {
      console.log("Synced DB");
    })
    // db.sequelize.sync()
      .catch((err) => {  
          console.log("Failed to sync db: " + err.message);
      }); 
  // }
app.get("/", (req, res) => {
    res.json({ message: "Welcome to GTI application." });  
  });
  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  require("./routes/client.routes")(app);
  require("./routes/reports.routes")(app); 
  require("./routes/weather.routes")(app);  
  
  // Handle React routing, return all requests to React app
    // app.get('*', function(req, res) {
    //   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    // });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);    
  });

