const CONFIG_NAMES = {
    AUTH_TOKEN: `${process.env.REACT_APP_AUTH_TOKEN_NAME}`,
    PERMISSIONS: `${process.env.REACT_APP_PERMISSIONS_NAME}`,
    REDIRECT_TO: `${process.env.REACT_APP_LOCATION}`,
    SOURCE: `${process.env.REACT_APP_API_DOMAIN}`,
    USER: `${process.env.REACT_APP_AUTH_USER_INFO}`,
    NAME: `${process.env.REACT_APP_NAME}` // Nombre de la app (Cliente, Admin)
}

export default CONFIG_NAMES
