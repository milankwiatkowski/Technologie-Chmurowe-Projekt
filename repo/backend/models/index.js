const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postsdb', 'user', 'password', {
  host: 'db',
  dialect: 'postgres',
  logging: false
});


const Post = sequelize.define('Post', {
  poster: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tytul: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tresc: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});


module.exports = {
  sequelize,
  Post
};
