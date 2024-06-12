export const storageConstants = {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
};

export const LocalStorage = (function () {
    function _setToken(accessToken) {
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }
    }

    function _setRole(role) {
        if (role) {
            localStorage.setItem("role", role);
        }
    }

    function _setRefreshToken(refreshToken) {
        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        }
    }

    function _getAccessToken() {
        return localStorage.getItem("accessToken");
    }

    function _getRefreshToken() {
        return localStorage.getItem("refreshToken");
    }

    function _getRole() {
        return localStorage.getItem("role");
    }

    function _clearToken() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
    }

    return {
        setToken: _setToken,
        setRefreshToken: _setRefreshToken,
        getAccessToken: _getAccessToken,
        getRefreshToken: _getRefreshToken,
        clearToken: _clearToken,
        setRole: _setRole,
        getRole: _getRole,
    };
})();
