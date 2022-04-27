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
         putSpy.mockReturnValue({
            promise: () => Promise.resolve({}),
         });

         const reviewBody = {
            reviewAuthor: 'Tester',
            authorUserName: 'testUser',
            authorProfilePicture: 's3bucket.com',
            stars: 4,
            reviewTitle: 'Great food!',
            description: 'Great food, great place!',
            pictures: ['image1.com'],
            ts: '1637019432',
            state: 'CA', 
            city: 'San Luis Obispo', 
            category: 'Restaurants',
         };

         const event = {
            httpMethod: 'POST',
            body: JSON.stringify(reviewBody),
            pathParameters: {
               businessId: 'testBusiness',
            },
         };

         // act
         await postReviewHandler(event);
         
         // assert
         expect(putSpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            Item: {
               pk: 'testBusiness',
               sk: `REVIEW#${reviewBody.ts}#${reviewBody.authorUserName}`,
               reviewAuthor: reviewBody.reviewAuthor,
               authorUserName: reviewBody.authorUserName,
               authorProfilePicture: reviewBody.authorProfilePicture,
               stars: reviewBody.stars,
               reviewTitle: reviewBody.reviewTitle,
               description: reviewBody.description,
               pictures: reviewBody.pictures,
               ts: reviewBody.ts,
               state: reviewBody.state, 
               city: reviewBody.city, 
               category: reviewBody.category,
            },
            ReturnValues: 'ALL_OLD'
         });
      });
   });
});
