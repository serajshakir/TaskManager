// src/configurations/authStorage.js
const storeAuth = (val) => {
    localStorage.setItem("taskauth", JSON.stringify(val))  // "taskauth" for Task Manager
};

const getAuth = () => {
    const data = localStorage.getItem("taskauth");
    if (!data) return null;
    try {
        return JSON.parse(data);
    } catch {
        return null;
    }
};

const clearAuth = () => {
    localStorage.removeItem("taskauth");
};

export { storeAuth, getAuth, clearAuth };