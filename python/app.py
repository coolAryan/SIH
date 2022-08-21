from flask import Flask, render_template, redirect, url_for,request
from flask import make_response
import boto3

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def home():
    return "hi"

@app.route('/subscribe', methods=['GET', 'POST'])
def subscribe():
   message = None
   if request.method == 'POST':
        datafromjs = request.form['email']
        result = "return this"
        resp = make_response('{"response": '+result+'}')
        resp.headers['Content-Type'] = "application/json"
        print(datafromjs)
        client = boto3.client('sns')
        response = client.subscribe(
            TopicArn='arn:aws:sns:ap-south-1:639661757204:Test-Topic',
            Protocol='email',
            Endpoint='shubham1.gupta@celebaltech.com',
            ReturnSubscriptionArn=True|False
        )
        return response


if __name__ == 'main':
    app.run(debug = True, port="5000")

