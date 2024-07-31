import './App.css';
// import Form from '@rjsf/core';
import Form from '@rjsf/mui';
// import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { useState } from 'react';


function App() {

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
            "Select Modules From Respective Systems": {
                "type": "object",
                "properties": {
                    "oasysModules": {
                        "type": "array",
                        "title": "OASYS Modules",
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
                    ,
                    "orionModules": {
                        "type": "array",
                        "title": "ORION Modules",
                        "items": {
                            "type": "string",
                            "enum": [
                                "Application",
                                "Collection",
                                "Contract Management",
                                "Finance - Disbursment",
                                "Security Instrument (LC, BG)",
                                "Finance - Invoice",
                                "Finance - Ledger",
                                "Finance - Penalty",
                                "Finance - Payment Request",
                                "Approvals - Adhoc",
                                "Approvals - Insurance",
                                "Other"
                            ]
                        },
                        "uniqueItems": true
                    },
                    "salesSystemModules": {
                        "type": "array",
                        "title": "Sales System Modules",
                        "items": {
                            "type": "string",
                            "enum": [
                                "Lead",
                                "Collection",
                                "Disbursal Status",
                                "Interest Collection",
                                "Check In/ Check Out",
                                "Other"
                            ]
                        },
                        "uniqueItems": true
                    },
                    "oceanModules": {
                        "type": "array",
                        "title": "OCEAN Modules",
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
            }
        }
    };

    const uiSchema = {
        "Select Modules From Respective Systems": {
            "oceanModules": {
                "ui:widgets" : "checkboxes"
            }
        },
        "RMS Details": {
            "ui:readonly": true
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
