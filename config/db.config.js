// if(process.env.NODE_ENV === 'Development'){
  module.exports = {
    HOST: "db",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "testdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,   
      acquire: 30000,
      idle: 10000     
    }
  } 
// } else {  
//   module.exports = {  
//     HOST: process.env.AWS_DB_HOSTNAME,
//     USER: process.env.AWS_DB_USERNAME,
//     PORT:5432, 
//     PASSWORD: process.env.AWS_DB_PASSWORD,
//     DB:process.env.AWS_DB,
//     dialect: "postgres",
//     pool: {
//       max: 30,
//       min: 20,
//       idle: 30000,
//       evict: 25000,
//       acquire: 50000    
//     }  
//   }  
// }