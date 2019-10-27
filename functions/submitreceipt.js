const axios = require("axios");
var fs = require("fs");
var request = require("request");

// eslint-disable-next-line no-unused-vars
exports.handler = function (event, context, callback) {
  let retval;
  console.log("hit handler");

  const send = body => {
    var base64Data = body.split(",")[1];
    // const fileName = `img${Math.floor(Math.random() * 100000000) +
    //   1}.png`;
    console.log(base64Data.length);

    //require("fs").writeFile(fileName, base64Data, "base64", function (err) {
      processImage(base64Data).then(response => {
        console.log("Promise 3. ", response);
        callback(null, {
          statusCode: 200,

          body: response
        });
      }).catch(error => {
        console.log(error);
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({
            message: error
          })
        })
      });
    //});
  };

  const processImage = fileName => {
    console.log("hit processImage()");
    //console.log(fileName);

    // request('http://www.google.com', function (error, response, body) {
    //     console.log('error:', error); // Print the error if one occurred
    //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     console.log('body:', body); // Print the HTML for the Google homepage.
    // });

    //var image = fs.createReadStream("./images/Receipt.jpg");
    var image = Buffer.alloc(fileName.length, fileName, 'base64');//Buffer.from(fileName, 'base64');
    var options = {
      method: "POST",
      url:
        "https://api.tabscanner.com/NbXvvebY6P6sbfWX0ZcsbLm7tAqde9CGZAZ84JKa6FyqCs9EJpUScTGzfcOetvlw/process",
      headers: {
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
      },
      formData: {
        receiptImage: {
          value: image,
          options: {
            filename: "img14168966.png",
            contentType: null
          }
        },
        testMode: "true"
      }
    };
    return new Promise(function (resolve, reject) {
      request(options, function (error, response, body) {
        console.log("hit request");
        if (error) {
          console.log("Error!!!");
          console.log(error);
          throw new Error(error);
        }
        getResult(body).then(response => {
          resolve(response);
          console.log("Resolve 2");
          console.log(response);
        });
        console.log("Success!!!");
        console.log(body);
      });
    });
  };

  const getResult = postBody => {
    console.log("hit getResult()");
    var jsonBody = JSON.parse(postBody);
    if (jsonBody.success == false) {
      console.log("getresult() - failed POST");
      return;
    }

    var token = jsonBody.token;

    return new Promise(function (resolve, reject) {
      console.log("Inside getResult");
      request(
        "https://api.tabscanner.com/NbXvvebY6P6sbfWX0ZcsbLm7tAqde9CGZAZ84JKa6FyqCs9EJpUScTGzfcOetvlw/result/" +
        token,
        function (error, response, body) {
          retval = body;
          resolve(body);
          console.log("Resolved 1. ", body);
        }
      );
    });
  };

  send(event.body);
};
