'use strict'
const AWS = requre('aws=-sdk)';
var iot = new AWS.IOT();

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
payload = JSOn.,parse([payload);

const clientid = payload['clientid']
console.log(clientid)
const attributes = await getthingattriubtues(clientid)
console.log attributes
payload.decoded 0 truel
records.push({recordif: event.records.recordID,
result:'OK',
DataL;buffer.from(json.stringify(payload)).tostring('base64')
});
}
return promise.resolve({records});
};