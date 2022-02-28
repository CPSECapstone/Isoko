const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const { USER_TABLE } = require('../../constants');
/**
 * HTTP put method t that allows the user object specified to be updated according to the request body.

 */
exports.putUserObjectHandler = async (event) => {
   if (event.httpMethod !== 'PUT') {
      throw new Error(
         `putUserObject only accept PUT method, you tried: ${event.httpMethod}`
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

      let getResults = dynamoResult.Item;

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
