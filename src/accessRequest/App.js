
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
    "Reporting Manager Email Id": {
      "type": "string",
      "format": "email"
    },
    "Department": {
      "type": "string"
    },
    "Sub-Department": {
      "type": "string"
    },
    "conditional": {
        "title": "Need Access For",
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
            "enum": [
              "OASYS",
              "OXYZO",
              "SalesSystem",
              "ORION",
              "CERES",
              "OAGRIFARM (Loan)",
              "OCEAN",
              "PRISM",
              "OMAT",
              "OMAT - Finance"
              
            ],
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
                  "Enter names of module" : {
                    "type" : "string"
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
                        "Reciept",
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
                        "Reciept",
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
                      "Reciept",
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
                        "Reciept",
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
                    "type" : "array",
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
                    "type" : "array",
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
                  "SalesSystem Modules"
                ]
              }
            ]
          }
        }
      }
    }
//   "required": ["accessRequestFor", "emailId", "reportingManagerEmailId", "department", "subDepartment", "System"]
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
            "ui:widget": "checkboxes",
            "ui:options": {
                "inline": true
            }
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
                "inline": true
            }
            },             
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
