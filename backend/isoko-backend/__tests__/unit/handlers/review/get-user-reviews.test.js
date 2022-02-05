const {
   getUserReviewsHandler,
} = require('../../../../src/handlers/review/get-user-reviews.js');
const dynamodb = require('aws-sdk/clients/dynamodb');
const { BUSINESS_TABLE } = require('../../../../src/constants');

jest.mock('aws-sdk/clients/dynamodb');

describe('GetUserReviewsHandler tests', () => {
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

   describe('Invalid query param tests', () => {
      it('Should throw an error when wrong HTTP method is used', async () => {
         // arrange
         const event = {
            httpMethod: 'POST',
            pathParameters: {
               userSub: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
            },
         };

         // act

         // assert
         await expect(async () => {
            await getUserReviewsHandler(event);
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
            await getUserReviewsHandler(event);
         }).rejects.toThrowError();
      });
   });

   describe('Failed get test', () => {
      it('Should return a 400 response when put throws an error', async () => {
         // arrange
         expectedItem = {
            statusCode: 400,
            body: { error: Error('Get failed') },
         };
         querySpy.mockImplementation(() => {
            throw new Error('Get failed');
         });

         const event = {
            httpMethod: 'GET',
            pathParameters: {
               userSub: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
            },
         };

         // act
         const result = await getUserReviewsHandler(event);

         // assert
         expect(result).toEqual(expectedItem);
      });
   });

   describe('Valid input tests', () => {
      it('Should return an empty list for user who has not posted any reviews', async () => {
         //arrange
         mockQueryResults = {
            reviews: [],
         };

         querySpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockQueryResults }),
         });

         const event = {
            httpMethod: 'GET',
            pathParameters: {
               userSub: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
            },
         };

         const expectedItems = [];

         // act
         const result = await getUserReviewsHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            IndexName: 'reviews-index',
            KeyConditionExpression: '#r = :user',
            ExpressionAttributeNames: {
               '#r': 'reviewAuthor',
            },
            ExpressionAttributeValues: {
               ':user': '3bed9528-9d10-4f50-ab72-d19dad1b8698',
            },
         });
      });

      it('Should return a non-empty list for a user who has posted multiple reviews', async () => {
         //arrange
         mockQueryResults = {
            reviews: [
               {
                  reviewAuthor: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
                  authorUserName: 'Lucille Bluth',
                  authorProfilePicture: '',
                  stars: 1.2,
                  reviewTitle: 'Not worth the money',
                  description:
                     "It's one banana, Michael. What could it cost, $10?",
                  pictures: ['http://i.imgur.com/pq458qHh.jpg'],
                  ts: 2348769369,
               },
               {
                  reviewAuthor: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
                  authorUserName: 'Lucille Bluth',
                  authorProfilePicture: '',
                  stars: 0.7,
                  reviewTitle: 'Unclean',
                  description:
                     "If I wanted something your thumb touched, I'd eat the inside of your ear.",
                  pictures: [
                     'https://i.pinimg.com/originals/b0/6c/8e/b06c8e3e21816cdaea906f95a6f6a047.jpg',
                  ],
                  ts: 1642649369,
               },
            ],
         };

         querySpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockQueryResults }),
         });

         const event = {
            httpMethod: 'GET',
            pathParameters: {
               userSub: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
            },
         };

         const expectedItems = [
            {
               reviewAuthor: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
               authorUserName: 'Lucille Bluth',
               authorProfilePicture: '',
               stars: 1.2,
               reviewTitle: 'Not worth the money',
               description:
                  "It's one banana, Michael. What could it cost, $10?",
               pictures: ['http://i.imgur.com/pq458qHh.jpg'],
               ts: 2348769369,
            },
            {
               reviewAuthor: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
               authorUserName: 'Lucille Bluth',
               authorProfilePicture: '',
               stars: 0.7,
               reviewTitle: 'Unclean',
               description:
                  "If I wanted something your thumb touched, I'd eat the inside of your ear.",
               pictures: [
                  'https://i.pinimg.com/originals/b0/6c/8e/b06c8e3e21816cdaea906f95a6f6a047.jpg',
               ],
               ts: 1642649369,
            },
         ];

         // act
         const result = await getUserReviewsHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(querySpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            IndexName: 'reviews-index',
            KeyConditionExpression: '#r = :user',
            ExpressionAttributeNames: {
               '#r': 'reviewAuthor',
            },
            ExpressionAttributeValues: {
               ':user': '3bed9528-9d10-4f50-ab72-d19dad1b8698',
            },
         });
      });
   });
});
