exports.handler = function(event, context, callback) {
  let retval;
  console.log("hit handler");

  const send = body => {
    const token = body;
    console.log("BODY", body);
    console.log(token);
    getReceiptInfo(token).then(response => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: response
      });
    });
  };
  const getReceiptInfo = token => {
    return new Promise(function(resolve, reject) {
      console.log("Inside getResult");
      const request = require("request");
      const url =
        "https://api.tabscanner.com/NbXvvebY6P6sbfWX0ZcsbLm7tAqde9CGZAZ84JKa6FyqCs9EJpUScTGzfcOetvlw/result/5rmU1PWqTNdkzopb";
      console.log(url);
      request(url, function(error, response, body) {
        retval = body;
        resolve(body);
        console.log("Resolved 1. ", body);
      });
    });
  };
  send(event.body);
};
