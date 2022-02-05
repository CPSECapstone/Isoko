/**
 * HTTP post method that creates a new flag for the specified review.
 */
exports.postReviewFlagHandler = async (event) => {
   if (event.httpMethod !== 'POST') {
      throw new Error(
         `postReviewFlag only accept POST method, you tried: ${event.httpMethod}`
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