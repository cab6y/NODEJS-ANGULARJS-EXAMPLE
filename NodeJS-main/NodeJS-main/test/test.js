const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('nodejstest', 'root', 'Xap1203*', {
  host: 'localhost',
  dialect: 'mysql', // PostgreSQL için 'postgres', MSSQL için 'mssql'
});

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER }
});

sequelize.sync().then(() => {
  console.log("Tablolar oluşturuldu!");
});
