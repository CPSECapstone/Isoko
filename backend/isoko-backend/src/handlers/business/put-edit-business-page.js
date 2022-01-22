/**
 * HTTP put method that allows only the business owner to modify the details of their business page.
 */
exports.putEditBusinessPageHandler = async (event) => {
   if (event.httpMethod !== 'PUT') {
      throw new Error(
         `putEditBusinessPage only accept PUT method, you tried: ${event.httpMethod}`
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
