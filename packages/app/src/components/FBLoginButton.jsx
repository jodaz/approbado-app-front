import FacebookLogin from 'react-facebook-login'
import { ReactComponent as FacebookIcon } from "@approbado/lib/icons/FacebookIconOutline.svg"
import { useHistory } from 'react-router-dom'
import { useFormAuthDispatch } from '@approbado/lib/hooks/useFormAuth'
import { apiProvider } from '@approbado/lib/api'

const FBLoginButton = ({ className }) => {
    const history = useHistory()
    const { set } = useFormAuthDispatch();

    const processResponse = response => {
        const { name, email, userID } = response;

        return apiProvider.post(`/auth/external`, {
            email: email,
            provider: 'facebook',
            key: userID
        })
            .then(res => {
                const { token } = res.data;

                window.location.href =
                    `${process.env.REACT_APP_LOCATION}/auth?token=${token}`;
            }).catch(err => {
                if (err.response.status === 422) {
                    set({
                        email: email,
                        provider: 'facebook',
                        key: userID,
                        names: name
                    })

                    return history.push('/register');
                }
            });
    }

    return (
        <FacebookLogin
            appId={process.env.REACT_APP_FB_ID}
            autoload={true}
            fields='name,email'
            callback={processResponse}
            icon={<FacebookIcon style={{ marginRight: '0.5rem' }} />}
            textButton='Facebook'
            cssClass={className}
        />
    )
}

export default FBLoginButton
