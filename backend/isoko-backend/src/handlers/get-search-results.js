
/**
 * HTTP get method to get all businesses that match search criteria.
 */
exports.getSearchResultsHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getSearchResults only accept GET method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    const response = {
        statusCode: 200,
        body: {...JSON.parse(event.body), requestParams: event.queryStringParameters }       
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${JSON.stringify(response.body)}`);
    return response;
}
