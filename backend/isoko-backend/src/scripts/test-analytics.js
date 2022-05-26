const { BetaAnalyticsDataClient } = require('@google-analytics/data');
process.env.GOOGLE_APPLICATION_CREDENTIALS =
   '../../isoko-analytics-862851deac41.json';

const analyticsDataClient = new BetaAnalyticsDataClient();

propertyId = '310596210';

async function runReport() {
   const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      dateRanges: [
         {
            startDate: '2020-03-31',
            endDate: 'today',
         },
      ],
      dimensions: [
         {
            name: 'city',
         },
      ],
      metrics: [
         {
            name: 'activeUsers',
         },
      ],
   });

   console.log('Report result:');
   console.log(response);
   response.rows.forEach((row) => {
      console.log(row.dimensionValues[0], row.metricValues[0]);
   });
}

runReport();
