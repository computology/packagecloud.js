'use strict';

// mock for superagent
// original: https://gist.github.com/pherris/aa74aa9b8b1a55ea053b

let mockDelay;
let mockError;
let mockResponse = {
  status() { 
    return 200; 
  },
  ok() { 
    return true; 
  },
  body: { },
  get: jest.genMockFunction(),
  toError: jest.genMockFunction()
};

let Request = {
  post() {
    return this;
  },
  get() {
    return this;
  },
  send() {
    return this;
  },
  query() {
    return this;
  },
  field() {
    return this;
  },
  auth() {
    return this;
  },
  set() {
    return this;
  },
  accept() {
    return this;
  },
  timeout() {
    return this;
  },
  type() {
    return this;
  },
  delete() {
    return this;
  },
  attach() {
    return this;
  },
  then: jest.fn().mockImplementation(function(res, rej) {
    var error = rej ? rej : function(){};
    var self = this;
    var innerPromise = new Promise(function(innerResolve, innerReject) {
      self.end(function(err, r){
        if (err) innerReject(err);
        innerResolve(r);
      })
      
    });

    return innerPromise.then(res, error);
  }),
  end: jest.fn().mockImplementation(function(callback) {
    if (mockDelay) {
      this.delayTimer = setTimeout(callback, 0, mockError, mockResponse);

      return;
    }

    callback(mockError, mockResponse);
  }),

  //expose helper methods for tests to set
  __setMockDelay(boolValue) {
    mockDelay = boolValue;
  },
  __setMockResponse(mockRes) {
    mockResponse = mockRes;
  },
  __setMockResponseBody(body) {
    mockResponse.body = body;
  },
  __setMockError(mockErr) {
    mockError = mockErr;
  }
};

module.exports = Request;
