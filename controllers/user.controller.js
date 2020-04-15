const User = require('../models/user.model');
const BaseController = require('./base.controller');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function UserController() {
  BaseController.call(this, {model: User});
}

UserController.prototype = Object.create(BaseController.prototype);

UserController.prototype.requiresLogin = function(req, res, next){
    var token = req.headers['x-access-token'] || req.headers['authorization'];
  
    if (token) {
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }
      jwt.verify(token, config.secretKey, {},(err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: `Token is invalid! \n Error:${err.message}`
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Auth token is not given'
      });
    }
  }

// UserController.prototype.requiresLogin = function (req, res, next) {
// 	const token = req.cookies.token
// 	if (!token) {
// 	  return res.json({ error: 'Authentication is required.' });
// 	}
// 	var payload;
// 	try {
// 	  payload = jwt.verify(token, config.secretKey)
// 	  req.id = payload.id;
// 	} catch (e) {
// 	  if (e instanceof jwt.JsonWebTokenError) {
// 		return res.status(401);
// 	  }
// 	  return res.status(400);
// 	}
//     next();
// };

// //check if the user is signed in
// UserController.prototype.isSignedIn = function (req, res, next) {
// 	// Obtain the session token from the requests cookies,
// 	// which come with every request
// 	const token = req.cookies.token
// 	console.log(token)
// 	// if the cookie is not set, return 'auth'
// 	if (!token) {
//       res.send({ screen: 'auth' }).end();
//       next();
// 	}
// 	var payload;
// 	try {
// 	  // Parse the JWT string and store the result in `payload`.
// 	  // Note that we are passing the key in this method as well. This method will throw an error
// 	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
// 	  // or if the signature does not match
// 	  payload = jwt.verify(token, jwtKey)
// 	} catch (e) {
// 	  if (e instanceof jwt.JsonWebTokenError) {
// 		// the JWT is unauthorized, return a 401 error
// 		return res.status(401).end()
// 	  }
// 	  // otherwise, return a bad request error
// 	  return res.status(400).end()
// 	}
  
// 	// Finally, token is ok, return the username given in the token
//     res.status(200).send({ screen: payload.username });
//     next();
// }

// UserController.prototype.signout = (req, res) => {
// 	res.clearCookie("token")
// 	return res.status('200').json({message: "signed out"})
// }

UserController.prototype.authenticate = function(req, res, next) {
    // if (!req.body.email || !req.body.password){
    if (!req.body.auth.email || !req.body.auth.password){
        return res.json({status:"error", message: "Username and Password are required."});
    }
	// const email = req.body.email;
    // const password  = req.body.password;
    // const username = req.body.auth.username;
    const email = req.body.auth.email;
	const password  = req.body.auth.password;
	//User.findOne({username: username}, (err, user) => {
	User.findOne({email: email}, (err, user) => {
        if (err) {
            return next(err);
        } else {
            if (user){
                //let password2 = bcrypt.hashSync(password, 10);
                if(bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign(
                        { id: user._id, username: user.username }, 
                        config.secretKey, 
                        {algorithm: 'HS256', expiresIn: config.jwtExpirySeconds }
                    );
                    // res.cookie('token', token, { maxAge: config.jwtExpirySeconds * 1000, httpOnly: true });
                    //res.status(200).send({ loged_user: user.username });
                    res.status(200).send({ screen: user.username, token:token });
                    req.user = user;
                    next()
                } else {
                    res.json({status:"error", message: "Invalid username/password."});
                }
            } else {
                return res.json({status:"error", message: "User Not Found."});
            }
		}
	});
};

module.exports = UserController;