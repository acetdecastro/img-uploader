import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const apolloCache = new InMemoryCache();

const uploadLink = createUploadLink({
  uri: 'http://localhost:8080/graphql', // Apollo Server is served from port 4000
  headers: {
    'keep-alive': 'true',
  },
});

const client = new ApolloClient({
  cache: apolloCache,
  link: uploadLink,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
