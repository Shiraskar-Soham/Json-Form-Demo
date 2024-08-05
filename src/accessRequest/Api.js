const ApiService = {
    getSystems() {
        const url = `http://localhost:8081/api/v1/json/systems`;
        return fetch(url, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                const enumNames = Object.keys(data);
                const displayNames = Object.values(data);
                return { enumNames, displayNames };
            })
            .catch((error) => {
                console.error('Error fetching systems:', error);
                return { enumNames: [], displayNames: [] };
            });
    },
    getModules(system_name) {
        const url = new URL(`http://localhost:8081/api/v1/json/modules`);
        url.search = new URLSearchParams({ system_name }).toString();

        return fetch(url, { method: 'GET' })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error fetching modules:', error);
                return [];
            });
    },
    getRMS(emailID, approvingManager) {
        const url = new URL(`http://localhost:8081/api/v1/json/getRMS`);
        url.search = new URLSearchParams({ emailID, approvingManager}).toString();

        return fetch(url, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                const rmsDetails = {
                    department: data['department'],
                    subDepartment: data['subDepartment'],
                    reportingManager: data['reportingManager']
                };
                return rmsDetails;
            })
            .catch((error) => {
                console.error('Error fetching RMS:', error);
                return { rmsDetails: [] };
            });

    },
    submitForm(data) {
        const formattedData = {
            emailId: data.emailId,
            department: data.rmsDetails.department,
            subDepartment: data.rmsDetails.subDepartment,
            approvingManager: data.rmsDetails.reportingManager,
            systemName: data.systemName.Systems,
            modules: data.modules.Modules,
            otherInput: data.otherInput
        };

        const url = new URL(`http://localhost:8081/api/v1/request/submit`);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedData)
        })
            .then((res) => res.json())
            .then((responseData) => {
                return responseData;
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                return { success: false, message: 'Error submitting form' };
            });
    }


};

export default ApiService;
