/**
 * HTTP get method that lists all the flags for the specified review.
 */
exports.getReviewFlagsHandler = async (event) => {
   if (event.httpMethod !== 'GET') {
      throw new Error(
         `getReviewFlags only accept GET method, you tried: ${event.httpMethod}`
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
