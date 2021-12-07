import React from 'react';
import { mount } from '@cypress/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

it('renders learn react link', () => {
   mount(
      <Provider store={store}>
         <App />
      </Provider>
   );
   cy.get('a').contains('React');
});
