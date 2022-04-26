import json
import boto3
def transform(event, context):
    client = boto3.client('iot')
    #Pass iteratively the list of clientids and the out put should be key value pair of clientid and device
    response = client.describe_thing(thingName='myThing518')
    print(response)
    print("Thing1 response")
    print(response['attributes'])
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }