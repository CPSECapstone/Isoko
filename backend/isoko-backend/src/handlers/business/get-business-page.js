const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const { BUSINESS_TABLE } = require('../../constants');

/**
 * HTTP get method to get business page with details and reviews for specific businessId.
 */
exports.getBusinessPageHandler = async (event) => {
   if (event.httpMethod !== 'GET') {
      throw new Error(
         `getBusinessPage only accept GET method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);
   const { businessId } = event.pathParameters; 

   if (businessId == null) {
      throw new Error(
         `Missing query parameter 'businessId'. Request URL format: GET/business/{businessId}`
      );
   }

   const params = {
      TableName: BUSINESS_TABLE,
      Key: {
         "businessId": businessId
      }
   }

   const dynamoResult = await docClient
      .get(params) 
      .promise(); 
   
   let getResult = dynamoResult.Items; 
   // delete DynamoDB specific items 
   delete getResult.pk; 
   delete getResult.sk; 

   const response = {
      statusCode: 200,
      body: {
         results: getResult
      },
   };

   console.info(
      `response from: ${event.path} statusCode: ${
         response.statusCode
      } body: ${JSON.stringify(response.body)}`
   );
   return response;
};
