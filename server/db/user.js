const Sequelize = require('sequelize');
const db = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();
const axios = require('axios');

const User = db.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  }
})

User.prototype.correctPassword = function(candidatePwd) {
  console.log("THIS.PASSWORD: ", this.password);
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function(){
  return jwt.sign({id: this.id}, process.env.TOKEN_KEY);
}

User.authenticate = async function({username, password}){
  const user = await this.findOne({where: { username }})
  console.log("USER: ", user);
  console.log("PASS BOOL: ", await user.correctPassword(password));
  if(!user || !(await user.correctPassword(password))){
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
}

User.findByToken = async function(token){
  try{
    const {id} = await jwt.verify(token, process.env.TOKEN_KEY)
    const user = User.findByPk(id);
    if(!user){
      throw 'User not found'
    }
    return user;
  } catch (err) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
}

const hashPassword = async(user) => {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 10);
  }
}

module.exports = User;
