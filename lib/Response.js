function Response(status, data) {
  this.status = status;
  this.data = data;
  this.toString = function() {
    if(this.status.code >= 400) {
      return "{status: " + JSON.stringify(this.status) + "}";
    }
    else {
      return "{status: " + JSON.stringify(this.status) + ", data: " + JSON.stringify(this.data) + "}";
    }
  };
}

module.exports = Response;
