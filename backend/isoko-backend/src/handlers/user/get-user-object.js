const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const _ = require('lodash');
const { USER_TABLE } = require('../../constants');
const { get400Response } = require('../util/response-utils');

/**
 * HTTP get method to geta user object based off of the userSub specified in the request.
 */
exports.getUserObjectHandler = async (event) => {
   if (event.httpMethod !== 'GET') {
      return get400Response(
         `getUserObject only accept GET method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);
   const userSub = _.get(event.pathParameters, 'userSub');

   if (!userSub) {
      return get400Response(
         `Missing path parameter 'userSub'. Request URL format: GET/user/{userSub}`
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

      const user = dynamoResult.Item;
      user.userSub = user.pk;
      delete user.pk;

      response = {
         statusCode: 200,
         body: JSON.stringify(user),
         headers: {
            'content-type': 'json',
            'access-control-allow-origin': '*',
         },
      };
   } catch (e) {
      response = get400Response(e.message);
   }

   console.info(
      `response from: ${event.path} statusCode: ${
         response.statusCode
      } body: ${JSON.stringify(response.body)}`
   );
   return response;
};
