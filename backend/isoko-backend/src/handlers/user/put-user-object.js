
/**
 * HTTP put method t that allows the user object specified to be updated according to the request body.

 */
exports.putUserObjectHandler = async (event) => {
    if (event.httpMethod !== 'PUT') {
        throw new Error(`putUserObject only accept PUT method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    const response = {
        statusCode: 200,
        body: {...JSON.parse(event.body), requestParams: event.pathParameters }       
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${JSON.stringify(response.body)}`);
    return response;
}
