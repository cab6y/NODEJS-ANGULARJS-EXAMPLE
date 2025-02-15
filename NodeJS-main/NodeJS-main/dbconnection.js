const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('testnodejs', 'postgres', 'Xap1203*', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

const Tenants = sequelize.define('Tenants', {
  username: { type: DataTypes.STRING, allowNull: false },
});


const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  email:{ type: DataTypes.STRING, allowNull: false },
  password:{ type: DataTypes.STRING, allowNull: false },
  request: { type: DataTypes.JSONB, allowNull: true } 
});

const Product = sequelize.define('Product', {
  ProductName: { type: DataTypes.STRING, allowNull: false },
  StockQuantity:{ type: DataTypes.INTEGER, allowNull: false },
  Price:{ type: DataTypes.DECIMAL, allowNull: false },
  request: { type: DataTypes.JSONB, allowNull: true },
  Image: { type: DataTypes.JSONB, allowNull: true },
});


sequelize.sync()
  .then(() => console.log("Tablolar senkronize edildi!"))
  .catch(err => console.error("Veritabanı hatası:", err));

module.exports = { sequelize, User, Product };
