import './App.css';
// import Form from '@rjsf/core';
import Form from '@rjsf/mui';
// import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { useState } from 'react';


function App() {
  
  const schema = {
    "title": "Access Request Form",
    "type": "object",
    "required": [
      "sendersName",
      "supplierName",
      "subject",
      "supplier lms code url"
    ],
    "Request Access For": {
        "type": "string",
        "enum": [
          "Me",
          "Others"
        ]
      },
    "properties": {
      "password": {
        "type": "string",
        "title": "Password"
      },
      "lastName": {
        "type": "string",
        "title": "Last name"
      },
      "bio": {
        "type": "string",
        "title": "Bio"
      },
      "firstName": {
        "type": "string",
        "title": "First name"
      },
      "Nationality": {
        "type": "string",
        "enum": [
          "CH",
          "JP",
          "US",
          "RU",
          "IN",
          "Other"
        ]
      },
      "age": {
        "type": "integer",
        "title": "Age"
      }
    }
  };

  const uiSchema = {
    "ui:order": [
      "firstName",
      "lastName",
      "nationality",
      "*",
      "password"
    ],
    "age": {
      "ui:widget": "updown"
    },
    "bio": {
      "ui:widget": "textarea"
    },
    "password": {
      "ui:widget": "password"
    },
    // "nationality":{
    //   "ui:widget": "radio"
    // }
  };

  const initialData = {
    "firstName": "Soham",
    "lastName": "Shiraskar",
    "age": 21,
    "bio": "Bitsian Spirit",
    "password": "Hello"
  }

  const [data, setData] = useState(initialData);
  
  const log = (type) => console.log.bind(console, type);

  return (<div className='Parent'>
      <Form
    schema={schema}
    uiSchema={uiSchema}
    formData={data}
    validator={validator}
    onChange={({ data, errors }) => setData(data)}
    onSubmit={log('submitted')}
    onError={log('errors')}
  />
    </div>
  );
}

export default App;
