
/**
 * HTTP post method to allow a user to list a new business.
 */
exports.postListBusinessHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postListBusiness only accept POST method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    const response = {
        statusCode: 200,
        body: {...JSON.parse(event.body)}       
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${JSON.stringify(response.body)}`);
    return response;
}
