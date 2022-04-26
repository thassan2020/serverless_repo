import json
def lambda_handler(event, context):
    import boto3
    client = boto3.client('iot')
    #Pass iteratively the list of clientids and the out put should be key value pair of clientid and device
    response = client.describe_thing(thingName='Mythingshadow1')
    print(response)
    print("Thing1 response")
    print(response['attributes'])
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }