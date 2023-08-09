import { Avatar as MuiAvatar } from '@material-ui/core'
import CONFIG_NAMES from "../configs"

const Avatar = ({ source, alt, ...restProps }) => (
    <MuiAvatar
        src={`${CONFIG_NAMES.SOURCE}/${source}`}
        alt={alt}
        {...restProps}
    />
)

export default Avatar
