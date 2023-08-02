import { withStyles } from '@material-ui/core/styles';
import { ChatRight } from '@approbado/lib/icons'

const styles = {
    root: {
        marginRight: '0.5rem',
        fontSize: '1rem',
        color: 'inherit'
    }
};

const ReplyIcon = ({ classes }) => (
    <ChatRight className={classes.root} />
)

export default withStyles(styles)(ReplyIcon);
