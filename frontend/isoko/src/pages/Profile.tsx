import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import SignOutButton from '../../src/components/SignOutButton';
import SingleImageUpload from '../components/imageUpload/singleImageUpoad';

interface PhotoProps extends React.HTMLProps<HTMLDivElement> {
   ownerPhoto?: string;
}

const Profile: React.FC<PhotoProps> = (props) => (
   <main>
      <NavbarComponent />
      <SignOutButton />
      <h1>User Profile</h1>
      <h1>Eric Koston</h1>
      <SingleImageUpload initialImage={props.ownerPhoto}></SingleImageUpload>
   </main>
);

export default Profile;
