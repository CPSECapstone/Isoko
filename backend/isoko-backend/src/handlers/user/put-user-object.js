const dynamodb = require('aws-sdk/clients/dynamodb');
const _ = require('lodash');
const docClient = new dynamodb.DocumentClient();
const { USER_TABLE } = require('../../constants');

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
      }
   );
   exp += expArr.join(`, `);
   exp.trim();
   return exp;
};

exports.putUserObjectHandler = async (event) => {
   if (event.httpMethod !== 'PUT') {
      return {
         statusCode: 400,
         body: { error: `putUserObject only accept PUT method, you tried: ${event.httpMethod}` },
      };
   }

   console.info('received:', event);

   const pk = _.get(event.pathParameters, 'pk', null);

   if (pk == null) {
      return {
         statusCode: 400,
         body: { error: `Missing query parameter 'pk'. Request URL format: PUT/user/{pk}` },
      };
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
         pk: pk,
      },
      UpdateExpression: updateExpr,
      ExpressionAttributeValues: exprAttrVals,
      ReturnValues: 'ALL_NEW',
   };

   let response;

   try {
      // pk (usersub id) is a restricted field so entire request fails
      if (fieldNames.includes('pk')) {
         console.log('this is restricted');
         throw new Error(`Cannot update restricted field: pk`);
      }

      const dynamoResult = await docClient.update(params).promise();

      const updateResult = dynamoResult.Attributes;

      response = {
         statusCode: 200,
         body: {
            results: updateResult,
         },
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