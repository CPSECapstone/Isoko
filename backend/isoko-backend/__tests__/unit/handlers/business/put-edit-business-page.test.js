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

    describe('Invalid query param tests', () => {
        it('Should throw an error when wrong HTTP method is used', async () => {
            // arrange
            const event = {
                httpMethod: 'GET',
                pathParameters: {
                    'businessId': 'BUS1'
                }
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

        it('Should throw an error when target field is restricted', async () => {
            // arrange
            const event = {
                httpMethod: 'PUT',
                pathParameters: {
                    'businessId': 'BUSID1'
                }, 
                body: JSON.stringify({
                    fieldName: 'pk', 
                    newVal: 'BUSID2'
                })
            };

            // act

            // assert
            await expect(async () => {
            await putEditBusinessPageHandler(event);
            }).rejects.toThrowError();
        });
    });
    describe('Valid input tests', () => {
        it('Should update value of target field', async () => {
            // arrange
            mockUpdateResults = 
            {
                name: "Bluth's Original Frozen Banana",
                city: 'Venice Beach', 
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                businessId: 'BUSID1',
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    ownerName: 'Maeby Funke', 
                    ownerPhone: '123-456-7890'
                },
                lister: 'George Michael Bluth'
            }; 

            updateSpy.mockReturnValue({
                promise: () => Promise.resolve({ Items: mockUpdateResults }),
             });

            const event = {
                httpMethod: 'PUT',
                pathParameters: {
                    'businessId': 'BUSID1'
                }, 
                body: JSON.stringify({
                    fieldName: 'city', 
                    newVal: 'Venice Beach'
                })
            };

            const expectedItems = {
                name: "Bluth's Original Frozen Banana",
                city: 'Venice Beach', 
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                businessId: 'BUSID1',
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    ownerName: 'Maeby Funke', 
                    ownerPhone: '123-456-7890'
                },
                lister: 'George Michael Bluth'
            }; 

            // act
            const result = await putEditBusinessPageHandler(event);

            // assert
            expect(result.body.results).toEqual(expectedItems);
            expect(updateSpy).toHaveBeenCalledWith({
               TableName: BUSINESS_TABLE,
               Key: {
                "businessId": 'BUSID1'
                }, 
               UpdateExpression: `set city = :x`,
               ExpressionAttributeValues: { 
                ":x": 'Venice Beach'
               },
               ReturnValues: "UPDATED_NEW"
            });
        }); 

        it('Should update value of complex target field', async () => {
            // arrange
            mockUpdateResults = 
            {
                name: "Bluth's Original Frozen Banana",
                city: 'Venice Beach', 
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                businessId: 'BUSID1',
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    ownerName: 'Lindsay Bluth', 
                    ownerPhone: '123-456-7890'
                },
                lister: 'George Michael Bluth'
            }; 

            updateSpy.mockReturnValue({
                promise: () => Promise.resolve({ Items: mockUpdateResults }),
             });

            const event = {
                httpMethod: 'PUT',
                pathParameters: {
                    'businessId': 'BUSID1'
                }, 
                body: JSON.stringify({
                    fieldName: 'aboutOwner.ownerName', 
                    newVal: 'Lindsay Bluth'
                })
            };

            const expectedItems = {
                name: "Bluth's Original Frozen Banana",
                city: 'Venice Beach', 
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                businessId: 'BUSID1',
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    ownerName: 'Lindsay Bluth', 
                    ownerPhone: '123-456-7890'
                },
                lister: 'George Michael Bluth'
            }; 

            // act
            const result = await putEditBusinessPageHandler(event);

            // assert
            expect(result.body.results).toEqual(expectedItems);
            expect(updateSpy).toHaveBeenCalledWith({
               TableName: BUSINESS_TABLE,
               Key: {
                "businessId": 'BUSID1'
                }, 
               UpdateExpression: `set aboutOwner.ownerName = :x`,
               ExpressionAttributeValues: { 
                ":x": 'Lindsay Bluth'
               },
               ReturnValues: "UPDATED_NEW"
            });
        }); 
    }); 
 }); 