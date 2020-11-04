import { FacebookProvider, LoginButton } from 'react-facebook';
import { checkAccessTokenRoles } from "../utils/checkAccessTokenRoles"
import styles from '../styles/Login.module.css';

export const Login = ({ setIsAuthorized, setHasCaptainRole, reload }) => {
    return (
        <div>
            <FacebookProvider appId="485962199031939">
                <div className={styles.welcomeText}>
                    <h1 >Please choose login method</h1>
                </div>
                <div className={styles.buttonWrapper}>
                    <LoginButton className={styles.button}
                        scope="email"
                        onCompleted={res => {
                            fetch(
                                `/api/auth?loginType=facebook&faceBookToken=${res.tokenDetail.accessToken}&facebookProfilePicture=${res.profile.picture.data.url}`
                            )
                                .then(response => response.json())
                                .then(data => {
                                    localStorage.setItem('accessToken', data.accessToken);
                                    setIsAuthorized(true);
                                    const { hasAuthorization } = checkAccessTokenRoles({ accessToken: data.accessToken, roleToValidate: "captain" });
                                    if (hasAuthorization) {
                                        setHasCaptainRole(true);
                                        reload();
                                    } else {
                                        setHasCaptainRole(false);
                                    }
                                })
                                .catch(e => { console.log(e); alert('Login Failed ;/', e) });
                        }}
                        onError={err => console.log(err)}
                    >
                        <img className={styles.fbLogo} src="/fb_logo.png" ></img>
                        <h2>Login via Facebook</h2>
                    </LoginButton>
                </div>
            </FacebookProvider>
        </div>
    );
}
