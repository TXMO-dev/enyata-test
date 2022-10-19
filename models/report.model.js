module.exports = (sequelize,Sequelize) => {
    const Reports = sequelize.define("report",{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        client_id: {
            type: Sequelize.INTEGER,
            allowNull:false
        },
        incident_desc:{
            type:Sequelize.TEXT,
            allowNull:false
        },
        city:{
            type:Sequelize.STRING,
            allowNull:false
        },
        country:{
            type:Sequelize.STRING,  
            allowNull:false
        },
        weather_id:{
            type:Sequelize.INTEGER     
        }  
    });         

    return Reports; 
}