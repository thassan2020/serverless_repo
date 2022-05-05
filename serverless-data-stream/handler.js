'use strict'
const AWS = require('aws-sdk'); //utlizes the AWS SDK kit
var iot = new AWS.Iot();

async function getThingAttributes(thingName) {  //Uses the getThing Attributes API function in order to match our thing or devices to the predefined attributes we have set for each device 
    try {
        const params = {
            thingName: thingName
        };
        const data = await iot.describeThing(params).promise();
        console.log(data)
        return data['attributes']
    } catch (e) {
        throw new Error(`Could not retrieve file from S3: ${e.message}`)
    }
}

module.exports.transform = async(event) => {
//console.log(event);
let records = [];
console.log("TESTING THIS")
//console.log(event.records.data)
for (var data of event.records) { //for loop begins for all the evengt records
    //console.log(data.data)
    var something = data.data //setting our data to a variable 
    //let payload = new Buffer(event.records.data, 'base64').tostring('asci');
    var payload = Buffer.from(something, 'base64').toString(); //setting our varaible payload to buffer from the data a
    payload = JSON.parse([payload]); //from getting the payload we then parse the data
    //payload = SELECT topic(3) as clientid FROM '$aws/things/+/shadow/name/+/update/+
    const clientid = payload['clientid'] //the client id reads in the entire payload
    //console.log(clientid)
    const attributes = await getThingAttributes(clientid) //the api call from lambda function then matches the client id or device with the associated attributes 
    //console.log(attributes)
    payload['attributes'] = attributes
    console.log(payload)
    //console.log((JSON.stringify(payload)).toString('base64'))
    payload.decoded = true; //function pushes all record ID data continously for every new data coming in from Kinesis) 
            records.push({
                recordId: data.recordId,
                result: 'Ok',
                data: Buffer.from(JSON.stringify(payload)).toString('base64')
            });
       return Promise.resolve({ records });
    }
}