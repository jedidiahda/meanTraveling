const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Travelings = mongoose.model(process.env.TRAVELING_MODEL);

const _sendResponseBackToClient = function (res, status, message) {
  res.status(parseInt(status)).json(message);
};

const createOne = function (req, res) {
  const { travelingId } = req.params;

  if (mongoose.isValidObjectId(travelingId)) {
    Travelings.findById(travelingId)
      .exec()
      .then((traveling) => _performCreateOne(req,res, traveling))
      .catch((err) =>
        _sendResponseBackToClient(
          res,
          process.env.STATUS_INTERNAL_ERROR,
          err.message
        )
      );
  } else {
    _sendResponseBackToClient(
      res,
      process.env.STATUS_BAD_REQUEST,
      'Invalid traveling id'
    );
  }
};

const _performCreateOne = function (req,res, traveling) {
  if (!traveling.transportations) {
    traveling.transportations = [];
  }

  const { type, duration } = req.body;
  traveling.transportations.push({
    type,
    duration,
  });

  traveling
    .save()
    .then((traveling) =>
      _sendResponseBackToClient(res, process.env.STATUS_SUCCESS, traveling)
    )
    .catch((err) =>
      _sendResponseBackToClient(
        res,
        process.env.STATUS_INTERNAL_ERROR,
        err.message
      )
    );
};

const updateOne = function (req, res) {
  const { travelingId, transportationId } = req.params;

  if (
    mongoose.isValidObjectId(travelingId) &&
    mongoose.isValidObjectId(transportationId)
  ) {
    Travelings.findById(travelingId)
      .exec()
      .then((traveling) => _updateTransporation(req, res, traveling))
      .catch((err) =>
        _sendResponseBackToClient(
          res,
          process.env.STATUS_INTERNAL_ERROR,
          err.message
        )
      );
  } else {
    _sendResponseBackToClient(
      res,
      process.env.STATUS_BAD_REQUEST,
      'Invalid traveling id or transportation Id'
    );
  }
};

const _updateTransporation = function (req, res, traveling) {
  let tranIndex = traveling.transportations.findIndex(
    (s) => s._id == req.params.transportationId
  );
  if (tranIndex < 0) {
    _sendResponseBackToClient(
      res,
      process.env.STATUS_NOT_FOUND,
      'Transportation ID not found'
    );
  } else {
    let transportation = traveling.transportations[tranIndex];
    const { type, duration } = req.body;

    transportation.type = type;
    transportation.duration = duration;

    traveling
      .save()
      .then((traveling) =>
        _sendResponseBackToClient(res, process.env.STATUS_SUCCESS, traveling)
      )
      .catch((err) =>
        _sendResponseBackToClient(
          res,
          process.env.STATUS_INTERNAL_ERROR,
          err.message
        )
      );
  }
};

const deleteOne = function (req, res) {
  const { travelingId, transportationId } = req.params;

  if (
    mongoose.isValidObjectId(travelingId) &&
    mongoose.isValidObjectId(transportationId)
  ) {
    Travelings.findById({
      _id: ObjectId(req.params.travelingId),
    })
      .exec()
      .then((traveling) => _deleteTransportation(req, res, traveling))
      .catch((err) =>
        _sendResponseBackToClient(
          res,
          process.env.STATUS_INTERNAL_ERROR,
          err.message
        )
      );
  } else {
    _sendResponseBackToClient(
      res,
      process.env.STATUS_BAD_REQUEST,
      'Invalid traveling id or transportation Id'
    );
  }
};

const _deleteTransportation = function (req, res, traveling) {
  let tranIndex = traveling.transportations.findIndex(
    (s) => s._id == req.params.transportationId
  );
  if (tranIndex < 0) {
    _sendResponseBackToClient(
      res,
      process.env.STATUS_NOT_FOUND,
      'Transportation ID not found'
    );
  } else {
    traveling.transportations.splice(tranIndex, 1);
    traveling
      .save()
      .then((traveling) =>
        _sendResponseBackToClient(res, process.env.STATUS_SUCCESS, traveling)
      )
      .catch((err) =>
        _sendResponseBackToClient(
          res,
          process.env.STATUS_INTERNAL_ERROR,
          err.message
        )
      );
  }
};

const getAll = function (req, res) {
  let offset = parseInt(process.env.DEFAULT_OFFSET);
  let count = parseInt(process.env.DEFAULT_COUNT);
  let maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT);

  const { travelingId } = req.params;

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

  if (mongoose.isValidObjectId(travelingId)) {
    Travelings.find({
      _id:mongoose.Types.ObjectId(travelingId)
    },{
      transportations:{
        $slice:[offset,count]
      }
    })
      .exec()
      .then((traveling) => _performGetAllResponse(res,traveling) )
      .catch((err) =>
        _sendResponseBackToClient(
          res,
          process.env.STATUS_INTERNAL_ERROR,
          err.message
        )
      );
  } else {
    _sendResponseBackToClient(
      res,
      process.env.STATUS_BAD_REQUEST,
      'Invalid Traveling id'
    );
  }
};

const _performGetAllResponse = function(res,traveling){
  if(traveling[0]){
    _sendResponseBackToClient(res,process.env.STATUS_SUCCESS,traveling[0].transportations);
  }else{
    _sendResponseBackToClient(
      res,
      process.env.STATUS_NOT_FOUND,
      'Traveling id not found'
    );
  }
}

const getOne = function (req, res) {
  const { travelingId } = req.params;

  if(mongoose.isValidObjectId(travelingId)){
    Travelings.findById(travelingId).exec()
    .then(traveling => _getTransportation(req,res,traveling))
    .catch(err => _sendResponseBackToClient(res,process.env.STATUS_INTERNAL_ERROR,err.message));
  
  }else{
    _sendResponseBackToClient(res,process.env.STATUS_BAD_REQUEST,'Invalid traveling id');
  }
 };

const _getTransportation = function(req,res, traveling){
  let tranIndex = traveling.transportations.findIndex((s) => s._id == req.params.transportationId);
  if (tranIndex < 0) {
    _sendResponseBackToClient(
      res,
      process.env.STATUS_NOT_FOUND,
      'Transportation id not found'
    );
  } else {
    _sendResponseBackToClient(
      res,
      process.env.STATUS_SUCCESS,
      traveling.transportations[tranIndex]
    );
  }
}

const getTotalDocs = function(req,res){
  const { travelingId } = req.params;
  if(mongoose.isValidObjectId(travelingId)){
    Travelings
    .findById(travelingId)
    .exec()
    .then(travelings => _sendResponseBackToClient(res,process.env.STATUS_SUCCESS,travelings.transportations.length))
    .catch(err => _sendResponseBackToClient(res,process.env.STATUS_INTERNAL_ERROR,err.message));
  
  }else{
    _sendResponseBackToClient(res,process.env.STATUS_BAD_REQUEST,'Invalid traveling id');
  }
 }


module.exports = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
  getTotalDocs
};
