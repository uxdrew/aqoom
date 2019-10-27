const axios = require("axios");
var fs = require("fs");
var request = require("request");

// eslint-disable-next-line no-unused-vars
exports.handler = function(event, context, callback) {
  console.log("hit handler");

  const send = body => {
    var base64Data = body.split(",")[1];
    const fileName = `images/img${Math.floor(Math.random() * 100000000) +
      1}.png`;
    require("fs").writeFile(fileName, base64Data, "base64", function(err) {
      processImage(fileName);
      console.log(err);
    });

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept"
      },
      body: body
    });
  };

  const processImage = fileName => {
    console.log("hit processImage()");
    console.log(fileName);

    // request('http://www.google.com', function (error, response, body) {
    //     console.log('error:', error); // Print the error if one occurred
    //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     console.log('body:', body); // Print the HTML for the Google homepage.
    // });

    var image = fs.createReadStream(fileName);
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
            filename: "/C:/Users/DTC-ENG/aqoom/images/img14168966.png",
            contentType: null
          }
        },
        testMode: "true"
      }
    };

    request(options, function(error, response, body) {
      console.log("hit request");
      if (error) {
        console.log("Error!!!");
        console.log(error);
        throw new Error(error);
      }
      console.log("Success!!!");
      console.log(body);

      getResult(body);
    });
  };

  function getResult(body) {
    console.log("hit getResult()");
    var jsonBody = JSON.parse(body);
    if (jsonBody.success == false) {
      console.log("getresult() - failed POST");
      return;
    }

    var token = jsonBody.token;

    request(
      "https://api.tabscanner.com/NbXvvebY6P6sbfWX0ZcsbLm7tAqde9CGZAZ84JKa6FyqCs9EJpUScTGzfcOetvlw/result/" +
        token,
      function(error, response, body) {
        console.log("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        console.log("body:", body); // Print the HTML for the Google homepage.
      }
    );
  }

  send(event.body);
};
