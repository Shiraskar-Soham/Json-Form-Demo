import './App.css';
// import { person } from '@jsonforms/examples';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';

function App() {
  // const schema = person.schema;
  // const uischema = person.uischema;
  // const initialData = person.data;
  const initialData = {
    "name": "Soham Shiraskar",
    "vegetarian": true,
    //"birthDate": "2021-12-11",
    "personalData": {
      "age": 21
    },
    "postalCode": "248006"
  };

  
  const schema = {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 3,
        "description": "Please enter your name"
      },
      "vegetarian": {
        "type": "boolean"
      },
      "birthDate": {
        "type": "string",
        "format": "date"
      },
      "nationality": {
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
      "personalData": {
        "type": "object",
        "properties": {
          "age": {
            "type": "integer",
            "description": "Please enter your age."
          },
          "height": {
            "type": "number"
          },
          "drivingSkill": {
            "type": "number",
            "maximum": 10,
            "minimum": 1,
            "default": 7
          }
        },
        "required": [
          "age",
          "height"
        ]
      },
      "occupation": {
        "type": "string"
      },
      "postalCode": {
        "type": "string",
        "maxLength": 5
      }
    },
    "required": [
      "occupation",
      "nationality"
    ]
  };
  
  const uischema = {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "HorizontalLayout",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/name"
          },
          {
            "type": "Control",
            "scope": "#/properties/personalData/properties/age"
          },
          {
            "type": "Control",
            "scope": "#/properties/birthDate"
          }
        ]
      },
      {
        "type": "Label",
        "text": "Additional Information"
      },
      {
        "type": "HorizontalLayout",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/personalData/properties/height"
          },
          {
            "type": "Control",
            "scope": "#/properties/nationality"
          },
          {
            "type": "Control",
            "scope": "#/properties/occupation",
            "suggestion": [
              "Accountant",
              "Engineer",
              "Freelancer",
              "Journalism",
              "Physician",
              "Student",
              "Teacher",
              "Other"
            ]
          }
        ]
      }
    ]
  };

  const log = (type) => console.log.bind(console, type);

  const [data, setData] = useState(initialData);
  return (<div className='Parent'>
    <div className='App'>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, errors }) => setData(data)}
        onSubmit={log('submitted')}
      />
    </div></div>
  );
}

export default App;
