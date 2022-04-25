import React from 'react';
import { Business } from '../../types/GlobalTypes';
import ListBusiness from '../ListBusiness';

interface updateInfoProps extends React.HTMLProps<HTMLDivElement> {
   setActiveComponent: (text: string) => void;
   businessDetails: Business;
}
const UpdateInfo: React.FC<updateInfoProps> = (props) => {
   const { businessDetails } = props;

   return (
      <main>
         <ListBusiness
            name={businessDetails.name}
            city={businessDetails.city}
            state={businessDetails.state}
            street={businessDetails.street}
            zip={businessDetails.zip}
            ownerName={businessDetails.aboutOwner.ownerName}
            ownerDesc={businessDetails.aboutOwner.ownerDesc}
            ownerPhone={businessDetails.aboutOwner.ownerPhone}
            hours={businessDetails.hours}
            links={Object.keys(businessDetails.links || {}).map((linkName) => ({
               title: linkName,
               link: businessDetails.links[linkName],
            }))}
            description={businessDetails.shortDesc}
            stars={businessDetails.rating}
            minorityTags={businessDetails.tags}
            category={businessDetails.category}
            keywordTags={businessDetails.keywords}
            verified={businessDetails.claimed}
            numReviews={businessDetails.numReviews}
            setActiveComponent={props.setActiveComponent}
         />
      </main>
   );
};

export default UpdateInfo;
