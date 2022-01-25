const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const docClient = new AWS.DynamoDB.DocumentClient();
const { BUSINESS_TABLE } = require('../constants');

/*
 * This is a script I used to test out the different responses/params to
 * call the DynamoDB functions with. You can run this locally to test Dynamo
 * functionality, just make sure your AWS CLI is set up with the proper
 * credentials before running this script.
 */

const category = 'restaurant';
const location = 'TestState#TestCity';

const params = {
   TableName: BUSINESS_TABLE,
   KeyConditionExpression: `#pk = :location${
      category ? ' AND begins_with(#sk,:cat)' : ''
   }`,
   ExpressionAttributeNames: {
      '#pk': 'pk',
      ...(category && { '#sk': 'sk' }),
   },
   ExpressionAttributeValues: {
      ':location': location,
      ...(category && { ':cat': category }),
   },
};

const func = async () => {
   const result = await docClient.query(params).promise();

   console.log(result);
};

func();
