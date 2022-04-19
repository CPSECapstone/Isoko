const {
   putUserObjectHandler,
} = require('../../../../src/handlers/user/put-user-object.js');
const dynamodb = require('aws-sdk/clients/dynamodb');
const { USER_TABLE } = require('../../../../src/constants');

jest.mock('aws-sdk/clients/dynamodb');

describe('putUserObjectHandler tests', () => {
   let updateSpy;

   beforeAll(() => {
      updateSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'update');
   });

   afterAll(() => {
      updateSpy.mockRestore();
   });

   afterEach(() => {
      updateSpy.mockReset();
   });

   describe('Invalid path param tests', () => {
      it('Should throw an error when wrong HTTP method is used', async () => {
         // arrange
         const event = {
            httpMethod: 'GET',
            pathParameters: {
               userSub: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
            },
         };

         // act
         const result = await putUserObjectHandler(event);

         // assert
         expect(result.statusCode).toBe(400);
         expect(result.body.error).toBe(
            `putUserObject only accept PUT method, you tried: ${event.httpMethod}`
         );
      });

      it('Should throw an error when path parameter is missing', async () => {
         // arrange
         const event = {
            httpMethod: 'PUT',
         };

         // act
         const result = await putUserObjectHandler(event);

         // assert
         expect(result.statusCode).toBe(400);
         expect(result.body.error).toBe(
            `Missing path parameter 'userSub'. Request URL format: PUT/user/{userSub}`
         );
      });

      it('Should return a 400 response when target field is restricted', async () => {
         // arrange
         expectedItem = {
            statusCode: 400,
            body: { error: Error('Cannot update restricted field: pk') },
         };

         updateSpy.mockImplementation(() => {
            throw new Error('Cannot update restricted field: pk');
         });

         const event = {
            httpMethod: 'PUT',
            pathParameters: {
               userSub: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
            },
            body: JSON.stringify({
               pk: '7786665654',
            }),
         };

         // act
         const result = await putUserObjectHandler(event);

         // assert
         expect(result.statusCode).toBe(400);
         expect(result.body.error).toBe('Cannot update restricted field: pk');
      });
   });

   it('Should return a 400 response when one of target fields is restricted', async () => {
      // arrange
      expectedItem = {
         statusCode: 400,
         body: { error: Error('Cannot update restricted field: pk') },
      };

      updateSpy.mockImplementation(() => {
         throw new Error('Cannot update restricted field: pk');
      });

      const event = {
         httpMethod: 'PUT',
         pathParameters: {
            userSub: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
         },
         body: JSON.stringify({
            pk: 'lalala',
            name: 'Rohith D',
         }),
      };

      // act
      const result = await putUserObjectHandler(event);

      // assert
      expect(result.statusCode).toBe(400);
      expect(result.body.error).toBe('Cannot update restricted field: pk');
   });

   describe('Failed update test', () => {
      it('Should return a 400 response when trying to update with uknown/invalid field', async () => {
         // arrange
         expectedItem = {
            statusCode: 400,
            body: { error: Error('Update failed') },
         };
         updateSpy.mockImplementation(() => {
            throw new Error('Update failed');
         });

         const event = {
            httpMethod: 'PUT',
            pathParameters: {
               userSub: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
            },
            body: JSON.stringify({
               randomField: 'lala',
            }),
         };

         // act
         const result = await putUserObjectHandler(event);

         // assert
         expect(result.statusCode).toBe(400);
         expect(result.body.error).toBe('Update failed');
      });
   });

   describe('Valid input tests', () => {
      it('Should update value of one target field', async () => {
         // arrange
         mockUpdateResults = {
            pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
            businessId: 'lala',
            profilePicture: 'lala',
            businessOwner: true,
            email: 'yomama@gmail.com',
            name: 'Rohith Dara',
         };

         updateSpy.mockReturnValue({
            promise: () => Promise.resolve({ Attributes: mockUpdateResults }),
         });

         const event = {
            httpMethod: 'PUT',
            pathParameters: {
               userSub: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
            },
            body: JSON.stringify({
               email: 'yomama@gmail.com',
            }),
         };

         const expectedItems = {
            businessId: 'lala',
            profilePicture: 'lala',
            businessOwner: true,
            email: 'yomama@gmail.com',
            name: 'Rohith Dara',
            userSub: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
         };

         // act
         const result = await putUserObjectHandler(event);

         // assert
         expect(result.body).toEqual(JSON.stringify(expectedItems));
         expect(updateSpy).toHaveBeenCalledWith({
            TableName: USER_TABLE,
            Key: {
               pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
            },
            UpdateExpression: `set email = :a`,
            ExpressionAttributeValues: {
               ':a': 'yomama@gmail.com',
            },
            ReturnValues: 'ALL_NEW',
         });
      });

      it('Should update value of multiple target fields', async () => {
         // arrange
         mockUpdateResults = {
            pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
            businessId: 'lala',
            profilePicture: 'lala',
            businessOwner: true,
            email: 'yomama@gmail.com',
            name: 'Rohith Dara',
         };

         updateSpy.mockReturnValue({
            promise: () => Promise.resolve({ Attributes: mockUpdateResults }),
         });

         const event = {
            httpMethod: 'PUT',
            pathParameters: {
               userSub: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
            },
            body: JSON.stringify({
               name: 'Rohith Dara',
               businessOwner: true,
            }),
         };

         const expectedItems = {
            businessId: 'lala',
            profilePicture: 'lala',
            businessOwner: true,
            email: 'yomama@gmail.com',
            name: 'Rohith Dara',
            userSub: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
         };

         // act
         const result = await putUserObjectHandler(event);

         // assert
         expect(result.body).toEqual(JSON.stringify(expectedItems));
         expect(updateSpy).toHaveBeenCalledWith({
            TableName: USER_TABLE,
            Key: {
               pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
            },
            UpdateExpression: `set name = :a, businessOwner = :b`,
            ExpressionAttributeValues: {
               ':a': 'Rohith Dara',
               ':b': true,
            },
            ReturnValues: 'ALL_NEW',
         });
      });
   });
});
