export const WEB_ENV = {
    AUTH_TOKEN: `${process.env.VITE_APP_AUTH_TOKEN_NAME}`,
    PERMISSIONS: `${process.env.VITE_APP_PERMISSIONS_NAME}`,
    REDIRECT_TO: `${process.env.VITE_APP_LOCATION}`,
    API: `${process.env.VITE_APP_API_DOMAIN}`,
    SOURCE: `${process.env.VITE_APP_SOURCE}`,
    USER: `${process.env.VITE_APP_AUTH_USER_INFO}`,
    NAME: `${process.env.VITE_APP_NAME}` // Nombre de la app (Cliente, Admin)
}
