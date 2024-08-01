
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


    useEffect(() => {
        ApiService.getSystems().then((Systems) => {
            setSystemKeys(Systems);
        });
    }, []);

    useEffect(() => {
        ApiService.getSystemsNames().then((Systems) => {
            setEnumValues(Systems);
        });
    }, []);


    useEffect(() => {
        if (data && data.conditional && data.conditional.Systems) {
            ApiService.getModules(data.conditional.Systems).then((Systems) => {
                setModuleValues(Systems);
            });
        }
    }, [data]);
    

    const schema = {
        "title": "Access Request",
        "type": "object",
        "properties": {
            "Email Id": {
                "type": "string",
                "format": "email"
            },
            "RMS Details": {
                "type": "object",
                "properties": {
                    "Department": {
                        "type": "string"
                    },
                    "Sub-Department": {
                        "type": "string"
                    },
                    "Reporting Manager Email Id": {
                        "type": "string",
                        "format": "email"
                    },
                }
            },
            "conditional": {
                "title": "Select Respective System and Modules",
                "$ref": "#/definitions/person"
            },
            "conditional1": {
                "title": "Select Respective System and Modules",
                "$ref": "#/definitions/person1"
            }
        },
        "definitions": {
            "person": {
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
            "person1": {
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
    "Access Request For": {
        "ui:widget": "radio",
        "ui:options": {
            "inline": true
        }
    },
    "conditional": {
        "Systems": {
            "ui:widget": "radio",
            "ui:options": {
                "inline": true
            }
        },
        "OASYS Modules": {

        },
        "CERES Modules": {
            "ui:widget": "checkboxes",
            "ui:options": {
                "inline": true
            }
        },
        "OCEAN Modules": {
            "ui:widget": "checkboxes",
            "ui:options": {
                "inline": true
            }
        },
        "OMAT Modules": {
            "ui:widget": "checkboxes",
            "ui:options": {
                "inline": true
            }
        },
        "ORION Modules": {
            "ui:widget": "checkboxes",
            "ui:options": {
                "inline": true
            }
        },
        "SalesSystem Modules": {
            "ui:widget": "checkboxes",
            "ui:options": {
            }
        },
    },
    "conditional1": {
        "Modules": {
            "ui:widget": "checkboxes",
            "ui:options": {
                "inline": true
            }
        }
    },
    "RMS Details": {
        "ui:readonly": true
    },

};


const log = (type) => console.log.bind(console, type);

console.log(data);

return (
    <div className='Parent'>
        <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={data}
            validator={validator}
            onChange={({ formData, errors }) => setData(formData)}
            onSubmit={log('submitted')}
            onError={log('errors')}
        />
    </div>
);
}

export default App;
