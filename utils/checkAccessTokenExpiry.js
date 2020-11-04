export const checkAccessTokenExpiry = ({ accessToken }) => {
    if (!accessToken) return false;
    try {
        const payload = accessToken.split(".")[1];
        const decodedPayload = atob(payload)
        const json = JSON.parse(decodedPayload);
        const expiryTime = json.exp*1000;
        if (Date.now() < expiryTime) {
            return {isValid: true}
        } else return {
            isValid: false
        }
        
    } catch (e) {
        console.log(e)
        return { hasAuthorization: false };
    }
}