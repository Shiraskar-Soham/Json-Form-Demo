import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './jsonforms/App';
//import App from './jsonschema-form/App'
import App from './accessRequest/App';
import App2 from './accessRequest/App2'
// import App from './leave/App'



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );  


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App2 />
    <App />
  </React.StrictMode>
);  