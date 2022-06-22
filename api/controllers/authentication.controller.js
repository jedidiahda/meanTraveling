const util = require('util');
const jwt = require('jsonwebtoken');

const checkAuthorization = function(req,res, next){
  if(req.headers && req.headers.authorization){
    let token = req.headers.authorization.split(' ')[1];
    if(token){
      let jwtPromise = util.promisify(jwt.verify,{content: jwt});
      jwtPromise(token,process.env.JWT_SECRET)
      .then(response => next())
      .catch(err => _sendResponseBackToClient(res,process.env.STATUS_INTERNAL_ERROR,err.message));
  
    }else{
      _sendResponseBackToClient(res,process.env.STATUS_BAD_REQUEST,'Invalid headers');
    }
  }else{
    _sendResponseBackToClient(res,process.env.STATUS_UNAUTHORIZE,'No request headers');
  }
}

const _sendResponseBackToClient = function (res, status, message) {
  res.status(parseInt(status)).json(message);
};

module.exports = {
  checkAuthorization
};