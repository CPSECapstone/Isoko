/**
 * HTTP del method that deletes a specified review.
 */
exports.delUserReviewHandler = async (event) => {
   if (event.httpMethod !== 'DELETE') {
      throw new Error(
         `delUserReview only accept DEL method, you tried: ${event.httpMethod}`
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
