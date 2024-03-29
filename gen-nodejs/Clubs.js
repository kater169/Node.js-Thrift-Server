//
// Autogenerated by Thrift Compiler (0.9.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift-0.9.0').Thrift;

var ttypes = require('./service_types');
//HELPER FUNCTIONS AND STRUCTURES

Clubs_getNear_args = function(args) {
  this.lon = null;
  this.lat = null;
  this.range = null;
  if (args) {
    if (args.lon !== undefined) {
      this.lon = args.lon;
    }
    if (args.lat !== undefined) {
      this.lat = args.lat;
    }
    if (args.range !== undefined) {
      this.range = args.range;
    }
  }
};
Clubs_getNear_args.prototype = {};
Clubs_getNear_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.DOUBLE) {
        this.lon = input.readDouble();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.DOUBLE) {
        this.lat = input.readDouble();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.range = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Clubs_getNear_args.prototype.write = function(output) {
  output.writeStructBegin('Clubs_getNear_args');
  if (this.lon !== null && this.lon !== undefined) {
    output.writeFieldBegin('lon', Thrift.Type.DOUBLE, 1);
    output.writeDouble(this.lon);
    output.writeFieldEnd();
  }
  if (this.lat !== null && this.lat !== undefined) {
    output.writeFieldBegin('lat', Thrift.Type.DOUBLE, 2);
    output.writeDouble(this.lat);
    output.writeFieldEnd();
  }
  if (this.range !== null && this.range !== undefined) {
    output.writeFieldBegin('range', Thrift.Type.I32, 3);
    output.writeI32(this.range);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Clubs_getNear_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
Clubs_getNear_result.prototype = {};
Clubs_getNear_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.DOUBLE) {
        this.success = input.readDouble();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Clubs_getNear_result.prototype.write = function(output) {
  output.writeStructBegin('Clubs_getNear_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.DOUBLE, 0);
    output.writeDouble(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClubsClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this.seqid = 0;
    this._reqs = {};
};
ClubsClient.prototype = {};
ClubsClient.prototype.getNear = function(lon, lat, range, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_getNear(lon, lat, range);
};

ClubsClient.prototype.send_getNear = function(lon, lat, range) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getNear', Thrift.MessageType.CALL, this.seqid);
  var args = new Clubs_getNear_args();
  args.lon = lon;
  args.lat = lat;
  args.range = range;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

ClubsClient.prototype.recv_getNear = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new Clubs_getNear_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getNear failed: unknown result');
};
ClubsProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
ClubsProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.Exception, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

ClubsProcessor.prototype.process_getNear = function(seqid, input, output) {
  var args = new Clubs_getNear_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.getNear(args.lon, args.lat, args.range, function (err, result) {
    var result = new Clubs_getNear_result((err != null ? err : {success: result}));
    output.writeMessageBegin("getNear", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

