import GoogleLogin from 'react-google-login';
import GoogleIcon from "@approbado/lib/icons/GoogleIcon.svg";
import { useHistory } from 'react-router-dom'
import { useFormAuthDispatch } from '@approbado/lib/hooks/useFormAuth'
import { apiProvider } from '@approbado/lib/api';

const GoogleLoginButton = ({ className }) => {
    const history = useHistory()
    const { set } = useFormAuthDispatch();

    const processResponse = response => {
        const { name, email, googleId } = response.profileObj;

        return apiProvider.post(`/auth/external`, {
            email: email,
            provider: 'google',
            key: googleId
        })
            .then(res => {
                const { token } = res.data;

                window.location.href =
                    `${process.env.REACT_APP_LOCATION}/auth?token=${token}`;
            }).catch(err => {
                if (err.response.status === 422) {
                    set({
                        email: email,
                        provider: 'google',
                        key: googleId,
                        names: name
                    })

                    return history.push('/register');
                }
            });
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID}
            render={renderProps => (
                <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className={className}
                >
                    <img src={GoogleIcon} style={{ marginRight: '0.5rem' }} />
                    Google
                </button>
            )}
            onSuccess={processResponse}
            onFailure={processResponse}
            cookiePolicy={'single_host_origin'}
            type="button"
        />
    )
}

export default GoogleLoginButton
