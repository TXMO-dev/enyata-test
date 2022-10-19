module.exports = (sequelize,Sequelize) => {
    const Weather = sequelize.define("weather",{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },     
        type:{
            type:Sequelize.STRING,
            allowNull:false
        },
        days:{
            type:Sequelize.STRING,
            allowNull:false
        }
    })
    return Weather;
}  