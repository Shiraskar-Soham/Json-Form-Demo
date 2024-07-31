const ApiService = {
    getSystems() {
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
    }
};

export default ApiService;
