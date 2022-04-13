import React, { useState, useEffect } from 'react';
import GlobalStyle from './styles/globalStyles';
import Business from './pages/Business';
import BusinessDash from './pages/BusinessDashboard/BusinessDash';
import Home from './pages/Home';
import ListBusiness from './pages/ListBusiness';
import Login from './pages/Authentication/Login';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import PasswordResetSuccess from './pages/Authentication/PasswordResetSuccess';
import ProtectedPage from './pages/ProtectedPage';
import ModDash from './pages/ModDash';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SignUp from './pages/Authentication/SignUp';
import EmailVerification from './pages/Authentication/EmailVerificationStep';
import StylesExample from './pages/StyleExample';
import { Routes, Route } from 'react-router-dom';
import AWS from 'aws-sdk';
import './App.css';
import ResetPassword from './pages/Authentication/ResetPassword';
import { useAppDispatch } from './app/hooks';
import { fetchProfileAsync } from '../src/features/profile/ProfileSlice';
import { store } from './app/store';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from './environment/environment';

const App: React.FC = () => {
   AWS.config.update({
      credentials: new AWS.CognitoIdentityCredentials({
         IdentityPoolId: 'us-west-2:7e6f6851-3cee-4edf-af12-50c3e00f365b',
      }),
      region: 'us-west-2',
   });

   const userPool = new CognitoUserPool({
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId,
   });

   const [isOwner, setIsOwner] = useState(false);
   const dispatch = useAppDispatch();

   useEffect(() => {
      // checks if user is a business owner
      const userSub = userPool.getCurrentUser().getUsername();
      dispatch(fetchProfileAsync(userSub));
      // TODO: this wont work until IS-73 is merged
      setIsOwner(store.getState().profile.businessOwner);
   }, []);

   return (
      <div className="App">
         <link
            href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500&family=Heebo:wght@300;400;500&family=Inter:wght@300;400;500&family=Open+Sans:wght@300;400;500&display=swap"
            rel="stylesheet"
         />
         <GlobalStyle />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="emailVerification" element={<EmailVerification />} />
            <Route path="login" element={<Login />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="resetPassword" element={<ResetPassword />} />
            <Route path="resetSuccess" element={<PasswordResetSuccess />} />
            <Route
               path="business"
               element={<Business showInPreview={true} />}
            />
            {isOwner ? (
               <Route path="businessDash" element={<BusinessDash />} />
            ) : (
               <Route path="businessDash" element={<ProtectedPage />}>
                  {' '}
               </Route>
            )}
            <Route path="listBusiness" element={<ListBusiness />} />
            <Route path="moddash" element={<ModDash />} />
            <Route path="profile" element={<Profile />} />
            <Route path="styles" element={<StylesExample />} />
         </Routes>
      </div>
   );
};

export default App;
