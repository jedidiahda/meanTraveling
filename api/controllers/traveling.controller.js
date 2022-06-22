const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Travelings = mongoose.model(process.env.TRAVELING_MODEL);

const createOne = function (req, res) {
  const { destination, length, stayAt } = req.body;

  Travelings.create(
    {
      destination,
      length,
      stayAt
    }).then(traveling => _sendResponseBackToClient(res,process.env.STATUS_CREATED_SUCCESS,traveling))
    .catch(err => _sendResponseBackToClient(res,process.env.STATUS_INTERNAL_ERROR,err.message));
};

const updateOne = function (req, res) {
  const { travelingId } = req.params;

  if (mongoose.isValidObjectId(travelingId)) {
    Travelings.findById(travelingId).exec((err,traveling) => _performUpdateOne(req,res,traveling));
  } else {
    _sendResponseBackToClient(req,process.env.STATUS_BAD_REQUEST,'Invalid traveling id')
  }
};

const _performUpdateOne = function(req,res,traveling){
  const { destination, length,stayAt } = req.body;
  traveling.destination = destination;
  traveling.length = length;
  traveling.stayAt = stayAt;
  traveling.save().then(traveling => _sendResponseBackToClient(res,process.env.STATUS_SUCCESS,traveling))
  .catch(err => _sendResponseBackToClient(res,process.env.STATUS_INTERNAL_ERROR,err.message));

}

const partialUpdateOne  = function(req,res){
  const { travelingId } = req.params;

  if (mongoose.isValidObjectId(travelingId)) {
    Travelings.findById(travelingId).exec().then(traveling => _performPartialUpdate(req,res,traveling))
    .catch(err => _sendResponseBackToClient(res,process.env.STATUS_INTERNAL_ERROR,err.message));
  }
  else{
    _sendResponseBackToClient(res,process.env.STATUS_BAD_REQUREST,'Invalid traveling id');
  }
}

const _performPartialUpdate = function(req,res,traveling){
  const { destination, length,stayAt } = req.body;
  if(destination){
    traveling.destination = destination;
  }

  if(length){
    traveling.length = length;
  }

  if(stayAt){
    traveling.stayAt = stayAt;
  }

  traveling.save().then(traveling => _sendResponseBackToClient(res,process.env.STATUS_SUCCESS,traveling))
  .catch(err => _sendResponseBackToClient(res,process.env.STATUS_INTERNAL_ERROR,err.message));
  
}


const deleteOne = function (req, res) {
  const { travelingId } = req.params;
  if (mongoose.isValidObjectId(travelingId)) {
    Travelings.deleteOne(
      {
        _id: ObjectId(travelingId),
      }).then(traveling => _sendResponseBackToClient(res,process.env.STATUS_SUCCESS,traveling))
      .catch(err => _sendResponseBackToClient(res,process.env.STATUS_INTERNAL_ERROR,err.message));
  } else {
    _sendResponseBackToClient(res,process.env.STATUS_BAD_REQUREST,'Invalid traveling id');
  }
};

const getOne = function (req, res) {
  const { travelingId } = req.params;

  if (mongoose.isValidObjectId(travelingId)) {
    Travelings.findById(travelingId).exec().then(traveling=>_sendResponseBackToClient(res,process.env.STATUS_SUCCESS,traveling))
    .catch(err => _sendResponseBackToClient(res,process.env.STATUS_INTERNAL_ERROR,err.message));
  } else {
    _sendResponseBackToClient(res,process.env.STATUS_BAD_REQUREST,'Invalid traveling id');
  }
};

const getAll = function (req, res) {
  let offset = parseInt(process.env.DEFAULT_OFFSET);
  let count = parseInt(process.env.DEFAULT_COUNT);
  let maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT);
  let query = {};

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, process.env.DEFAUTL_PARSE_BASED);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, process.env.DEFAUTL_PARSE_BASED);
  }

  if (isNaN(offset) || isNaN(count)) {
    _sendResponseBackToClient(res,process.env.STATUS_BAD_REQUREST,'QueryString Offset and Count should be numbers')
    return;
  }

  if (count > maxCount) {
    _sendResponseBackToClient(res,process.env.STATUS_BAD_REQUEST,'Cannot exceed count of ' + maxCount)
    return;
  }
  
  if(req.query && req.query.destination){
    query = _getSearchQuery(req);
  }

  Travelings.find(query)
    .skip(offset)
    .limit(count)
    .exec()
    .then(travelings => _sendResponseBackToClient(res,process.env.STATUS_SUCCESS,travelings))
    .catch(err => _sendResponseBackToClient(res,process.env.STATUS_INTERNAL_ERROR,err.message));

};

const _getSearchQuery = function(req){
  let query = {
    destination:{
      $regex: '.*'+req.query.destination+'.*',
      $options: 'i'
    }
  }

  return query;
}

const getTotalDocs = function(req,res){
  let query = {};
  if(req.query && req.query.destination){
    query = _getSearchQuery(req);
  }

  Travelings.findOne(query).countDocuments().exec().then(totalDocs => _sendResponseBackToClient(res,process.env.STATUS_SUCCESS,totalDocs))
  .catch(err => _sendResponseBackToClient(res,process.env.STATUS_INTERNAL_ERROR,err.message));
}

const _sendResponseBackToClient  = function(res,status,message){
  res.status(parseInt(status)).json(message);
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  partialUpdateOne,
  deleteOne,
  getTotalDocs
};
