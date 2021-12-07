// Import all functions from get-all-items.js 
const lambda = require('../../../src/handlers/get-flag.js'); 
 

describe('Test getFlagHandler', () => { 
 
    it('should return ids', async () => { 
        // const items = [{ id: 'id1' }, { id: 'id2' }]; 
 
 
        const event = { 
            httpMethod: 'GET' 
        } 
 
        // Invoke helloFromLambdaHandler() 
        const result = await lambda.getFlagHandler(event); 

        const expectedResult  = {
            statusCode: 200,
            body: {...JSON.parse(event.body)}       
        };
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
