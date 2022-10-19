const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.client = require('./client.model')(sequelize,Sequelize);
db.reports = require('./report.model')(sequelize,Sequelize);
db.weather = require("./weather.model")(sequelize,Sequelize);


//ONE TO MANY RELATIONSHIP BETWEEN CLIENTS AND REPORTS
db.client.hasMany(db.reports,{as:"reports"})
db.reports.belongsTo(db.client,{
  foreignKey:"client_id",
  as:"client"
})
//END OF ONE TO MANY RELATIONSHIP BETWEEN CLIENTS AND REPORTS

//ONE TO MANY RELATIONSHIP BETWEEN WEATHER AND REPORTS
db.weather.hasMany(db.reports,{as:"reports_for_weather"});
db.reports.belongsTo(db.weather,{
  foreignKey:"weather_id",
  as:"weather_report"
})
//END OF ONE TO MANY RELATIONSHIP BETWEEN WEATHER AND REPORTS

  
module.exports = db;   