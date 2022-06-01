export interface BusinessPreview {
   name: string;
   city: string;
   type: string;
   tags: Array<string>;
   keywords: Array<string>;
   stars: number;
   shortDesc: string;
   numReviews: number;
   verified: boolean;
   businessId: string;
   photo: string;
   zipCode: number;
   timestamp: number;
}

export enum Day {
   Mon = 'Mon',
   Tue = 'Tue',
   Wed = 'Wed',
   Thu = 'Thu',
   Fri = 'Fri',
   Sat = 'Sat',
   Sun = 'Sun',
}

export interface Hours {
   [Day.Mon]?: string;
   [Day.Tue]?: string;
   [Day.Wed]?: string;
   [Day.Thu]?: string;
   [Day.Fri]?: string;
   [Day.Sat]?: string;
   [Day.Sun]?: string;
}

export interface Review {
   reviewAuthor: string;
   city?: string;
   state?: string;
   authorUserName: string;
   authorProfilePicture: string;
   stars: number;
   reviewTitle?: string;
   description: string;
   pictures: Array<string>;
   ts: string;
}

export interface Business {
   name: string;
   city?: string;
   state?: string;
   street?: string;
   zip?: string;
   type: 'B&M' | 'Online';
   tags: Array<string>;
   keywords: Array<string>;
   category: string;
   stars: number;
   shortDesc: string;
   numReviews: number;
   verified: boolean;
   businessId: string;
   hours: Hours;
   links: {
      [key: string]: string;
   };
   aboutOwner?: {
      owner?: string;
      ownerName?: string;
      ownerPhone?: string;
      ownerDesc: string;
      photo: string;
   };
   reviews: Array<Review>;
   photos: Array<string>;
}

export interface User {
   userSub: string;
   name: string;
   email: string;
   profilePicture: string;
   businessOwner: boolean;
   businessId?: string;
}

export interface SearchResults {
   brickMortar: Array<BusinessPreview>;
   online: Array<BusinessPreview>;
}

export interface PageViewByDate {
   date: string;
   count: number;
}

export interface PageViewAnalytics {
   uniquePageViewers: number;
   pageViewCountByDate: Array<PageViewByDate>;
   totalPageViews: number;
}
