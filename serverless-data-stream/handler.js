import time
import boto3

query = 'select state.reported.uptime, state.reported.temperature, state.reported.humidity, state.reported.message from shadowevents'
DATABASE = 'shadoweventsdb'
output='s3://shadowprocessedzone/'

def lambda_handler(event, context):
    query = "select state.reported.uptime, state.reported.temperature, state.reported.humidity, state.reported.message from shadowevents"
    client = boto3.client('athena')
    
    response = client.start_query_execution(
        QueryString=query,
        QueryExecutionContext={
            'Database': DATABASE
        },
        ResultConfiguration={
            'OutputLocation': output,
        }
    )
    print(response)
    return response