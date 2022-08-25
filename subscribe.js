// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });
var sns = new AWS.SNS({ apiVersion: "2010-03-31" });
var number = "";

function subscribeByEmail(email) {
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

  // return data;
}

function sendOtp(phoneNumber) {
  number = phoneNumber;
  var params = {
    PhoneNumber: "+91" + `${phoneNumber}` /* required */,
    LanguageCode: "en-US",
  };

  sns.createSMSSandboxPhoneNumber(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      console.log(data);
      console.log("Otp Send");
    } // successful response
  });
  //     return data.otp ;
}

function subscribeByPhoneNumber(phoneNumber, otp) {
  console.log(number, "number");
  var params = {
    OneTimePassword: otp /* required */,
    PhoneNumber: "+91" + `${number}` /* required */,
  };
  sns.verifySMSSandboxPhoneNumber(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      console.log(data);
      var params = {
        Protocol: "SMS" /* required */,
        TopicArn:
          "arn:aws:sns:ap-south-1:639661757204:Test-Topic" /* required */,
        //  Attributes: {
        //  '<attributeName>': 'STRING_VALUE',
        /* '<attributeName>': ... */
        //},
        Endpoint: "+91" + `${number}`,
        ReturnSubscriptionArn: true || false,
      };
      sns.subscribe(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
      });
    } // successful response
  });
}

module.exports = {
  subscribeByEmail,
  subscribeByPhoneNumber,
  sendOtp,
};
