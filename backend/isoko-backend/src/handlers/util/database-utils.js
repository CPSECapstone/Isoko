const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const { BUSINESS_TABLE } = require('../../constants');

exports.getItemFromTablePromise = async (tableName, pk, sk) => {
   const params = {
      TableName: tableName,
      Key: {
         pk,
         sk,
      },
   };

   return docClient.get(params).promise();
};

exports.getReviewsForBusinessPromise = async (businessId) => {
   const reviewParams = {
      TableName: BUSINESS_TABLE,
      KeyConditionExpression: 'pk = :id and begins_with(sk, :r)',
      ExpressionAttributeValues: {
         ':id': `${businessId}`,
         ':r': 'REVIEW',
      },
   };

   return docClient.query(reviewParams).promise();
};
