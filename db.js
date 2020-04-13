require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('helpMeDecide', 'postgres', process.env.DBPW, {
    dialect: 'postgres',
    logging: false //remove for verbose logging in console
});
//console.log(process.env.DBPW)
sequelize.authenticate().then(
    function() {
        console.log('Database Connection Established');
    },
    function(err){
        console.log('No Database Connection', err);
    }
)
module.exports = sequelize; 