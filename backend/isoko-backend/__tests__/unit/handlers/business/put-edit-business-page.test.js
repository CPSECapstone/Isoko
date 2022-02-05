const {
   putEditBusinessPageHandler,
} = require('../../../../src/handlers/business/put-edit-business-page.js');
const dynamodb = require('aws-sdk/clients/dynamodb');
const { BUSINESS_TABLE } = require('../../../../src/constants');

jest.mock('aws-sdk/clients/dynamodb');

describe('PutEditBusinessPageHandler tests', () => {
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
               businessId: '-664125567',
            },
         };

         // act

         // assert
         await expect(async () => {
            await putEditBusinessPageHandler(event);
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
            await putEditBusinessPageHandler(event);
         }).rejects.toThrowError();
      });

      it('Should return a 400 response when target field is restricted', async () => {
         // arrange
         expectedItem = {
            statusCode: 400,
            body: {
               results: {
                  error: Error('Cannot update restricted field: pk'),
               },
            },
         };

         updateSpy.mockImplementation(() => {
            throw new Error('Cannot update restricted field: pk');
         });

         const event = {
            httpMethod: 'PUT',
            pathParameters: {
               businessId: '-664125567',
            },
            body: JSON.stringify({
               pk: '-7786665654',
            }),
         };

         // act
         const result = await putEditBusinessPageHandler(event);

         // assert
         expect(result).toEqual(expectedItem);
      });

      it('Should return a 400 response when one of target fields is restricted', async () => {
         // arrange
         expectedItem = {
            statusCode: 400,
            body: {
               results: {
                  error: Error('Cannot update restricted field: rating'),
               },
            },
         };

         updateSpy.mockImplementation(() => {
            throw new Error('Cannot update restricted field: rating');
         });

         const event = {
            httpMethod: 'PUT',
            pathParameters: {
               businessId: '-664125567',
            },
            body: JSON.stringify({
               city: 'Venice Beach',
               rating: 5,
            }),
         };

         // act
         const result = await putEditBusinessPageHandler(event);

         // assert
         expect(result).toEqual(expectedItem);
      });

      it('Should return a 400 response when all target fields are restricted', async () => {
         // arrange
         expectedItem = {
            statusCode: 400,
            body: {
               results: {
                  error: Error(
                     'Cannot update restricted field: rating,numReviews'
                  ),
               },
            },
         };

         updateSpy.mockImplementation(() => {
            throw new Error(
               'Cannot update restricted field: rating,numReviews'
            );
         });

         const event = {
            httpMethod: 'PUT',
            pathParameters: {
               businessId: '-664125567',
            },
            body: JSON.stringify({
               rating: 5,
               numReviews: 3890,
            }),
         };

         // act
         const result = await putEditBusinessPageHandler(event);

         // assert
         expect(result).toEqual(expectedItem);
      });
   });
   describe('Valid input tests', () => {
      it('Should update value of one target field', async () => {
         // arrange
         mockUpdateResults = {
            pk: '-664125567',
            sk: 'INFO',
            name: "Bluth's Original Frozen Banana",
            city: 'Venice Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'B&M',
            tags: ['Women-Owned'],
            keywords: ['Desserts'],
            shortDesc: '',
            businessId: '-664125567',
            hours: {},
            links: {},
            aboutOwner: {
               owner: '',
               ownerName: 'Maeby Funke',
               ownerPhone: '123-456-7890',
               ownerDesc: '',
               ownerPhoto: '',
            },
            reviews: [],
            photos: [],
            lister: 'George Michael Bluth',
         };

         updateSpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockUpdateResults }),
         });

         const event = {
            httpMethod: 'PUT',
            pathParameters: {
               businessId: '-664125567',
            },
            body: JSON.stringify({
               city: 'Venice Beach',
            }),
         };

         const expectedItems = {
            name: "Bluth's Original Frozen Banana",
            city: 'Venice Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'B&M',
            tags: ['Women-Owned'],
            keywords: ['Desserts'],
            shortDesc: '',
            businessId: '-664125567',
            hours: {},
            links: {},
            aboutOwner: {
               owner: '',
               ownerName: 'Maeby Funke',
               ownerPhone: '123-456-7890',
               ownerDesc: '',
               ownerPhoto: '',
            },
            reviews: [],
            photos: [],
            lister: 'George Michael Bluth',
         };

         // act
         const result = await putEditBusinessPageHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(updateSpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            Key: {
               businessId: '-664125567',
            },
            UpdateExpression: `set city = :a`,
            ExpressionAttributeValues: {
               ':a': 'Venice Beach',
            },
            ReturnValues: 'UPDATED_NEW',
         });
      });

      it('Should update value of complex target field', async () => {
         // arrange
         mockUpdateResults = {
            pk: '-664125567',
            sk: 'INFO',
            name: "Bluth's Original Frozen Banana",
            city: 'Venice Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'B&M',
            tags: ['Women-Owned'],
            keywords: ['Desserts'],
            shortDesc: '',
            businessId: '-664125567',
            hours: {},
            links: {},
            aboutOwner: {
               owner: '',
               ownerName: 'Lindsay Bluth',
               ownerPhone: '123-456-7890',
               ownerDesc: '',
               ownerPhoto: '',
            },
            reviews: [],
            photos: [],
            lister: 'George Michael Bluth',
         };

         updateSpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockUpdateResults }),
         });

         const event = {
            httpMethod: 'PUT',
            pathParameters: {
               businessId: '-664125567',
            },
            body: JSON.stringify({
               aboutOwner: {
                  ownerName: 'Lindsay Bluth',
               },
            }),
         };

         const expectedItems = {
            name: "Bluth's Original Frozen Banana",
            city: 'Venice Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'B&M',
            tags: ['Women-Owned'],
            keywords: ['Desserts'],
            shortDesc: '',
            businessId: '-664125567',
            hours: {},
            links: {},
            aboutOwner: {
               owner: '',
               ownerName: 'Lindsay Bluth',
               ownerPhone: '123-456-7890',
               ownerDesc: '',
               ownerPhoto: '',
            },
            reviews: [],
            photos: [],
            lister: 'George Michael Bluth',
         };

         // act
         const result = await putEditBusinessPageHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(updateSpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            Key: {
               businessId: '-664125567',
            },
            UpdateExpression: `set aboutOwner.ownerName = :a`,
            ExpressionAttributeValues: {
               ':a': 'Lindsay Bluth',
            },
            ReturnValues: 'UPDATED_NEW',
         });
      });

      it('Should update value of multiple target fields', async () => {
         // arrange
         mockUpdateResults = {
            pk: '-664125567',
            sk: 'INFO',
            name: "Lindsay Bluth's Original Frozen Banana",
            city: 'Venice Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'B&M',
            tags: ['Women-Owned'],
            keywords: ['Desserts'],
            shortDesc: "There's always money in the banana stand.",
            businessId: '-664125567',
            hours: {},
            links: {},
            aboutOwner: {
               owner: '',
               ownerName: 'Lindsay Bluth',
               ownerPhone: '123-456-7890',
               ownerDesc: '',
               ownerPhoto: '',
            },
            reviews: [],
            photos: [],
            lister: 'George Michael Bluth',
         };

         updateSpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockUpdateResults }),
         });

         const event = {
            httpMethod: 'PUT',
            pathParameters: {
               businessId: '-664125567',
            },
            body: JSON.stringify({
               name: "Lindsay Bluth's Original Frozen Banana",
               aboutOwner: {
                  ownerName: 'Lindsay Bluth',
               },
               shortDesc: "There's always money in the banana stand.",
            }),
         };

         const expectedItems = {
            name: "Lindsay Bluth's Original Frozen Banana",
            city: 'Venice Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'B&M',
            tags: ['Women-Owned'],
            keywords: ['Desserts'],
            shortDesc: "There's always money in the banana stand.",
            businessId: '-664125567',
            hours: {},
            links: {},
            aboutOwner: {
               owner: '',
               ownerName: 'Lindsay Bluth',
               ownerPhone: '123-456-7890',
               ownerDesc: '',
               ownerPhoto: '',
            },
            reviews: [],
            photos: [],
            lister: 'George Michael Bluth',
         };

         // act
         const result = await putEditBusinessPageHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(updateSpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            Key: {
               businessId: '-664125567',
            },
            UpdateExpression: `set name = :a, aboutOwner.ownerName = :b, shortDesc = :c`,
            ExpressionAttributeValues: {
               ':a': "Lindsay Bluth's Original Frozen Banana",
               ':b': 'Lindsay Bluth',
               ':c': "There's always money in the banana stand.",
            },
            ReturnValues: 'UPDATED_NEW',
         });
      });

      it('Should update value of multiple simple target fields', async () => {
         // arrange
         mockUpdateResults = {
            pk: '-664125567',
            sk: 'INFO',
            name: "Lindsay Bluth's Original Frozen Banana",
            city: 'Venice Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'Online',
            tags: ['Women-Owned'],
            keywords: ['Desserts'],
            shortDesc: '',
            businessId: '-664125567',
            hours: {},
            links: {},
            aboutOwner: {
               owner: '',
               ownerName: 'Lindsay Bluth',
               ownerPhone: '123-456-7890',
               ownerDesc: '',
               ownerPhoto: '',
            },
            reviews: [],
            photos: [],
            lister: 'George Michael Bluth',
         };

         updateSpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockUpdateResults }),
         });

         const event = {
            httpMethod: 'PUT',
            pathParameters: {
               businessId: '-664125567',
            },
            body: JSON.stringify({
               name: "Lindsay Bluth's Original Frozen Banana",
               type: 'Online',
            }),
         };

         const expectedItems = {
            name: "Lindsay Bluth's Original Frozen Banana",
            city: 'Venice Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'Online',
            tags: ['Women-Owned'],
            keywords: ['Desserts'],
            shortDesc: '',
            businessId: '-664125567',
            hours: {},
            links: {},
            aboutOwner: {
               owner: '',
               ownerName: 'Lindsay Bluth',
               ownerPhone: '123-456-7890',
               ownerDesc: '',
               ownerPhoto: '',
            },
            reviews: [],
            photos: [],
            lister: 'George Michael Bluth',
         };

         // act
         const result = await putEditBusinessPageHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(updateSpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            Key: {
               businessId: '-664125567',
            },
            UpdateExpression: `set name = :a, type = :b`,
            ExpressionAttributeValues: {
               ':a': "Lindsay Bluth's Original Frozen Banana",
               ':b': 'Online',
            },
            ReturnValues: 'UPDATED_NEW',
         });
      });
   });
});