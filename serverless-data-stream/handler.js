'use strict'
const AWS = require('aws-sdk');
var iot = new AWS.Iot();

async function getThingAttributes(thingName) {
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
//console.log("the thing above is the event payload")
for (var data of event.records) {
    //console.log(data.data)
    var something = data.data
    //let payload = new Buffer(event.records.data, 'base64').tostring('asci');
    var payload = Buffer.from(something, 'base64').toString();
    payload = JSON.parse([payload]);
    
    const clientid = payload['clientid']
    //console.log(clientid)
    const attributes = await getThingAttributes(clientid)
    //console.log(attributes)
    payload['attributes'] = attributes
    console.log(payload)
    //console.log((JSON.stringify(payload)).toString('base64'))
    payload.decoded = true;
            records.push({
                recordId: data.recordId,
                result: 'Ok',
                data: Buffer.from(JSON.stringify(payload)).toString('base64')
            });
       return Promise.resolve({ records });
    }
}