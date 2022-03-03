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
 
    describe('Invalid query param tests', () => {
       it('Should throw an error when wrong HTTP method is used', async () => {
          // arrange
          const event = {
             httpMethod: 'GET',
             pathParameters: {
                pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',

             },
          };
 
          // act
 
          // assert
          await expect(async () => {
             await putUserObjectHandler(event);
          }).rejects.toThrowError();
       });
 
       it('Should throw an error when path parameter is missing', async () => {
          // arrange
          const event = {
             httpMethod: 'PUT',
          };
 
          // act
 
          // assert
          await expect(async () => {
             await putUserObjectHandler(event);
          }).rejects.toThrowError();
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
                pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
             },
             body: JSON.stringify({
                pk: '7786665654',
             }),
          };
 
          // act
          const result = await putUserObjectHandler(event);
 
          // assert
          expect(result).toEqual(expectedItem);
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
            pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
           },
           body: JSON.stringify({
              pk: 'lalala',
              name: 'Rohith D',
           }),
        };

        // act
        const result = await putUserObjectHandler(event);

        // assert
        expect(result).toEqual(expectedItem);
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
                pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
             },
             body: JSON.stringify({
                randomField: 'lala',
             }),
          };
 
          // act
          const result = await putUserObjectHandler(event);
 
          // assert
          expect(result).toEqual(expectedItem);
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
             promise: () => Promise.resolve({ Item: mockUpdateResults }),
          });
 
          const event = {
             httpMethod: 'PUT',
             pathParameters: {
                pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
             },
             body: JSON.stringify({
                email: 'yomama@gmail.com',
             }),
          };
 
          const expectedItems = {
            pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
            businessId: 'lala',
            profilePicture: 'lala',
            businessOwner: true,
            email: 'yomama@gmail.com',
            name: 'Rohith Dara',
       };
 
          // act
          const result = await putUserObjectHandler(event);
 
          // assert
          expect(result.body.results).toEqual(expectedItems);
          expect(updateSpy).toHaveBeenCalledWith({
             TableName: USER_TABLE,
             Key: {
                pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
             },
             UpdateExpression: `set email = :a`,
             ExpressionAttributeValues: {
                ':a': 'yomama@gmail.com',
             },
             ReturnValues: 'UPDATED_NEW',
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
                promise: () => Promise.resolve({ Item: mockUpdateResults }),
            });

            const event = {
                httpMethod: 'PUT',
                pathParameters: {
                pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
                },
                body: JSON.stringify({
                    name: 'Rohith Dara',
                    businessOwner: true,
                }),
            };

            const expectedItems = {
                pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
                businessId: 'lala',
                profilePicture: 'lala',
                businessOwner: true,
                email: 'yomama@gmail.com',
                name: 'Rohith Dara',
            };
         
          // act
          const result = await putUserObjectHandler(event);
 
          // assert
          expect(result.body.results).toEqual(expectedItems);
          expect(updateSpy).toHaveBeenCalledWith({
             TableName: USER_TABLE,
             Key: {
                pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
             },
             UpdateExpression: `set name = :a, businessOwner = :b`,
             ExpressionAttributeValues: {
                ':a': "Rohith Dara",
                ':b': true,
             },
             ReturnValues: 'UPDATED_NEW',
          });
       });
    });
 });
 