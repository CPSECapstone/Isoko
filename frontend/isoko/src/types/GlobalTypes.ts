export interface BusinessPreview {
   name: string;
   city: string;
   type: string;
   tags: Array<string>;
   keywords: Array<string>;
   rating: number;
   shortDesc: string;
   numReviews: number;
   verified: boolean;
   businessId: string;
   photo: string;
   zipCode: number;
}
