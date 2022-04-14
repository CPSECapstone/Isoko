/**
 * HTTP get method to geta user object based off of the userSub specified in the request.

 */
 exports.getUserObjectHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
       throw new Error(
          `getUserObject only accept GET method, you tried: ${event.httpMethod}`
       );
    }
 
    console.info('received:', event);
 
    const response = {
       statusCode: 200,
       body: { ...JSON.parse(event.body), requestParams: event.pathParameters },
    };
 
    console.info(
       `response from: ${event.path} statusCode: ${
          response.statusCode
       } body: ${JSON.stringify(response.body)}`
    );
    return response;
 };