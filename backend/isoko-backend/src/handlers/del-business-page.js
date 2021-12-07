
/**
 * HTTP del method that deletes a business page.
 */
exports.delBusinessPageHandler = async (event) => {
    if (event.httpMethod !== 'DEL') {
        throw new Error(`delBusinessPage only accept DEL method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    const response = {
        statusCode: 200,
        body: {...JSON.parse(event.body), requestParams: event.pathParameters }       
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${JSON.stringify(response.body)}`);
    return response;
}
