const axios = require("axios");
// eslint-disable-next-line no-unused-vars
exports.handler = function(event, context, callback) {
  const send = body => {
    var base64Data = body.split(",")[1];

    require("fs").writeFile(
      `images/img${Math.floor(Math.random() * 100000000) + 1}.png`,
      base64Data,
      "base64",
      function(err) {
        console.log(err);
      }
    );

    // processImage(body);
    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept"
      },
      body: body
    });
    // ba64.writeImage(
    //   `images/img${Math.floor(Math.random() * 100000000) + 1}`,
    //   data_url,
    //   function(err) {
    //     if (err) throw err;
    //   }
  };

  const processImage = image64 => {
    const API_URL = "https://api.tabscanner.com";
    const API_KEY =
      "WW5vQ48Igml32kNWjIG5xFe9TQ9oHnQdn9zrHzLN5RmNSCJ9P0v6nF0dCV9EpZXo";
    //const { API_URL, API_CLIENT_ID, API_CLIENT_SECRET } = process.env;
    const URL = `${API_URL}/${API_KEY}/process`;
    axios
      .post(URL, { receiptImage: "image64" })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  send(event.body);
};
