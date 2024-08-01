const ApiService = {
    getSystems() {
        const url = `http://localhost:8082/api/v1/json/systems`;
        return fetch(url, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                const enumNames = Object.keys(data);
                return enumNames;
            })
            .catch((error) => {
                console.error('Error fetching systems:', error);
                return [];
            });
    },
    getSystemsNames() {
        const url = `http://localhost:8082/api/v1/json/systems`;
        return fetch(url, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                const displayNames = Object.values(data);
                return displayNames;
            })
            .catch((error) => {
                console.error('Error fetching systems:', error);
                return [];
            });
    },

    getModules(system) {
        const url = new URL(`http://localhost:8082/api/v1/json/modules`);
        url.search = new URLSearchParams({ system }).toString();

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
    }
};

export default ApiService;
