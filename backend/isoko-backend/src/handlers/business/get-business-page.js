const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const { BUSINESS_TABLE } = require('../../constants');
const { get400Response } = require('../util/response-utils');

/**
 * HTTP get method to get business page with details and reviews for specific businessId.
 */
exports.getBusinessPageHandler = async (event) => {
   if (event.httpMethod !== 'GET') {
      return get400Response(
         `getBusinessPage only accept GET method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);
   const { businessId } = event.pathParameters;

   if (businessId == null) {
      return get400Response(
         `Missing query parameter 'businessId'. Request URL format: GET/business/{businessId}`
      );
   }

   // params to get business info
   const businessParams = {
      TableName: BUSINESS_TABLE,
      Key: {
         pk: `${businessId}`,
         sk: 'INFO',
      },
   };

   // params to get reviews for business
   const reviewParams = {
      TableName: BUSINESS_TABLE,
      KeyConditionExpression: 'pk = :id and begins_with(sk, :r)',
      ExpressionAttributeValues: {
         ':id': `${businessId}`,
         ':r': 'REVIEW',
      },
   };

   let response;

   try {
      const businessResult = await docClient.get(businessParams).promise();

      let businessDetails = businessResult.Item;
      delete businessDetails.pk;
      delete businessDetails.sk;

      const reviewResult = await docClient.query(reviewParams).promise();

      let reviews = reviewResult.Items;
      businessDetails['reviews'] = reviews;

      response = {
         statusCode: 200,
         body: JSON.stringify(businessDetails),
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
