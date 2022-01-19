const dynamodb = require('aws-sdk/clients/dynamodb');
const _ = require('lodash');
const docClient = new dynamodb.DocumentClient();
const { BUSINESS_TABLE } = require('../../constants');

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
   const { businessId } = event.pathParameters; 

   if (businessId == null) {
      throw new Error(
         `Missing query parameter 'businessId'. Request URL format: PUT/business/{businessId}`
      );
   }

   const requestBody = event.body && JSON.parse(event.body);
   const fieldName = _.get(requestBody, 'fieldName');
   const newVal = _.get(requestBody, 'newVal');

   // following fields should not be modified 
   const restrictedFields = ['pk', 'sk', 'businessId', 'reviews', 'rating', 'numReviews', 'claimed']; 
   
   if (_.some(restrictedFields, fieldName)) {
      throw new Error(
         `Cannot update restricted field: ${fieldName}`
      );
   }

   const queryParams = {
      TableName: BUSINESS_TABLE,
      Key: {
         "businessId": businessId
      }, 
      UpdateExpression: `set ${fieldName} = :x`,
      ExpressionAttributeValues: { 
         ":x": newVal
     },
     ReturnValues: "UPDATED_NEW"
   }

   const dynamoResult = await docClient
      .update(queryParams) 
      .promise(); 
   
   let updateResult = dynamoResult.Items; 

   const response = {
      statusCode: 200,
      body: {
         results: updateResult
      },
   };

   console.info(
      `response from: ${event.path} statusCode: ${
         response.statusCode
      } body: ${JSON.stringify(response.body)}`
   );
   return response;
};
