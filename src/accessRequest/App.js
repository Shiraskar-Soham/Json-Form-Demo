
import './App.css';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { useEffect, useState } from 'react';
import ApiService from './Api';


function App() {
    const [enumValues, setEnumValues] = useState([]);

    useEffect(() => {
        ApiService.getSystems().then((systems) => {
            setEnumValues(systems);
        });
    }, []);

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
            }
        },
        "definitions": {
            "person": {
                "title": "Select modules you want to access.",
                "type": "object",
                "properties": {
                    "System": {
                        "type": "string",
                        "enum": enumValues,
                    }
                },
                "required": [
                    "System"
                ],
                "dependencies": {
                    "System": {
                        "oneOf": [
                            {
                                "properties": {
                                    "System": {
                                        "enum": [
                                            "Other"
                                        ]
                                    },
                                    "Enter names of module": {
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "properties": {
                                    "System": {
                                        "enum": [
                                            "OASYS"
                                        ]
                                    },
                                    "OASYS Modules": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "enum": [
                                                "RFQ",
                                                "Order",
                                                "Dispatch",
                                                "Shipment",
                                                "Invoice",
                                                "Supplier PO Verification",
                                                "Report",
                                                "Receipt",
                                                "Payment Request",
                                                "Ledger",
                                                "Voucher",
                                                "Invoice Verification",
                                                "Warehouse",
                                                "Supplier Verification",
                                                "Accounts - Supplier",
                                                "Accounts - LSP",
                                                "Accounts - Vendor",
                                                "Accounts - Agent",
                                                "Other"
                                            ]
                                        },
                                        "uniqueItems": true
                                    }
                                },
                                "required": [
                                    "OASYS Modules"
                                ]
                            },
                            {
                                "properties": {
                                    "System": {
                                        "enum": [
                                            "OCEAN"
                                        ]
                                    },
                                    "OCEAN Modules": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "enum": [
                                                "RFQ",
                                                "Order",
                                                "Dispatch",
                                                "Shipment",
                                                "Invoice",
                                                "Supplier PO Verification",
                                                "Report",
                                                "Receipt",
                                                "Payment Request",
                                                "Ledger",
                                                "Voucher",
                                                "Invoice Verification",
                                                "Warehouse",
                                                "Supplier Verification",
                                                "Accounts - Supplier",
                                                "Accounts - LSP",
                                                "Accounts - Vendor",
                                                "Accounts - Agent",
                                                "Other"
                                            ]
                                        },
                                        "uniqueItems": true
                                    }
                                },
                                "required": [
                                    "OCEAN Modules"
                                ]
                            },
                            {
                                "properties": {
                                    "System": {
                                        "enum": [
                                            "CERES"
                                        ]
                                    },
                                    "CERES Modules": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "enum": [
                                                "RFQ",
                                                "Order",
                                                "Dispatch",
                                                "Shipment",
                                                "Invoice",
                                                "Supplier PO Verification",
                                                "Report",
                                                "Receipt",
                                                "Payment Request",
                                                "Ledger",
                                                "Voucher",
                                                "Invoice Verification",
                                                "Warehouse",
                                                "Supplier Verification",
                                                "Accounts - Supplier",
                                                "Accounts - LSP",
                                                "Accounts - Vendor",
                                                "Accounts - Agent",
                                                "Other"
                                            ]
                                        },
                                        "uniqueItems": true
                                    }
                                },
                                "required": [
                                    "CERES Modules"
                                ]
                            },
                            {
                                "properties": {
                                    "System": {
                                        "enum": [
                                            "OMAT"
                                        ]
                                    },
                                    "OMAT Modules": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "enum": [
                                                "RFQ",
                                                "Order",
                                                "Dispatch",
                                                "Shipment",
                                                "Invoice",
                                                "Supplier PO Verification",
                                                "Report",
                                                "Receipt",
                                                "Payment Request",
                                                "Ledger",
                                                "Voucher",
                                                "Invoice Verification",
                                                "Warehouse",
                                                "Supplier Verification",
                                                "Accounts - Supplier",
                                                "Accounts - LSP",
                                                "Accounts - Vendor",
                                                "Accounts - Agent",
                                                "Other"
                                            ]
                                        },
                                        "uniqueItems": true
                                    }
                                },
                                "required": [
                                    "OMAT Modules"
                                ]
                            },
                            {
                                "properties": {
                                    "System": {
                                        "enum": [
                                            "ORION"
                                        ]
                                    },
                                    "ORION Modules": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "enum": [
                                                "Module1",
                                                "Module2",
                                                "Module3",
                                                "Module4",
                                                "Other"
                                            ]
                                        },
                                        "uniqueItems": true
                                    }
                                },
                                "required": [
                                    "ORION Modules"
                                ]
                            },
                            {
                                "properties": {
                                    "System": {
                                        "enum": [
                                            "SalesSystem"
                                        ]
                                    },
                                    "SalesSystem Modules": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "enum": [
                                                "Lead",
                                                "Collection",
                                                "Disbursal Status",
                                                "Interest Collection",
                                                "Check In/ Check Out"
                                            ]
                                        },
                                        "uniqueItems": true
                                    },
                                    "other": { "type": "string" }

                                },
                                "required": [
                                    "SalesSystem Modules"
                                ]
                            }
                        ]
                    }
                }
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
            "System": {
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
        "RMS Details": {
            "ui:readonly": true
          },

    };

    const [data, setData] = useState();

    const log = (type) => console.log.bind(console, type);

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
