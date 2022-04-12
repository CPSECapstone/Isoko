import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import SignOutButton from '../../src/components/SignOutButton';

const Profile: React.FC = () => (
   <main>
      <NavbarComponent />
      <SignOutButton />
      <h1>User Profile</h1>
   </main>
);

export default Profile;
