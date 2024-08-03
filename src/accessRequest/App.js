
import './App.css';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { useEffect, useState } from 'react';
import ApiService from './Api';


function App() {
    const [enumValues, setEnumValues] = useState([]);
    const [systemKeys, setSystemKeys] = useState([]);
    const [moduleValues, setModuleValues] = useState([]);
    const [data, setData] = useState();
    const [rmsDetails, setRMSDetails] = useState({});
    const [typingTimeout, setTypingTimeout] = useState(null);


    useEffect(() => {
        ApiService.getSystems().then(({ enumNames, displayNames }) => {
            setSystemKeys(enumNames);
            setEnumValues(displayNames);
        });
    }, []);

    useEffect(() => {
        if (data && data.systemName && data.systemName.Systems) {
            ApiService.getModules(data.systemName.Systems).then((Systems) => {
                setModuleValues(Systems);
            });
        }
    }, [data?.systemName?.Systems]);

    useEffect(() => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        if (data && data.emailId) {
            const timeout = setTimeout(() => {
                // Check if the email format is valid
                const emailPattern = /^[^\s@]+@ofbusiness\.in$/;
                if (emailPattern.test(data.emailId)) {
                    ApiService.getRMS(data.emailId, null).then((result) => {
                        setRMSDetails(result);
                    });
                }
            }, 500); // Delay in milliseconds

            setTypingTimeout(timeout);
        }

        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [data?.emailId]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            rmsDetails: rmsDetails
        }));
    }, [rmsDetails]);


    const schema = {
        "title": "Access Request",
        "type": "object",
        "properties": {
            "emailId": {
                "title": "Email Id",
                "type": "string",
                "format": "email"
            },
            "approvingManager": {
                "type": "string",
                "title": "Take Approval From",
                "enum": [
                    "L1 Manager",
                    "L2 Manager"
                ]
            },
            "rmsDetails": {
                "title": "RMS Details",
                "type": "object",
                "properties": {
                    "department": {
                        "title": "Department",
                        "type": "string"
                    },
                    "subDepartment": {
                        "title": "Sub-Department",
                        "type": "string"
                    },
                    "reportingManager": {
                        "title": "Reporting Manager",
                        "type": "string",
                        "format": "email"
                    },
                }
            },
            "systemName": {
                "title": "Select Respective System",
                "$ref": "#/definitions/systemValue"
            },
            "modules": {
                "title": "Select Respective Modules",
                "$ref": "#/definitions/moduleValue"
            }
        },
        "definitions": {
            "systemValue": {
                "title": "Select System you want to access.",
                "type": "object",
                "properties": {
                    "Systems": {
                        "type": "string",
                        "enumNames": enumValues,
                        "enum": systemKeys,
                    }
                },
                "required": [
                    "Systems"
                ],
            },
            "moduleValue": {
                "title": "Select Modules you want to access.",
                "type": "object",
                "properties": {
                    "Modules": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": moduleValues
                        },
                        "uniqueItems": true
                    }
                },
                "required": [
                    "Modules"
                ],
            }
        }
    };

    const uiSchema = {
        "approvingManager": {
            "ui:widget": "radio",
            "ui:options": {
                "inline": true

            }
        },
        "Take Approval From": {
            "ui:widget": "radio",
            "ui:options": {
                "inline": true
            }
        },
        "systemName": {
            "Systems": {
                "ui:widget": "radio",
                "ui:options": {
                    "inline": true
                }
            },
            "moduleValue": {
                "ui:widget": "checkboxes",
                "ui:options": {
                    "inline": true
                }
            },
            "rmsDetails": {
                "ui:readonly": true
            }
        },

    };

    const onSubmit = () => {
        ApiService.submitForm(data)
    };

    const log = (type) => console.log.bind(console, type);

    return (
        <div className='Parent' >
            <Form
                schema={schema}
                uiSchema={uiSchema}
                formData={data}
                validator={validator}
                onChange={({ formData, errors }) => setData(formData)}
                onSubmit={onSubmit}
                onError={log('errors')}
            />
        </div >
    );
}

export default App;
