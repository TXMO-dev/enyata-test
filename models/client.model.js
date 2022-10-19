module.exports = (sequelize,Sequelize) => {
    const Client = sequelize.define("client",{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false  
        }
    });       

    return Client;
}