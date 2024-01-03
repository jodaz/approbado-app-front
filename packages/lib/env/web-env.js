export const WEB_ENV = {
    AUTH_TOKEN: `${import.meta.env.VITE_APP_AUTH_TOKEN_NAME}`,
    PERMISSIONS: `${import.meta.env.VITE_APP_PERMISSIONS_NAME}`,
    REDIRECT_TO: `${import.meta.env.VITE_APP_LOCATION}`,
    API: `${import.meta.env.VITE_APP_API_DOMAIN}`,
    SOURCE: `${import.meta.env.VITE_APP_API_DOMAIN}`,
    USER: `${import.meta.env.VITE_APP_AUTH_USER_INFO}`,
    NAME: `${import.meta.env.VITE_APP_NAME}` // Nombre de la app (Cliente, Admin)
}
