'use strict'
const AWS = require('aws-sdk');
var iot = new AWS.iot();

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
console.log(event);
let records = [];

let payload = new Buffer(event.records.data, 'base64').tostring('asci');
payload = JSON.parse([payload]);

const clientid = payload['clientid']
console.log(clientid)
const attributes = await getThingAttributes(clientid)
console.log.attributes
payload.decoded = true;
        records.push({
            recordId: event.records[i].recordId,
            result: 'Ok',
            data: Buffer.from(JSON.stringify(payload)).toString('base64')
        });
   return Promise.resolve({ records });
}
