function Response(status, data) {
  this.status = status;
  this.data = data || "";
  this.toString = function() {
    return "{status: " + JSON.stringify(this.status) + ", data: " + JSON.stringify(this.data) + "}";
  };


}

module.exports = Response;
