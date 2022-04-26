const dynamodb = require('aws-sdk/clients/dynamodb');
const _ = require('lodash');
const docClient = new dynamodb.DocumentClient();
const { BUSINESS_TABLE } = require('../../constants');
const { get400Response } = require('../util/response-utils');

/**
 *
 * @param {*} name of complex object
 * @param {*} obj complex object
 * @param {*} exprs array that contains pieces of UpdateExpression
 * @param {*} attrValues object that contains ExpressionAttributeValues object
 * @param {*} count int that keeps track of current mapping
 */
const buildComplexObjectExpression = (
   objName,
   obj,
   exprs,
   attrValues,
   count
) => {
   let deltaCount = 0;
   const objKeys = _.keys(obj);
   objKeys.forEach((k) => {
      const mapping = `:${String.fromCharCode(count)}`;
      const updateName = `${objName}.${k}`;
      exprs.push(`${updateName} = ${mapping}`);
      attrValues[mapping] = _.get(obj, k);
      count += 1;
      deltaCount += 1;
   });

   return deltaCount;
};

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
      if (typeof val == 'object' && !Array.isArray(val)) {
         count += buildComplexObjectExpression(
            n,
            val,
            expArr,
            attrValues,
            count
         );
      } else {
         const mapping = `:${String.fromCharCode(count)}`;
         expArr.push(`${n} = ${mapping}`);
         attrValues[mapping] = val;
         count += 1;
      }
   });
   exp += expArr.join(`, `);
   exp.trim();
   return exp;
};

/**
 * HTTP put method that allows only the business owner to modify the details of their business page.
 */
exports.putEditBusinessPageHandler = async (event) => {
   if (event.httpMethod !== 'PUT') {
      return get400Response(
         `putEditBusinessPage only accept PUT method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);
   const businessId = _.get(event, ['pathParameters', 'businessId']);

   if (!businessId) {
      return get400Response(
         `Missing query parameter 'businessId'. Request URL format: PUT/business/{businessId}`
      );
   }

   const requestBody = event.body && JSON.parse(event.body);
   const fieldNames = _.keys(requestBody);

   // following fields should not be modified
   const restrictedFields = [
      'pk',
      'sk',
      'businessId',
      'reviews',
      'rating',
      'numReviews',
      'claimed',
   ];

   let exprAttrVals = {};
   const updateExpr = buildUpdateExpression(
      fieldNames,
      requestBody,
      exprAttrVals
   );

   const params = {
      TableName: BUSINESS_TABLE,
      Key: {
         pk: businessId,
         sk: 'INFO',
      },
      UpdateExpression: updateExpr,
      ExpressionAttributeValues: exprAttrVals,
      ReturnValues: 'ALL_NEW',
   };

   let response;

   try {
      // if any keys are restricted fields, entire request fails
      if (restrictedFields.some((i) => fieldNames.includes(i))) {
         const fields = fieldNames.filter((i) => restrictedFields.includes(i));
         throw new Error(`Cannot update restricted field: ${fields}`);
      }

      const dynamoResult = await docClient.update(params).promise();

      const updateResult = dynamoResult.Attributes;

      // delete DynamoDB specific items
      delete updateResult.pk;
      delete updateResult.sk;

      response = {
         statusCode: 200,
         body: JSON.stringify(updateResult),
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
