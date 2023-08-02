import * as React from 'react'
import {
    Link,
    Linkedin,
    Twitter,
    Email,
    Profile,
    GraduationCap
} from '@approbado/lib/icons'
import ProfileContentItem from './ProfileContentItem';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import isEmpty from 'is-empty'

const AboutMe = ({ bio, email, profile }) => (
    <Grid container>
        <Grid item xs={12}>
            <ProfileContentItem
                title='Resumen'
                icon={<Profile />}
            >
                <Typography variant="subtitle1">
                    {bio ? bio : 'Parece que este usuario prefiere mantener un aire de misterio...'}
                </Typography>
            </ProfileContentItem>
        </Grid>
        <Grid container>
            <Grid item xs={12} sm={4}>
                <ProfileContentItem
                    title='Email'
                    icon={<Email />}
                >
                    <Typography variant="subtitle1">
                        {email}
                    </Typography>
                </ProfileContentItem>
            </Grid>
            {!isEmpty(profile) && (
                <>
                    <Grid item xs={12} sm={4}>
                        <ProfileContentItem
                            title='Ocupación'
                            icon={<GraduationCap />}
                        >
                            <Typography variant="subtitle1">
                                {(profile.ocupation) ? profile.ocupation : 'Ninguna'}
                            </Typography>
                        </ProfileContentItem>
                    </Grid>
                    <Grid item xs={12}>
                        {(profile.linkedin || profile.twitter) && (
                            <ProfileContentItem
                                title='Redes sociales'
                                icon={<Link />}
                            >
                                <Box width='70px' display='flex' justifyContent="space-between">
                                    {(profile.linkedin) && (
                                        <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank">
                                            <Linkedin />
                                        </a>
                                    )}
                                    {(profile.twitter) && (
                                        <a href={`https://twitter.com/${profile.twitter}`} target="_blank">
                                            <Twitter />
                                        </a>
                                    )}
                                </Box>
                            </ProfileContentItem>
                        )}
                    </Grid>
                </>
            )}
        </Grid>
    </Grid>
);

export default AboutMe;
