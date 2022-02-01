const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const { USER_TABLE } = require('../../constants');

/**
 * Creates a new user in dynamodb after they confirm their email.
 */
exports.cognitoPostConfirmationHandler = async (event, context, callback) => {
   console.log('received: ', event);

   const params = {
      Item: {
         pk: event.request.userAttributes.sub,
         name:
            event.request.userAttributes.name +
            ' ' +
            event.request.userAttributes.family_name,
         email: event.request.userAttributes.email,
         profilePicture: '',
         businessOwner: false,
         businessId: '',
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: USER_TABLE,
   };
   
   await docClient.put(params).promise();

   callback(null, event);
};
