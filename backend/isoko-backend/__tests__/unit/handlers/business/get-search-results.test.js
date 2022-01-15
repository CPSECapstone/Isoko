const {
   getSearchResultsHandler,
} = require('../../../../src/handlers/business/get-search-results.js');
const dynamodb = require('aws-sdk/clients/dynamodb');
const { BUSINESS_TABLE } = require('../../../../src/constants');

jest.mock('aws-sdk/clients/dynamodb');

describe('GetSearchResultsHandler tests', () => {
   let querySpy;

   beforeAll(() => {
      querySpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'query');
   });

   afterAll(() => {
      querySpy.mockRestore();
   });

   describe('Invalid location query param tests', () => {
      it('Should throw an error when location is missing altogether', async () => {
         // arrange
         const event = {
            httpMethod: 'GET',
         };

         // act

         // assert
         await expect(async () => {
            await getSearchResultsHandler(event);
         }).rejects.toThrowError();
      });

      it('Should throw an error when location is missing information', async () => {
         // arrange
         const event = {
            httpMethod: 'GET',
            queryStringParameters: {
               location: 'CA',
            },
         };

         // act

         // assert
         await expect(async () => {
            await getSearchResultsHandler(event);
         }).rejects.toThrowError('CA');
      });

      it('Should throw an error when location has extra information', async () => {
         // arrange
         const event = {
            httpMethod: 'GET',
            queryStringParameters: {
               location: 'CA/Sunnyvale/SantaClara',
            },
         };

         // act

         // assert
         await expect(async () => {
            await getSearchResultsHandler(event);
         }).rejects.toThrowError('CA/Sunnyvale/SantaClara');
      });
   });

   describe('Valid Input tests', () => {
      it('Should retrieve all results with matching pk', async () => {
         // arrange
         mockQueryResults = [
            {
               pk: 'CA#Sunnyvale',
               sk: 'restaurant#BUSID1',
               name: "Bob's Burgers",
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Black-Owned', 'LGBTQ-Owned'],
               keywords: ['Burgers', 'Salads'],
               stars: 4.5,
               shortDesc: "Bob's Burgers Description",
               numReviews: 30,
               verified: true,
               businessId: 'BUSID1',
               photo: 'BUSID1#COVERPHOTO',
            },
            {
               pk: 'CA#Sunnyvale',
               sk: 'salon#BUSID2',
               name: "Tyler's Salon",
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Black-Owned', 'LGBTQ-Owned'],
               keywords: ['Haircuts'],
               stars: 3.8,
               shortDesc: "Tyler's Salon Description",
               numReviews: 12,
               verified: true,
               businessId: 'BUSID2',
               photo: 'BUSID2#COVERPHOTO',
            },
         ];
         querySpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockQueryResults }),
         });
         const event = {
            httpMethod: 'GET',
            queryStringParameters: {
               location: 'CA/Sunnyvale',
            },
         };

         const expectedItems = [
            {
               name: "Bob's Burgers",
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Black-Owned', 'LGBTQ-Owned'],
               keywords: ['Burgers', 'Salads'],
               stars: 4.5,
               shortDesc: "Bob's Burgers Description",
               numReviews: 30,
               verified: true,
               businessId: 'BUSID1',
               photo: 'BUSID1#COVERPHOTO',
            },
            {
               name: "Tyler's Salon",
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Black-Owned', 'LGBTQ-Owned'],
               keywords: ['Haircuts'],
               stars: 3.8,
               shortDesc: "Tyler's Salon Description",
               numReviews: 12,
               verified: true,
               businessId: 'BUSID2',
               photo: 'BUSID2#COVERPHOTO',
            },
         ];

         // act
         const result = await getSearchResultsHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            KeyConditionExpression: '#pk = :location',
            ExpressionAttributeNames: {
               '#pk': 'pk',
            },
            ExpressionAttributeValues: {
               ':location': 'CA#Sunnyvale',
            },
         });
      });

      it('Should retrieve all results with matching pk and category', async () => {
         // arrange
         mockQueryResults = [
            {
               pk: 'CA#Sunnyvale',
               sk: 'restaurant#BUSID1',
               name: "Bob's Burgers",
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Black-Owned', 'LGBTQ-Owned'],
               keywords: ['Burgers', 'Salads'],
               stars: 4.5,
               shortDesc: "Bob's Burgers Description",
               numReviews: 30,
               verified: true,
               businessId: 'BUSID1',
               photo: 'BUSID1#COVERPHOTO',
            },
         ];
         querySpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockQueryResults }),
         });
         const event = {
            httpMethod: 'GET',
            queryStringParameters: {
               location: 'CA/Sunnyvale',
            },
            body: JSON.stringify({
               category: 'restaurant',
            }),
         };

         const expectedItems = [
            {
               name: "Bob's Burgers",
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Black-Owned', 'LGBTQ-Owned'],
               keywords: ['Burgers', 'Salads'],
               stars: 4.5,
               shortDesc: "Bob's Burgers Description",
               numReviews: 30,
               verified: true,
               businessId: 'BUSID1',
               photo: 'BUSID1#COVERPHOTO',
            },
         ];

         // act
         const result = await getSearchResultsHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            KeyConditionExpression:
               '#pk = :location AND begins_with(#sk, :cat)',
            ExpressionAttributeNames: {
               '#pk': 'pk',
               '#sk': 'sk',
            },
            ExpressionAttributeValues: {
               ':location': 'CA#Sunnyvale',
               ':cat': 'restaurant',
            },
         });
      });

      it('Should filter dynamoDB results by tag if provided', async () => {
         // arrange
         mockQueryResults = [
            {
               pk: 'CA#Sunnyvale',
               sk: 'restaurant#BUSID1',
               name: "Bob's Burgers",
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Black-Owned', 'LGBTQ-Owned'],
               keywords: ['Burgers', 'Salads'],
               stars: 4.5,
               shortDesc: "Bob's Burgers Description",
               numReviews: 30,
               verified: true,
               businessId: 'BUSID1',
               photo: 'BUSID1#COVERPHOTO',
            },
            {
               pk: 'CA#Sunnyvale',
               sk: 'restaurant#BUSID1',
               name: 'Koja Kitchen',
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Asian-Owned', 'LGBTQ-Owned'],
               keywords: ['Korean', 'Bulgolgi'],
               stars: 4.5,
               shortDesc: 'Koja Kitchen Description',
               numReviews: 30,
               verified: true,
               businessId: 'BUSID2',
               photo: 'BUSID2#COVERPHOTO',
            },
            {
               pk: 'CA#Sunnyvale',
               sk: 'restaurant#BUSID4',
               name: 'Santa Cruz Tacqueria',
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Latinx-Owned', 'LGBTQ-Owned'],
               keywords: ['Tacos', 'Chips'],
               stars: 4.5,
               shortDesc: 'Santa Cruz Tacqueria Description',
               numReviews: 30,
               verified: true,
               businessId: 'BUSID4',
               photo: 'BUSID4#COVERPHOTO',
            },
         ];
         querySpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockQueryResults }),
         });
         const event = {
            httpMethod: 'GET',
            queryStringParameters: {
               location: 'CA/Sunnyvale',
            },
            body: JSON.stringify({
               category: 'restaurant',
               tags: ['Asian-Owned', 'Latinx-Owned'],
            }),
         };

         const expectedItems = [
            {
               name: 'Koja Kitchen',
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Asian-Owned', 'LGBTQ-Owned'],
               keywords: ['Korean', 'Bulgolgi'],
               stars: 4.5,
               shortDesc: 'Koja Kitchen Description',
               numReviews: 30,
               verified: true,
               businessId: 'BUSID2',
               photo: 'BUSID2#COVERPHOTO',
            },
            {
               name: 'Santa Cruz Tacqueria',
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Latinx-Owned', 'LGBTQ-Owned'],
               keywords: ['Tacos', 'Chips'],
               stars: 4.5,
               shortDesc: 'Santa Cruz Tacqueria Description',
               numReviews: 30,
               verified: true,
               businessId: 'BUSID4',
               photo: 'BUSID4#COVERPHOTO',
            },
         ];

         // act
         const result = await getSearchResultsHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            KeyConditionExpression:
               '#pk = :location AND begins_with(#sk, :cat)',
            ExpressionAttributeNames: {
               '#pk': 'pk',
               '#sk': 'sk',
            },
            ExpressionAttributeValues: {
               ':location': 'CA#Sunnyvale',
               ':cat': 'restaurant',
            },
         });
      });

      it('Should filter dynamoDB results by keyword if provided', async () => {
         // arrange
         mockQueryResults = [
            {
               pk: 'CA#Sunnyvale',
               sk: 'restaurant#BUSID1',
               name: "Bob's Burgers",
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Black-Owned', 'LGBTQ-Owned'],
               keywords: ['Burgers', 'Salads'],
               stars: 4.5,
               shortDesc: "Bob's Burgers Description",
               numReviews: 30,
               verified: true,
               businessId: 'BUSID1',
               photo: 'BUSID1#COVERPHOTO',
            },
            {
               pk: 'CA#Sunnyvale',
               sk: 'restaurant#BUSID1',
               name: 'Koja Kitchen',
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Asian-Owned', 'LGBTQ-Owned'],
               keywords: ['Korean', 'Bulgolgi'],
               stars: 4.5,
               shortDesc: 'Koja Kitchen Description',
               numReviews: 30,
               verified: true,
               businessId: 'BUSID2',
               photo: 'BUSID2#COVERPHOTO',
            },
            {
               pk: 'CA#Sunnyvale',
               sk: 'restaurant#BUSID4',
               name: 'Santa Cruz Tacqueria',
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Latinx-Owned', 'LGBTQ-Owned'],
               keywords: ['Tacos', 'Chips'],
               stars: 4.5,
               shortDesc: 'Santa Cruz Tacqueria Description',
               numReviews: 30,
               verified: true,
               businessId: 'BUSID4',
               photo: 'BUSID4#COVERPHOTO',
            },
         ];
         querySpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockQueryResults }),
         });
         const event = {
            httpMethod: 'GET',
            queryStringParameters: {
               location: 'CA/Sunnyvale',
            },
            body: JSON.stringify({
               category: 'restaurant',
               keyword: 'Korean',
            }),
         };

         const expectedItems = [
            {
               name: 'Koja Kitchen',
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Asian-Owned', 'LGBTQ-Owned'],
               keywords: ['Korean', 'Bulgolgi'],
               stars: 4.5,
               shortDesc: 'Koja Kitchen Description',
               numReviews: 30,
               verified: true,
               businessId: 'BUSID2',
               photo: 'BUSID2#COVERPHOTO',
            },
         ];

         // act
         const result = await getSearchResultsHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            KeyConditionExpression:
               '#pk = :location AND begins_with(#sk, :cat)',
            ExpressionAttributeNames: {
               '#pk': 'pk',
               '#sk': 'sk',
            },
            ExpressionAttributeValues: {
               ':location': 'CA#Sunnyvale',
               ':cat': 'restaurant',
            },
         });
      });

      it('Should filter dynamoDB results by tag and keyword if both provided', async () => {
         // arrange
         mockQueryResults = [
            {
               pk: 'CA#Sunnyvale',
               sk: 'restaurant#BUSID1',
               name: "Bob's Burgers",
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Black-Owned', 'LGBTQ-Owned'],
               keywords: ['Burgers', 'Salads'],
               stars: 4.5,
               shortDesc: "Bob's Burgers Description",
               numReviews: 30,
               verified: true,
               businessId: 'BUSID1',
               photo: 'BUSID1#COVERPHOTO',
            },
            {
               pk: 'CA#Sunnyvale',
               sk: 'restaurant#BUSID1',
               name: 'Koja Kitchen',
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Asian-Owned', 'LGBTQ-Owned'],
               keywords: ['Korean', 'Bulgolgi'],
               stars: 4.5,
               shortDesc: 'Koja Kitchen Description',
               numReviews: 30,
               verified: true,
               businessId: 'BUSID2',
               photo: 'BUSID2#COVERPHOTO',
            },
            {
               pk: 'CA#Sunnyvale',
               sk: 'restaurant#BUSID4',
               name: 'Bon Chon',
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Latinx-Owned', 'LGBTQ-Owned'],
               keywords: ['Korean', 'Wings'],
               stars: 4.5,
               shortDesc: 'Bon Chon Description',
               numReviews: 30,
               verified: true,
               businessId: 'BUSID4',
               photo: 'BUSID4#COVERPHOTO',
            },
         ];
         querySpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockQueryResults }),
         });
         const event = {
            httpMethod: 'GET',
            queryStringParameters: {
               location: 'CA/Sunnyvale',
            },
            body: JSON.stringify({
               category: 'restaurant',
               tags: ['Asian-Owned'],
               keyword: 'Korean',
            }),
         };

         const expectedItems = [
            {
               name: 'Koja Kitchen',
               city: 'Sunnyvale',
               type: 'B&M',
               tags: ['Asian-Owned', 'LGBTQ-Owned'],
               keywords: ['Korean', 'Bulgolgi'],
               stars: 4.5,
               shortDesc: 'Koja Kitchen Description',
               numReviews: 30,
               verified: true,
               businessId: 'BUSID2',
               photo: 'BUSID2#COVERPHOTO',
            },
         ];

         // act
         const result = await getSearchResultsHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            KeyConditionExpression:
               '#pk = :location AND begins_with(#sk, :cat)',
            ExpressionAttributeNames: {
               '#pk': 'pk',
               '#sk': 'sk',
            },
            ExpressionAttributeValues: {
               ':location': 'CA#Sunnyvale',
               ':cat': 'restaurant',
            },
         });
      });
   });
});
