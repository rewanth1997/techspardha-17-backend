var DB = require('./../database/db').DB;

var studentUsers = DB.Model.extend({
  tableName: 'student',
  idAttribute: 'id'
});

var studentDetails = DB.Model.extend({
  tableName: 'studentDetails',
  idAttribute: 'id'
});

var events = DB.Model.extend({
  tableName: 'events',
  idAttribute: 'EventId'
});

var coordinatorUsers = DB.Model.extend({
  tableName: 'coordinatorUsers',
  idAttribute: 'id'
});

module.exports = {
   User: studentUsers,
   Details: studentDetails,
   Admin: coordinatorUsers,
   Event: events
};
