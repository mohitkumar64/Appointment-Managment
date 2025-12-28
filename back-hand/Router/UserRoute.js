const express = require('express')
const Router = express.Router();
const {UpdateUser , getQuery , postQuery} = require('../Controller/userController');
const auth = require('../middleware/auth')

Router.route('/updateUser').get((req ,res)=>{
res.send('hello')
});
Router.route('/updateUser').put(auth ,UpdateUser);
Router.route('/query').get( auth , getQuery).post(auth ,postQuery)

module.exports = Router