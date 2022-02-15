
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
   const { userSub } = event.pathParameters;

   if (userSub == null) {
      throw new Error(
         `Missing query parameter 'userSub'. Request URL format: GET/user/{userSub}`
      );
   }

   const params = {
      TableName: USER_TABLE,
      Key: {
         pk: userSub,
      },
   };

   let response;

   try {
      const dynamoResult = await docClient.get(params).promise();

      let getResults = dynamoResult.Items;
      delete getResults.pk;
      delete getResults.sk;

      response = {
         statusCode: 200,
         body: { results: getResults },
      };
   } catch (e) {
      response = {
         statusCode: 400,
         body: { error: e },
      };
   }

   console.info(
      `response from: ${event.path} statusCode: ${
         response.statusCode
      } body: ${JSON.stringify(response.body)}`
   );
   return response;
};
