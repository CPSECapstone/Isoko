const { get400Response } = require('../util/response-utils');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const {
   GA_CREDENTIALS,
   GA_METRICS_START_DATE,
   GA_PROPERTY_ID,
} = require('../../constants');

/**
 * HTTP get method to get page views for a specified businessId. Returns a list
 * of date strings each representing a single page view for the business on a
 * given date. Date is in format of YYYYMMDD.
 */
exports.getBusinessPageViewsHandler = async (event) => {
   if (event.httpMethod !== 'GET') {
      return get400Response(
         `getBusinessPage only accept GET method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);
   const { businessId } = event.pathParameters;

   if (businessId == null) {
      return get400Response(
         `Missing query parameter 'businessId'. Request URL format: GET/business/${businessId}`
      );
   }

   const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: GA_CREDENTIALS,
   });

   let response;

   try {
      const pageViewByDatePromise = await analyticsDataClient.runReport({
         property: `properties/${GA_PROPERTY_ID}`,
         dateRanges: [
            {
               startDate: GA_METRICS_START_DATE,
               endDate: 'today',
            },
         ],
         dimensions: [
            {
               name: 'date',
            },
            {
               name: 'pagePath',
            },
         ],
         metrics: [
            {
               name: 'eventCount',
            },
         ],
         // Filter by all events for viewing a pagePath that ends in businessId
         // i.e. business/{businessId}
         dimensionFilter: {
            filter: {
               fieldName: 'pagePath',
               stringFilter: {
                  matchType: 'ENDS_WITH',
                  value: businessId,
               },
            },
         },
      });

      const uniquePageViewsPromise = analyticsDataClient.runReport({
         property: `properties/${GA_PROPERTY_ID}`,
         dateRanges: [
            {
               startDate: GA_METRICS_START_DATE,
               endDate: 'today',
            },
         ],
         dimensions: [
            {
               name: 'pagePath',
            },
         ],
         metrics: [
            {
               name: 'eventCount',
            },
            {
               name: 'eventCountPerUser',
            },
         ],
         // Filter by all events for viewing a pagePath that ends in businessId
         // i.e. business/{businessId}
         dimensionFilter: {
            filter: {
               fieldName: 'pagePath',
               stringFilter: {
                  matchType: 'ENDS_WITH',
                  value: businessId,
               },
            },
         },
      });

      const [pageViewsReportResponse, uniquePageViewReportResponse] =
         await Promise.all([pageViewByDatePromise, uniquePageViewsPromise]);

      const [pageViewsReport] = pageViewsReportResponse;
      const [uniquePageViewReport] = uniquePageViewReportResponse;

      console.log(pageViewsReport);

      console.log(uniquePageViewReport);

      const pageViewCountByDate = pageViewsReport.rows.map((row) => ({
         date: row.dimensionValues[0].value,
         couunt: row.metricValues[0].value,
      }));

      const totalPageViews = uniquePageViewReport.rows[0].metricValues[0].value;
      const pageViewsPerUser =
         uniquePageViewReport.rows[0].metricValues[1].value;
      const uniquePageViewers = totalPageViews / pageViewsPerUser;

      response = {
         statusCode: 200,
         body: JSON.stringify({
            uniquePageViewers,
            pageViewCountByDate,
            totalPageViews,
         }),
         headers: {
            'content-type': 'json',
            'access-control-allow-origin': '*',
         },
      };
   } catch (err) {
      response = get400Response(err.message);
   }

   console.info(
      `response from: ${event.path} statusCode: ${
         response.statusCode
      } body: ${JSON.stringify(response.body)}`
   );
   return response;
};
