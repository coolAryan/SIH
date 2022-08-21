import boto3

client = boto3.client('sns')


response = client.subscribe(
    TopicArn='arn:aws:sns:ap-south-1:639661757204:Test-Topic',
    Protocol='email',
    Endpoint='shubham1.gupta@celebaltech.com',
    ReturnSubscriptionArn=True|False
)


# response = client.create_sms_sandbox_phone_number(
#     PhoneNumber='+919829076878',
#     LanguageCode='en-US'
# )

# response = client.verify_sms_sandbox_phone_number(
#     PhoneNumber='+919829076878',
#     OneTimePassword='212601'
# )

# response = client.subscribe(
#     TopicArn='arn:aws:sns:ap-south-1:639661757204:Test-Topic',
#     Protocol='sms',
#     Endpoint='+919829076878',
#     ReturnSubscriptionArn=False,
# )