const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const _ = require('lodash');
const { USER_TABLE } = require('../../constants');
/**
 * HTTP get method to geta user object based off of the userSub specified in the request.
 */
exports.getUserObjectHandler = async (event) => {
   if (event.httpMethod !== 'GET') {
      return {
         statusCode: 400,
         body: { error: `getUserObject only accept GET method, you tried: ${event.httpMethod}` },
      };
   }

   console.info('received:', event);
   const pk = _.get(event.pathParameters, 'pk', null);

   if (pk == null) {
      return {
         statusCode: 400,
         body: { error: `Missing query parameter 'pk'. Request URL format: GET/user/{pk}` },
      };
   }

   const params = {
      TableName: USER_TABLE,
      Key: {
         pk: pk,
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
