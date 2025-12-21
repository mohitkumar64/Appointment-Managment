const express = require('express')
const Router = express.Router();
const {UpdateUser} = require('../Controller/userController');
const auth = require('../middleware/auth')

Router.route('/updateUser').get((req ,res)=>{
res.send('hello')
});
Router.route('/updateUser').put(auth ,UpdateUser);

module.exports = Router