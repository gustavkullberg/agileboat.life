import jsonwebtoken from "jsonwebtoken";

export const authenticate = (accessToken) => {
    try {
        const payload = jsonwebtoken.verify(accessToken, process.env.JWT_SECRET ?? "lolsecret");
        return payload
    } catch (e) {
        console.log(e);
        return false;
    }
}