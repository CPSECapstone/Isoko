const {
   cognitoPostConfirmationHandler,
} = require('../../../../src/handlers/triggers/cognito-post-confirmation.js');
const dynamodb = require('aws-sdk/clients/dynamodb');
const { USERS_TABLE } = require('../../../../src/constants');

jest.mock('aws-sdk/clients/dynamodb');

describe('CognitoPostConfirmationHandler tests', () => {
   let putSpy;

   beforeAll(() => {
      putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
   });

   afterEach(() => {
      putSpy.mockReset();
   });

   afterAll(() => {
      putSpy.mockRestore();
   });

   it('Checks that the put function is called with the right attributes', async () => {
      // arrange
      const event = {
         request: {
            userAttributes: {
               sub: '12345',
               email_verified: 'true',
               'cognito:user_status': 'CONFIRMED',
               'cognito:email_alias': 'test@gmail.com',
               name: 'Bob',
               family_name: 'Jones',
               email: 'test@gmail.com',
            },
         },
      };
      putSpy.mockReturnValue({
         promise: () => Promise.resolve({ Items: [] }),
      });

      // act
      cognitoPostConfirmationHandler(event, null, () => {});

      // assert
      expect(putSpy).toHaveBeenCalledWith({
         Item: {
            pk: '12345',
            name: 'Bob Jones',
            email: 'test@gmail.com',
            profilePicture: '',
            businessOwner: false,
            businessId: '',
         },
         ReturnConsumedCapacity: 'TOTAL',
         TableName: 'Users',
      });
   });
});
