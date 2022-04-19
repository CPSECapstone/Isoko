const dynamodb = require('aws-sdk/clients/dynamodb');
const _ = require('lodash');
const docClient = new dynamodb.DocumentClient();
const { USER_TABLE } = require('../../constants');
const { get400Response } = require('../util/response-utils');

/**
 * HTTP put method t that allows the user object specified to be updated according to the request body.

 */

/**
 *
 * @param {*} names is a list of names representing attribute names to be updated
 * @param {*} requestBody is an object containing attribute names and new values
 * @param {*} attrValues is an object containing mappings that match update expression
 */
const buildUpdateExpression = (names, requestBody, attrValues) => {
   let exp = `set `;
   let expArr = [];
   let count = 97;
   names.forEach((n) => {
      const val = _.get(requestBody, n);
      const mapping = `:${String.fromCharCode(count)}`;
      expArr.push(`${n} = ${mapping}`);
      attrValues[mapping] = val;
      count += 1;
   });
   exp += expArr.join(`, `);
   exp.trim();
   return exp;
};

exports.putUserObjectHandler = async (event) => {
   if (event.httpMethod !== 'PUT') {
      return get400Response(
         `putUserObject only accept PUT method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);

   const userSub = _.get(event.pathParameters, 'userSub');

   if (!userSub) {
      return get400Response(
         `Missing path parameter 'userSub'. Request URL format: PUT/user/{userSub}`
      );
   }

   const requestBody = event.body && JSON.parse(event.body);
   const fieldNames = _.keys(requestBody);

   let exprAttrVals = {};
   const updateExpr = buildUpdateExpression(
      fieldNames,
      requestBody,
      exprAttrVals
   );

   const params = {
      TableName: USER_TABLE,
      Key: {
         pk: userSub,
      },
      UpdateExpression: updateExpr,
      ExpressionAttributeValues: exprAttrVals,
      ReturnValues: 'ALL_NEW',
   };

   let response;

   try {
      // pk (usersub id) is a restricted field so entire request fails
      if (fieldNames.includes('pk')) {
         throw new Error(`Cannot update restricted field: pk`);
      }

      const dynamoResult = await docClient.update(params).promise();

      const user = dynamoResult.Attributes;
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
