const {
    postListBusinessHandler,
 } = require('../../../../src/handlers/business/post-list-business.js');
 const dynamodb = require('aws-sdk/clients/dynamodb');
 const { BUSINESS_TABLE } = require('../../../../src/constants');
 
 jest.mock('aws-sdk/clients/dynamodb');
 
 describe('PostListBusinessHandler tests', () => {
    let putSpy;
 
    beforeAll(() => {
       putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
    });
 
    afterAll(() => {
       putSpy.mockRestore();
    });

    describe('Invalid query param tests', () => {
        it('Should throw an error when wrong HTTP method is used', async () => {
            // arrange
            const event = {
            httpMethod: 'GET',
            };

            // act

            // assert
            await expect(async () => {
            await postListBusinessHandler(event);
            }).rejects.toThrowError();
        });
    }); 

    describe('Valid input tests', () => {
        it('Should post business info with all optional params included and return details', async () => {
            // arrange
            mockPutResults = 
            {
                // should this include pk/sk? 
                //pk: 'BUSID1',
                //sk: "There's always money in the banana stand.",
                name: "Bluth's Original Frozen Banana",
                city: 'Newport Beach',
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                shortDesc: "There's always money in the banana stand.",
                businessId: 'BUSID1',
                hours: {
                    mon: '11:00am - 11:00pm',
                    tues: '11:00am - 11:00pm',
                    weds: '11:00am - 11:00pm',
                    thurs: '11:00am - 11:00pm',
                    fri: '11:00am - 11:00pm',
                    sat: '12:00pm - 8:00pm',
                    sun:'closed'
                },
                links: {
                    'Menu': 'https://arresteddevelopment.fandom.com/wiki/Bluth%27s_Original_Frozen_Banana_Stand',
                },
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    owner: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
                    ownerName: 'Maeby Funke', 
                    ownerPhone: '123-456-7890', 
                    ownerDesc: 'Marry me!', 
                    photo: 'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c2/Season_1_Character_Promos_-_Maeby_F%C3%BCnke_02.jpeg/revision/latest/scale-to-width-down/300?cb=20120429230807',
                },
                lister: 'George Michael Bluth'
            }; 
            putSpy.mockReturnValue({
               promise: () => Promise.resolve({ Items: mockPutResults }),
            });
            const event = {
               httpMethod: 'POST',
               body: JSON.stringify({
                name: "Bluth's Original Frozen Banana",
                city: 'Newport Beach',
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                shortDesc: "There's always money in the banana stand.",
                businessId: 'BUSID1',
                hours: {
                    mon: '11:00am - 11:00pm',
                    tues: '11:00am - 11:00pm',
                    weds: '11:00am - 11:00pm',
                    thurs: '11:00am - 11:00pm',
                    fri: '11:00am - 11:00pm',
                    sat: '12:00pm - 8:00pm',
                    sun:'closed'
                },
                links: {
                    'Menu': 'https://arresteddevelopment.fandom.com/wiki/Bluth%27s_Original_Frozen_Banana_Stand',
                },
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    owner: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
                    ownerName: 'Maeby Funke', 
                    ownerPhone: '123-456-7890', 
                    ownerDesc: 'Marry me!', 
                    photo: 'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c2/Season_1_Character_Promos_-_Maeby_F%C3%BCnke_02.jpeg/revision/latest/scale-to-width-down/300?cb=20120429230807',
                },
                lister: 'George Michael Bluth'
               })
            };
   
            const expectedItems = {
                name: "Bluth's Original Frozen Banana",
                city: 'Newport Beach',
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                shortDesc: "There's always money in the banana stand.",
                businessId: 'BUSID1',
                hours: {
                    mon: '11:00am - 11:00pm',
                    tues: '11:00am - 11:00pm',
                    weds: '11:00am - 11:00pm',
                    thurs: '11:00am - 11:00pm',
                    fri: '11:00am - 11:00pm',
                    sat: '12:00pm - 8:00pm',
                    sun:'closed'
                },
                links: {
                    'Menu': 'https://arresteddevelopment.fandom.com/wiki/Bluth%27s_Original_Frozen_Banana_Stand',
                },
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    owner: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
                    ownerName: 'Maeby Funke', 
                    ownerPhone: '123-456-7890', 
                    ownerDesc: 'Marry me!', 
                    photo: 'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c2/Season_1_Character_Promos_-_Maeby_F%C3%BCnke_02.jpeg/revision/latest/scale-to-width-down/300?cb=20120429230807',
                },
                lister: 'George Michael Bluth'
            }; 
   
            // act
            const result = await postListBusinessHandler(event);
   
            // assert
            expect(result.body.results).toEqual(expectedItems);
            expect(putSpy).toHaveBeenCalledWith({
               TableName: BUSINESS_TABLE,
               Item: {
                name: "Bluth's Original Frozen Banana",
                city: 'Newport Beach',
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                shortDesc: "There's always money in the banana stand.",
                businessId: 'BUSID1',
                hours: {
                    mon: '11:00am - 11:00pm',
                    tues: '11:00am - 11:00pm',
                    weds: '11:00am - 11:00pm',
                    thurs: '11:00am - 11:00pm',
                    fri: '11:00am - 11:00pm',
                    sat: '12:00pm - 8:00pm',
                    sun:'closed'
                },
                links: {
                    'Menu': 'https://arresteddevelopment.fandom.com/wiki/Bluth%27s_Original_Frozen_Banana_Stand',
                },
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    owner: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
                    ownerName: 'Maeby Funke', 
                    ownerPhone: '123-456-7890', 
                    ownerDesc: 'Marry me!', 
                    photo: 'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c2/Season_1_Character_Promos_-_Maeby_F%C3%BCnke_02.jpeg/revision/latest/scale-to-width-down/300?cb=20120429230807',
                },
                lister: 'George Michael Bluth'
               }
            });
         });

         it('Should post business info from non-owner "List a Business" page and return details', async () => {
            // arrange
            mockPutResults = 
            {
                name: "Bluth's Original Frozen Banana",
                city: '', 
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                shortDesc: '', 
                businessId: 'BUSID1',
                hours: {}, 
                links: {}, 
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    owner: '', 
                    ownerName: 'Maeby Funke', 
                    ownerPhone: '123-456-7890', 
                    ownerDesc: '', 
                    photo: ''
                },
                lister: 'George Michael Bluth'
            }; 
            putSpy.mockReturnValue({
               promise: () => Promise.resolve({ Items: mockPutResults }),
            });
            const event = {
               httpMethod: 'POST',
               body: JSON.stringify({
                name: "Bluth's Original Frozen Banana",
                city: '', 
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                shortDesc: '', 
                businessId: 'BUSID1',
                hours: {}, 
                links: {}, 
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    owner: '',
                    ownerName: 'Maeby Funke', 
                    ownerPhone: '123-456-7890',
                    ownerDesc: '', 
                    photo: '', 
                },
                lister: 'George Michael Bluth'
               })
            };
   
            const expectedItems = {
                name: "Bluth's Original Frozen Banana",
                city: '', 
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                shortDesc: '',
                businessId: 'BUSID1',
                hours: {}, 
                links: {},
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    owner: '',
                    ownerName: 'Maeby Funke', 
                    ownerPhone: '123-456-7890',
                    ownerDesc: '', 
                    photo: ''
                },
                lister: 'George Michael Bluth'
            }; 
   
            // act
            const result = await postListBusinessHandler(event);
   
            // assert
            expect(result.body.results).toEqual(expectedItems);
            expect(putSpy).toHaveBeenCalledWith({
               TableName: BUSINESS_TABLE,
               Item: {
                name: "Bluth's Original Frozen Banana",
                city: '', 
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                shortDesc: '',
                businessId: 'BUSID1',
                hours: {}, 
                links: {},
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    owner: '',
                    ownerName: 'Maeby Funke', 
                    ownerPhone: '123-456-7890',
                    ownerDesc: '', 
                    photo: ''
                },
                lister: 'George Michael Bluth'
               }
            });
         });
    })
}); 