// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");

function subscribe(email) {
  // Set region
  AWS.config.update({ region: "REGION" });

  // Create subscribe/email parameters
  var params = {
    Protocol: "EMAIL" /* required */,
    TopicArn: "arn:aws:sns:ap-south-1:639661757204:Test-Topic" /* required */,
    Endpoint: email,
  };

  // Create promise and SNS service object
  var subscribePromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .subscribe(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  subscribePromise
    .then(function (data) {
      console.log("Subscription ARN is " + data.SubscriptionArn);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });

  return;
}

module.exports = subscribe;
