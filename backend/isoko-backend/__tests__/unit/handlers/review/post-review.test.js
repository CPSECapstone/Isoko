const {
   postReviewHandler,
} = require('../../../../src/handlers/review/post-review.js');
const dynamodb = require('aws-sdk/clients/dynamodb');
const { BUSINESS_TABLE } = require('../../../../src/constants');

jest.mock('aws-sdk/clients/dynamodb');

describe('PostReviewHandler tests', () => {
   let putSpy;

   beforeAll(() => {
      putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
   });

   afterAll(() => {
      putSpy.mockRestore();
   });

   afterEach(() => {
      putSpy.mockReset();
   });

   describe('Invalid query param tests', () => {
      it('Should throw an error when wrong HTTP method is used', async () => {
         // arrange
         const event = {
            httpMethod: 'GET',
            pathParameters: {
               businessId: 'testBusiness',
            },
         };

         // act

         // assert
         await expect(async () => {
            await postReviewHandler(event);
         }).rejects.toThrowError();
      });

      it('Should throw an error when businessId path parameter is missing', async () => {
         // arrange
         const event = {
            httpMethod: 'POST',
         };

         // act

         // assert
         await expect(async () => {
            await postReviewHandler(event);
         }).rejects.toThrowError();
      });
   });

   describe('Failed put test', () => {
      it('Should return a 400 response when put throws an error', async () => {
         // arrange
         expectedItem = {
            statusCode: 400,
            body: { error: Error('Put failed') },
         };
         putSpy.mockImplementation(() => {
            throw new Error('Put failed');
         });

         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
               reviewAuthor: 'Tester',
            }),
            pathParameters: {
               businessId: 'testBusiness',
            },
         };

         // act
         const result = await postReviewHandler(event);

         // assert
         expect(result).toEqual(expectedItem);
      });
   });

   describe('Valid input tests', () => {
      it('Should post review with all parameters and return review details', async () => {
         // arrange
         mockPutResults = {
            pk: 'testBusiness',
            sk: 'REVIEW#1637019432#testUser',
            reviewAuthor: 'Tester',
            authorUserName: 'testUser',
            authorProfilePicture: 's3bucket.com',
            stars: 4,
            reviewTitle: 'Great food!',
            description: 'Great food, great place!',
            pictures: ['image1.com'],
            ts: 1637019432,
         };

         putSpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockPutResults }),
         });
         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
               reviewAuthor: 'Tester',
               authorUserName: 'testUser',
               authorProfilePicture: 's3bucket.com',
               stars: 4,
               reviewTitle: 'Great food!',
               description: 'Great food, great place!',
               pictures: ['image1.com'],
               ts: 1637019432,
            }),
            pathParameters: {
               businessId: 'testBusiness',
            },
         };

         const expectedItem = {
            reviewAuthor: 'Tester',
            authorUserName: 'testUser',
            authorProfilePicture: 's3bucket.com',
            stars: 4,
            reviewTitle: 'Great food!',
            description: 'Great food, great place!',
            pictures: ['image1.com'],
            ts: 1637019432,
         };

         // act
         const result = await postReviewHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItem);
         expect(putSpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            Item: {
               pk: 'testBusiness',
               sk: 'REVIEW#1637019432#testUser',
               reviewAuthor: 'Tester',
               authorUserName: 'testUser',
               authorProfilePicture: 's3bucket.com',
               stars: 4,
               reviewTitle: 'Great food!',
               description: 'Great food, great place!',
               pictures: ['image1.com'],
               ts: 1637019432,
            },
         });
      });

      it('Should post review with all optional parameters empty and return review details', async () => {
         // arrange
         mockPutResults = {
            pk: 'testBusiness',
            sk: 'REVIEW#1637019432#testUser',
            reviewAuthor: 'Tester',
            authorUserName: 'testUser',
            authorProfilePicture: '',
            stars: 4,
            reviewTitle: '',
            description: '',
            pictures: [],
            ts: 1637019432,
         };

         putSpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockPutResults }),
         });
         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
               reviewAuthor: 'Tester',
               authorUserName: 'testUser',
               stars: 4,
               ts: 1637019432,
            }),
            pathParameters: {
               businessId: 'testBusiness',
            },
         };

         const expectedItem = {
            reviewAuthor: 'Tester',
            authorUserName: 'testUser',
            authorProfilePicture: '',
            stars: 4,
            reviewTitle: '',
            description: '',
            pictures: [],
            ts: 1637019432,
         };

         // act
         const result = await postReviewHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItem);
         expect(putSpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            Item: {
               pk: 'testBusiness',
               sk: 'REVIEW#1637019432#testUser',
               reviewAuthor: 'Tester',
               authorUserName: 'testUser',
               authorProfilePicture: '',
               stars: 4,
               reviewTitle: '',
               description: '',
               pictures: [],
               ts: 1637019432,
            },
         });
      });
   });
});