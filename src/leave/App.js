import './App.css'
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { useState } from 'react';

function App() {
    const schema = {
        "title": "Leave Application",
        "type": "object",
        "properties": {
            "leaveId":{
                "title": "Leave Id",
                "type" : "string"
            },
            "empId": {
                "title": "Employee Id",
                "type": "string"
            },
            "reason": {
                "title": "Reason For Your Leave",
                "type": "string"
            },
            "startDate": {
                "title": "Select start date",
                "type": "string",
                "format": "date"
            },
            "endDate": {
                "title": "Se;lect end date",
                "type": "string",
                "format": "date"
            }

        }
    };
    const uiSchema = {
        "leaveId": {
            "ui:enableMarkdownInDescription": true,
            "ui:description": "In the format LxE10xxx"
        },
        "reason": {
            "ui:enableMarkdownInDescription": true,
            "ui:description": "Please mention your reason for the leave"
        },
        "startDate": {
            "ui:enableMarkdownInDescription": true,
            "ui:description": "*Select Leave Start Date*"
        },
        "endDate": {
            "ui:enableMarkdownInDescription": true,
            "ui:description": "*Select Leave End Date*"
        }
    };


    const [data, setData] = useState();

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