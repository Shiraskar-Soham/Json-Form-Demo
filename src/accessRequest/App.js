
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
    const [showOtherInput, setShowOtherInput] = useState(false);


    useEffect(() => {
        ApiService.getSystems().then(({ enumNames, displayNames }) => {
            setSystemKeys(enumNames);
            setEnumValues(displayNames);
        });
    }, []);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            modules: []
        }));
        if (data && data.systemName && data.systemName.Systems) {
            ApiService.getModules(data.systemName.Systems).then((Systems) => {
                setModuleValues(Systems);
            });
        }
    }, [data?.systemName?.Systems]);

    useEffect(() => {
        if (data && data.emailId && data.approvingManager) {
            const emailPattern = /^[^\s@]+@ofbusiness\.in$/;
            if (emailPattern.test(data.emailId)) {
                ApiService.getRMS(data.emailId, data.approvingManager).then((result) => {
                    setRMSDetails(result);
                });
            }
        }
    }, [data?.emailId, data?.approvingManager]);

    useEffect(() => {
        if (data && data.modules && data.modules.Modules && data.modules.Modules.includes("Other")) {
            setShowOtherInput(true);
        } else {
            setShowOtherInput(false);
        }
    }, [data?.modules?.Modules]);

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
                "format": "email",
            },
            "approvingManager": {
                "type": "string",
                "title": "Take Approval From",
                "enum": [
                    "L1 Manager",
                    "L2 Manager"
                ],
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
                        "title": "Approving Manager",
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
            },
            "otherInput": {
                "type": "string",
                "title": "Please specify other modules"
            }

        },
        "required" : ["approvingManager", "emailId"],
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
                ]
            },
        }
    };

    const uiSchema = {
        "emailId": {
            "ui:options": {
                "conditional": {
                    "when": "approvingManager",
                    "equals": "L1 Manager"
                }
            }
        },
        "approvingManager": {
            "ui:options": {
                "inline": true
            }
        },
        "rmsDetails": {
            "ui:readonly": true
        },
        "Take Approval From": {
            "ui:widget": "radio",
            "ui:options": {
                "inline": true
            }
        },
        "systemName": {
            // "Systems": {
            //     "ui:widget": "radio",
            //     "ui:options": {
            //         "inline": true
            //     }
            // }
        },
        "modules": {
            // "Modules": {
            //     "ui:widget": "checkboxes",
            //     "ui:options": {
            //         "inline": true
            //     }
            // },
        },
        "otherInput": {
            "ui:widget": showOtherInput ? "text" : "hidden"
        }
    };

    const onSubmit = ({ formData }) => {
        ApiService.submitForm(formData)
            .then((responseData) => {
                // Show success alert
                const entryID = responseData;
                alert(`Form Submitted Successfully! Your request Id is  "${entryID}".`);

                setData({}); // Clears form data
            })
            .catch((error) => {
                console.error('Form submission failed:', error);
                // Show error alert
                alert('Form submission failed!');
            });
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
