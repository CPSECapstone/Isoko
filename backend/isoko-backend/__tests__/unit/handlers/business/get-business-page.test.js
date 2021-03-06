const {
   getBusinessPageHandler,
} = require('../../../../src/handlers/business/get-business-page.js');
const dynamodb = require('aws-sdk/clients/dynamodb');
const { BUSINESS_TABLE } = require('../../../../src/constants');

jest.mock('aws-sdk/clients/dynamodb');

describe('GetBusinessPageHandler tests', () => {
   let getSpy;
   let querySpy;

   beforeAll(() => {
      getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get');
      querySpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'query');
   });

   afterAll(() => {
      getSpy.mockRestore();
      querySpy.mockRestore();
   });

   afterEach(() => {
      getSpy.mockReset();
      querySpy.mockReset();
   });

   describe('Invalid query param tests', () => {
      it('Should return 400 response when wrong HTTP method is used', async () => {
         // arrange
         const event = {
            httpMethod: 'POST',
            pathParameters: {
               businessId: '-664125567',
            },
         };

         // act
         const response = await getBusinessPageHandler(event);

         // assert
         expect(response.statusCode).toBe(400);
      });

      it('Should throw an error when path parameter is missing', async () => {
         // arrange
         const event = {
            httpMethod: 'GET',
         };

         // act

         // assert
         await expect(async () => {
            await getBusinessPageHandler(event);
         }).rejects.toThrowError();
      });
   });

   describe('Failed get test', () => {
      it('Should return a 400 response when get throws an error', async () => {
         // arrange
         expectedItem = {
            statusCode: 400,
            body: { error: 'Get failed' },
         };
         getSpy.mockImplementation(() => {
            throw new Error('Get failed');
         });

         const event = {
            httpMethod: 'GET',
            pathParameters: {
               businessId: '-664125567',
            },
         };

         // act
         const result = await getBusinessPageHandler(event);

         // assert
         expect(result).toEqual(expectedItem);
      });
   });

   describe('Valid input tests', () => {
      it('Should return business details associated with given businessId', async () => {
         // arrange
         mockGetResults = {
            pk: '-664125567',
            sk: 'INFO',
            name: "Bluth's Original Frozen Banana",
            city: 'Newport Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'B&M',
            tags: ['Women-Owned'],
            keywords: ['Desserts'],
            shortDesc: "There's always money in the banana stand.",
            businessId: '-664125567',
            hours: {
               mon: '11:00am - 11:00pm',
               tues: '11:00am - 11:00pm',
               weds: '11:00am - 11:00pm',
               thurs: '11:00am - 11:00pm',
               fri: '11:00am - 11:00pm',
               sat: '12:00pm - 8:00pm',
               sun: 'closed',
            },
            links: {
               Menu: 'https://arresteddevelopment.fandom.com/wiki/Bluth%27s_Original_Frozen_Banana_Stand',
            },
            aboutOwner: {
               owner: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
               ownerName: 'Maeby Funke',
               ownerPhone: '123-456-7890',
               ownerDesc: 'Marry me!',
               ownerPhoto:
                  'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c2/Season_1_Character_Promos_-_Maeby_F%C3%BCnke_02.jpeg/revision/latest/scale-to-width-down/300?cb=20120429230807',
            },
            photos: [
               'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c2/Season_1_Character_Promos_-_Maeby_F%C3%BCnke_02.jpeg/revision/latest/scale-to-width-down/300?cb=20120429230807',
            ],
         };

         (mockQueryResults = [
            {
               reviewAuthor: '594830c0-45b1-4b79-aad4-4bea4428d783',
               authorUserName: 'Lindsay Bluth',
               authorProfilePicture: '',
               rating: 3.5,
               reviewTitle: 'Bluth Bananas: average at best',
               description:
                  "It's fine if you like bananas I guess. Extra half star because owner is my daughter. ",
               pictures: [
                  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2008/1/11/0/EK0401_Chocolate_Banana_Pops.jpg.rend.hgtvcom.616.462.suffix/1371585707940.jpeg',
               ],
               ts: 1642649369,
            },
         ]),
            getSpy.mockReturnValue({
               promise: () => Promise.resolve({ Item: mockGetResults }),
            });
         querySpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockQueryResults }),
         });
         const event = {
            httpMethod: 'GET',
            pathParameters: {
               businessId: '-664125567',
            },
         };
         const expectedItems = {
            name: "Bluth's Original Frozen Banana",
            city: 'Newport Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'B&M',
            tags: ['Women-Owned'],
            keywords: ['Desserts'],
            shortDesc: "There's always money in the banana stand.",
            businessId: '-664125567',
            hours: {
               mon: '11:00am - 11:00pm',
               tues: '11:00am - 11:00pm',
               weds: '11:00am - 11:00pm',
               thurs: '11:00am - 11:00pm',
               fri: '11:00am - 11:00pm',
               sat: '12:00pm - 8:00pm',
               sun: 'closed',
            },
            links: {
               Menu: 'https://arresteddevelopment.fandom.com/wiki/Bluth%27s_Original_Frozen_Banana_Stand',
            },
            aboutOwner: {
               owner: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
               ownerName: 'Maeby Funke',
               ownerPhone: '123-456-7890',
               ownerDesc: 'Marry me!',
               ownerPhoto:
                  'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c2/Season_1_Character_Promos_-_Maeby_F%C3%BCnke_02.jpeg/revision/latest/scale-to-width-down/300?cb=20120429230807',
            },
            photos: [
               'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c2/Season_1_Character_Promos_-_Maeby_F%C3%BCnke_02.jpeg/revision/latest/scale-to-width-down/300?cb=20120429230807',
            ],
            reviews: [
               {
                  reviewAuthor: '594830c0-45b1-4b79-aad4-4bea4428d783',
                  authorUserName: 'Lindsay Bluth',
                  authorProfilePicture: '',
                  rating: 3.5,
                  reviewTitle: 'Bluth Bananas: average at best',
                  description:
                     "It's fine if you like bananas I guess. Extra half star because owner is my daughter. ",
                  pictures: [
                     'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2008/1/11/0/EK0401_Chocolate_Banana_Pops.jpg.rend.hgtvcom.616.462.suffix/1371585707940.jpeg',
                  ],
                  ts: 1642649369,
               },
            ],
         };

         // act
         const result = await getBusinessPageHandler(event);

         // assert
         expect(result.body).toEqual(JSON.stringify(expectedItems));
         expect(getSpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            Key: {
               pk: '-664125567',
               sk: 'INFO',
            },
         });
         expect(querySpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            KeyConditionExpression: 'pk = :id and begins_with(sk, :r)',
            ExpressionAttributeValues: {
               ':id': '-664125567',
               ':r': 'REVIEW',
            },
         });
      });
   });
});
