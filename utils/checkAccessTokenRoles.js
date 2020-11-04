export const checkAccessTokenRoles = ({ accessToken, roleToValidate }) => {
    if (!accessToken) return false;
    try {
        const payload = accessToken.split(".")[1];
        const decodedPayload = atob(payload)
        const json = JSON.parse(decodedPayload);
        if (json.roles.includes(roleToValidate)) {
            return {hasAuthorization: true}
        } else return {
            hasAuthorization: false
        }
        
    } catch (e) {
        console.log(e)
        return {hasAuthorization: false};
    }
}