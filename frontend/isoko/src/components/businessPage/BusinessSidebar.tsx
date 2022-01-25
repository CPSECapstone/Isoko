import React from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faClock,
   faMapMarkerAlt,
   faLink,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface SidebarContainerProps {
   width?: string;
}

const SidebarContainer = styled.div<SidebarContainerProps>`
   width: ${(props) => (props.width ? props.width : '300px')};
   background-color: #fefefe;
   box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.11);
   border-radius: 5px;
   padding: 15px;
   text-align: left;
`;

const ClaimBusinessButton = styled(StyledButton)`
   width: 100%;
   border-radius: 5px;
`;

const SizedP = styled.p`
   margin-top: 5px;
   margin-bottom: 5px;
`;

const SizedH2 = styled.h2`
   margin-top: 10px;
   margin-bottom: 10px;
`;

interface StyledLabelProps extends React.HTMLProps<HTMLDivElement> {
   size: number;
}

const StyledLabel = styled.span<StyledLabelProps>`
   width: ${(props) => props.size}px;
   display: inline-block;
   font-weight: 600;
`;

export enum Day {
   Mon = 'Mon',
   Tue = 'Tue',
   Wed = 'Wed',
   Thu = 'Thu',
   Fri = 'Fri',
   Sat = 'Sat',
   Sun = 'Sun',
}

interface Hours {
   [Day.Mon]?: string;
   [Day.Tue]?: string;
   [Day.Wed]?: string;
   [Day.Thu]?: string;
   [Day.Fri]?: string;
   [Day.Sat]?: string;
   [Day.Sun]?: string;
}

interface HoursProps extends React.HTMLProps<HTMLDivElement> {
   hours: Hours;
}

interface AddressProps extends React.HTMLProps<HTMLDivElement> {
   address: string;
}

interface Link {
   title: string;
   link: string;
}

interface LinkProps extends React.HTMLProps<HTMLDivElement> {
   links: Link[];
}

interface BusinessSidebarProps extends React.HTMLProps<HTMLDivElement> {
   hours?: Hours;
   address?: string;
   links?: Link[];
   claimed: boolean;
}

const HoursSection = (props: HoursProps) => {
   const days: Day[] = [
      Day.Mon,
      Day.Tue,
      Day.Wed,
      Day.Thu,
      Day.Fri,
      Day.Sat,
      Day.Sun,
   ];

   return (
      <div>
         <SizedH2>
            <FontAwesomeIcon icon={faClock} color="#F97D0B" /> Hours
         </SizedH2>
         {days.map((day) => (
            <SizedP key={day}>
               <StyledLabel size={30}>{day}</StyledLabel>
               {props.hours[day] ? props.hours[day] : 'Closed'}
            </SizedP>
         ))}
      </div>
   );
};

const AddressSection = (props: AddressProps) => (
   <div>
      <SizedH2>
         <FontAwesomeIcon icon={faMapMarkerAlt} color="#F97D0B" /> Address
      </SizedH2>
      <a
         href={`https://maps.google.com/?q=${props.address}`}
         target="_blank"
         rel="noreferrer"
      >
         {props.address}
      </a>
   </div>
);

const LinkSection = (props: LinkProps) => (
   <div>
      <SizedH2>
         <FontAwesomeIcon icon={faLink} color="#F97D0B" /> Links
      </SizedH2>
      {props.links.map((link) => (
         <SizedP key={link.title}>
            <StyledLabel size={55}>{link.title}</StyledLabel>
            <a href={link.link} target="_blank" rel="noreferrer">
               {link.link}
            </a>
         </SizedP>
      ))}
   </div>
);

const ClaimBusinessSection = () => {
   const navigate = useNavigate();

   return (
      <div>
         <SizedH2>
            <span style={{ color: '#FD9E2E' }}>*</span> This business is
            unclaimed.
         </SizedH2>
         <p>
            If this is your business, claim it to make sure the info is accurate
            and/or add additional info
         </p>
         <ClaimBusinessButton
            primary
            onClick={() => {
               navigate('/claim');
            }}
         >
            Claim Bussiness
         </ClaimBusinessButton>
      </div>
   );
};

const BusinessSidebar = (props: BusinessSidebarProps) => {
   return (
      <SidebarContainer className={props.className}>
         {/* HOURS */}
         {props.hours ? <HoursSection hours={props.hours} /> : null}

         {/* ADDRESS */}
         {props.address ? <AddressSection address={props.address} /> : null}

         {/* LINKS */}
         {props.links ? <LinkSection links={props.links} /> : null}

         {/* CLAIMED BUSSINESS */}
         {props.claimed ? null : <ClaimBusinessSection />}
      </SidebarContainer>
   );
};

export default BusinessSidebar;
