const {
   postSearchResultsHandler,
} = require('../../../../src/handlers/business/post-search-results.js');
const dynamodb = require('aws-sdk/clients/dynamodb');
const { SEARCH_RESULTS_TABLE, ONLINE } = require('../../../../src/constants');

jest.mock('aws-sdk/clients/dynamodb');

describe('PostSearchResultsHandler tests', () => {
   let querySpy;

   beforeAll(() => {
      querySpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'query');
   });

   afterAll(() => {
      querySpy.mockRestore();
   });

   afterEach(() => {
      querySpy.mockReset();
   });

   describe('Invalid request tests', () => {
      it('Should return 400 response when invalid http method', async () => {
         // arrange
         const event = {
            httpMethod: 'GET',
         };

         // act
         const response = await postSearchResultsHandler(event);

         // assert
         expect(response.statusCode).toBe(400);
         expect(response.body.error).toContain('GET');
      });

      it('Should return 400 response when location is missing altogether', async () => {
         // arrange
         const event = {
            httpMethod: 'POST',
         };

         // act
         const response = await postSearchResultsHandler(event);

         // assert
         expect(response.statusCode).toBe(400);
         expect(response.body.error).toContain(
            'Invalid location parameter: undefined'
         );
      });

      it('Should throw an error when location is missing information', async () => {
         // arrange
         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
               location: 'CA',
            }),
         };

         // act
         const response = await postSearchResultsHandler(event);

         // assert
         expect(response.statusCode).toBe(400);
         expect(response.body.error).toContain(
            'Invalid location parameter: CA'
         );
      });

      it('Should throw an error when location has extra information', async () => {
         // arrange
         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
               location: 'CA#Sunnyvale#SantaClara',
            }),
         };

         // act
         const response = await postSearchResultsHandler(event);

         // assert
         expect(response.statusCode).toBe(400);
         expect(response.body.error).toContain(
            'Invalid location parameter: CA#Sunnyvale#SantaClara'
         );
      });
   });

   describe('Failed get test', () => {
      it('Should return a 400 response when get throws an error', async () => {
         // arrange
         const expectedItem = {
            statusCode: 400,
            body: { error: 'Get failed' },
         };
         querySpy.mockImplementation(() => {
            throw new Error('Get failed');
         });

         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
               location: 'CA#Sunnyvale',
            }),
         };

         // act
         const result = await postSearchResultsHandler(event);

         // assert
         expect(result).toEqual(expectedItem);
      });
   });

   describe('Valid Input ONLINE tests', () => {
      it('Should retrieve all ONLINE results with matching pk', async () => {
         // arrange
         mockQueryResults = [
            {
               pk: ONLINE,
               sk: 'restaurant#BUSID1',
               name: "Bob's Burgers",
               type: ONLINE,
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
               pk: ONLINE,
               sk: 'salon#BUSID2',
               name: "Tyler's Salon",
               type: ONLINE,
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
            httpMethod: 'POST',
            body: JSON.stringify({
               location: ONLINE,
            }),
         };

         const expectedItems = [
            {
               name: "Bob's Burgers",
               type: ONLINE,
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
               type: ONLINE,
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
         const result = await postSearchResultsHandler(event);
         const resultBody = JSON.parse(result.body);

         // assert
         expect(resultBody.online).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
            KeyConditionExpression: '#pk = :location',
            ExpressionAttributeNames: {
               '#pk': 'pk',
            },
            ExpressionAttributeValues: {
               ':location': ONLINE,
            },
         });
      });

      it('Should retrieve all ONLINE results with matching pk and category', async () => {
         // arrange
         mockQueryResults = [
            {
               pk: ONLINE,
               sk: 'restaurant#BUSID1',
               name: "Bob's Burgers",
               type: ONLINE,
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
            httpMethod: 'POST',
            body: JSON.stringify({
               category: 'restaurant',
               location: ONLINE,
            }),
         };

         const expectedItems = [
            {
               name: "Bob's Burgers",
               type: ONLINE,
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
         const result = await postSearchResultsHandler(event);
         const resultBody = JSON.parse(result.body);

         // assert
         expect(resultBody.online).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
            KeyConditionExpression:
               '#pk = :location AND begins_with(#sk, :cat)',
            ExpressionAttributeNames: {
               '#pk': 'pk',
               '#sk': 'sk',
            },
            ExpressionAttributeValues: {
               ':location': ONLINE,
               ':cat': 'restaurant',
            },
         });
      });

      it('Should filter ONLINE results by tag if provided', async () => {
         // arrange
         mockQueryResults = [
            {
               pk: ONLINE,
               sk: 'restaurant#BUSID1',
               name: "Bob's Burgers",
               type: ONLINE,
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
               pk: ONLINE,
               sk: 'restaurant#BUSID1',
               name: 'Koja Kitchen',
               type: ONLINE,
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
               pk: ONLINE,
               sk: 'restaurant#BUSID4',
               name: 'Santa Cruz Tacqueria',
               type: ONLINE,
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
            httpMethod: 'POST',
            body: JSON.stringify({
               category: 'restaurant',
               tags: ['Asian-Owned', 'Latinx-Owned'],
               location: ONLINE,
            }),
         };

         const expectedItems = [
            {
               name: 'Koja Kitchen',
               type: ONLINE,
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
               type: ONLINE,
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
         const result = await postSearchResultsHandler(event);
         const resultBody = JSON.parse(result.body);

         // assert
         expect(resultBody.online).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
            KeyConditionExpression:
               '#pk = :location AND begins_with(#sk, :cat)',
            ExpressionAttributeNames: {
               '#pk': 'pk',
               '#sk': 'sk',
            },
            ExpressionAttributeValues: {
               ':location': ONLINE,
               ':cat': 'restaurant',
            },
         });
      });

      it('Should filter ONLINE results by keyword if provided', async () => {
         // arrange
         mockQueryResults = [
            {
               pk: ONLINE,
               sk: 'restaurant#BUSID1',
               name: "Bob's Burgers",
               type: ONLINE,
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
               pk: ONLINE,
               sk: 'restaurant#BUSID1',
               name: 'Koja Kitchen',
               type: ONLINE,
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
               pk: ONLINE,
               sk: 'restaurant#BUSID4',
               name: 'Santa Cruz Tacqueria',
               type: ONLINE,
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
            httpMethod: 'POST',
            body: JSON.stringify({
               category: 'restaurant',
               keyword: 'Korean',
               location: ONLINE,
            }),
         };

         const expectedItems = [
            {
               name: 'Koja Kitchen',
               type: ONLINE,
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
         const result = await postSearchResultsHandler(event);
         const resultBody = JSON.parse(result.body);

         // assert
         expect(resultBody.online).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
            KeyConditionExpression:
               '#pk = :location AND begins_with(#sk, :cat)',
            ExpressionAttributeNames: {
               '#pk': 'pk',
               '#sk': 'sk',
            },
            ExpressionAttributeValues: {
               ':location': ONLINE,
               ':cat': 'restaurant',
            },
         });
      });

      it('Should filter ONLINE results by tag and keyword if both provided', async () => {
         // arrange
         mockQueryResults = [
            {
               pk: ONLINE,
               sk: 'restaurant#BUSID1',
               name: "Bob's Burgers",
               type: ONLINE,
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
               pk: ONLINE,
               sk: 'restaurant#BUSID1',
               name: 'Koja Kitchen',
               type: ONLINE,
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
               pk: ONLINE,
               sk: 'restaurant#BUSID4',
               name: 'Bon Chon',
               type: ONLINE,
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
            httpMethod: 'POST',
            body: JSON.stringify({
               category: 'restaurant',
               tags: ['Asian-Owned'],
               keyword: 'Korean',
               location: ONLINE,
            }),
         };

         const expectedItems = [
            {
               name: 'Koja Kitchen',
               type: ONLINE,
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
         const result = await postSearchResultsHandler(event);
         const resultBody = JSON.parse(result.body);

         // assert
         expect(resultBody.online).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
            KeyConditionExpression:
               '#pk = :location AND begins_with(#sk, :cat)',
            ExpressionAttributeNames: {
               '#pk': 'pk',
               '#sk': 'sk',
            },
            ExpressionAttributeValues: {
               ':location': ONLINE,
               ':cat': 'restaurant',
            },
         });
      });
   });

   describe('Valid Input B&M tests', () => {
      it('Should retrieve all B&M results with matching pk', async () => {
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
            httpMethod: 'POST',
            body: JSON.stringify({
               location: 'CA#Sunnyvale',
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
         const result = await postSearchResultsHandler(event);
         const resultBody = JSON.parse(result.body);

         // assert
         expect(resultBody.brickMortar).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
            KeyConditionExpression: '#pk = :location',
            ExpressionAttributeNames: {
               '#pk': 'pk',
            },
            ExpressionAttributeValues: {
               ':location': 'CA#Sunnyvale',
            },
         });
      });

      it('Should retrieve all B&M results with matching pk and category', async () => {
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
            httpMethod: 'POST',
            body: JSON.stringify({
               category: 'restaurant',
               location: 'CA#Sunnyvale',
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
         const result = await postSearchResultsHandler(event);
         const resultBody = JSON.parse(result.body);

         // assert
         expect(resultBody.brickMortar).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
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

      it('Should filter B&M results by tag if provided', async () => {
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
            httpMethod: 'POST',
            body: JSON.stringify({
               category: 'restaurant',
               tags: ['Asian-Owned', 'Latinx-Owned'],
               location: 'CA#Sunnyvale',
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
         const result = await postSearchResultsHandler(event);
         const resultBody = JSON.parse(result.body);

         // assert
         expect(resultBody.brickMortar).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
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

      it('Should filter B&M results by keyword if provided', async () => {
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
            httpMethod: 'POST',
            body: JSON.stringify({
               category: 'restaurant',
               keyword: 'Korean',
               location: 'CA#Sunnyvale',
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
         const result = await postSearchResultsHandler(event);
         const resultBody = JSON.parse(result.body);

         // assert
         expect(resultBody.brickMortar).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
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

      it('Should filter B&M results by tag and keyword if both provided', async () => {
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
            httpMethod: 'POST',
            body: JSON.stringify({
               category: 'restaurant',
               tags: ['Asian-Owned'],
               keyword: 'Korean',
               location: 'CA#Sunnyvale',
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
         const result = await postSearchResultsHandler(event);
         const resultBody = JSON.parse(result.body);

         // assert
         expect(resultBody.brickMortar).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
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

   // Now that both ONLINE and B&M functionality has been tested individually
   // test that both are fetched and put into the response simultaneously
   describe('Full functionality tests', () => {
      it('Should only return ONLINE results when location is ONLINE', async () => {
         // arrange
         mockQueryResults = [
            {
               pk: ONLINE,
               sk: 'restaurant#BUSID1',
               name: "Bob's Burgers",
               type: ONLINE,
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
               pk: ONLINE,
               sk: 'salon#BUSID2',
               name: "Tyler's Salon",
               type: ONLINE,
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
         querySpy.mockReturnValueOnce({
            promise: () => Promise.resolve({ Items: mockQueryResults }),
         });
         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
               location: ONLINE,
            }),
         };

         const expectedItems = [
            {
               name: "Bob's Burgers",
               type: ONLINE,
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
               type: ONLINE,
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
         const result = await postSearchResultsHandler(event);
         const resultBody = JSON.parse(result.body);

         // assert
         expect(resultBody.online).toEqual(expectedItems);
         expect(resultBody.brickMortar).toEqual([]);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
            KeyConditionExpression: '#pk = :location',
            ExpressionAttributeNames: {
               '#pk': 'pk',
            },
            ExpressionAttributeValues: {
               ':location': ONLINE,
            },
         });
         expect(querySpy).toHaveBeenCalledTimes(1);
      });

      it('Should only return both ONLINE and B&M results when location is not ONLINE', async () => {
         // arrange
         mockOnlineQueryResults = [
            {
               pk: ONLINE,
               sk: 'restaurant#BUSID1',
               name: "Bob's Burgers",
               type: ONLINE,
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
               pk: ONLINE,
               sk: 'salon#BUSID2',
               name: "Tyler's Salon",
               type: ONLINE,
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

         const mockBrickMortarQueryResults = [
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

         querySpy.mockReturnValueOnce({
            promise: () => Promise.resolve({ Items: mockOnlineQueryResults }),
         });

         querySpy.mockReturnValueOnce({
            promise: () =>
               Promise.resolve({ Items: mockBrickMortarQueryResults }),
         });

         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
               location: 'CA#Sunnyvale',
            }),
         };

         const expectedOnlinneItems = [
            {
               name: "Bob's Burgers",
               type: ONLINE,
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
               type: ONLINE,
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

         const expectedBrickMortarResults = [
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
         const result = await postSearchResultsHandler(event);
         const resultBody = JSON.parse(result.body);

         // assert
         expect(resultBody.online).toEqual(expectedOnlinneItems);
         expect(resultBody.brickMortar).toEqual(expectedBrickMortarResults);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
            KeyConditionExpression: '#pk = :location',
            ExpressionAttributeNames: {
               '#pk': 'pk',
            },
            ExpressionAttributeValues: {
               ':location': ONLINE,
            },
         });
         expect(querySpy).toHaveBeenCalledWith({
            TableName: SEARCH_RESULTS_TABLE,
            KeyConditionExpression: '#pk = :location',
            ExpressionAttributeNames: {
               '#pk': 'pk',
            },
            ExpressionAttributeValues: {
               ':location': 'CA#Sunnyvale',
            },
         });
         expect(querySpy).toHaveBeenCalledTimes(2);
      });
   });
});
