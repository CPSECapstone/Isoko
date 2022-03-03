const {
    getUserObjectHandler,
 } = require('../../../../src/handlers/user/get-user-object.js');
 const dynamodb = require('aws-sdk/clients/dynamodb');
 const { USER_TABLE } = require('../../../../src/constants');
 
 jest.mock('aws-sdk/clients/dynamodb');
 
 describe('GetUserObjectHandler tests', () => {
    let getSpy;
 
    beforeAll(() => {
       getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get');
    });
 
    afterAll(() => {
       getSpy.mockRestore();
    });
 
    afterEach(() => {
       getSpy.mockReset();
    });

    describe('Invalid query param tests', () => {
        it('Should throw an error when wrong HTTP method is used', async () => {
           // arrange
           const event = {
              httpMethod: 'POST',
              pathParameters: {
                 pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
              },
           };
  
           // act
  
           // assert
           await expect(async () => {
              await getUserObjectHandler(event);
           }).rejects.toThrowError();
        });
  
        it('Should throw an error when path parameter is missing', async () => {
           // arrange
           const event = {
              httpMethod: 'GET',
           };
  
           // act
  
           // assert
           await expect(async () => {
              await getUserObjectHandler(event);
           }).rejects.toThrowError();
        });
     });
  
     describe('Failed get test', () => {
        it('Should return a 400 response when get throws an error', async () => {
           // arrange
           expectedItem = {
              statusCode: 400,
              body: { error: Error('Get failed') },
           };
           getSpy.mockImplementation(() => {
              throw new Error('Get failed');
           });
  
           const event = {
              httpMethod: 'GET',
              pathParameters: {
                 pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
              },
           };
  
           // act
           const result = await getUserObjectHandler(event);
  
           // assert
           expect(result).toEqual(expectedItem);
        });
     });
  
     describe('Valid input tests', () => {
        it('Should return user info associated with given pk', async () => {
           // arrange
           mockGetResults = {
              pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
              businessId: 'lala',
              profilePicture: 'lala',
              businessOwner: true,
              email: 'rohith.dara2000@gmail.com',
              name: 'Rohith Dara',
           };

           getSpy.mockReturnValue({
              promise: () => Promise.resolve({ Item: mockGetResults }),
           });

           const event = {
              httpMethod: 'GET',
              pathParameters: {
                 pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
              },
           };
           const expectedItems = {
                pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
                businessId: 'lala',
                profilePicture: 'lala',
                businessOwner: true,
                email: 'rohith.dara2000@gmail.com',
                name: 'Rohith Dara',
           };
  
           // act
           const result = await getUserObjectHandler(event);
  
           // assert
           expect(result.body.results).toEqual(expectedItems);
           expect(getSpy).toHaveBeenCalledWith({
              TableName: USER_TABLE,
              Key: {
                 pk: 'dd9ee02f-bc3e-45a5-b4ba-b0e2ef536573',
              },
           });
        });
     });
  });
  