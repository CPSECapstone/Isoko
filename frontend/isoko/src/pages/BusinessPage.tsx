import React from 'react';
import Business from '../components/business/Business';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const BusinessPage: React.FC = () => {
   const { businessId } = useParams();

   const businessStore = useAppSelector((store) => store.business);
   const businessDetails = businessStore.businesses[businessId];
   const profileDetails = useAppSelector((store) => store.profile);

   return (
      <main>
         <Business
            showInPreview={true}
            businessDetails={businessDetails}
            loading={businessStore.status === 'loading'}
            profileDetails={profileDetails}
         />
      </main>
   );
};

export default BusinessPage;
