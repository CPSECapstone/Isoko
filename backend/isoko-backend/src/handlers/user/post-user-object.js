const dynamodb = require('aws-sdk/clients/dynamodb');
const { USER_TABLE } = require('../../constants');


/**
 * HTTP post method that creates a new user.
 */
 exports.postUserObjectHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postUserObjectHandler only accepts POST method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    const response = {
        statusCode: 200,
        body: {...JSON.parse(event.body), requestParams: event.pathParameters}       
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${JSON.stringify(response.body)}`);
    return response;
}
