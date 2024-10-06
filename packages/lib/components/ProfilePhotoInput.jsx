import React from 'react';
import { Field } from 'react-final-form';
import MuiAvatar from '@material-ui/core/Avatar';
import Avatar from './Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useDropzone } from 'react-dropzone';
import { Camera } from '@approbado/lib/icons'

const useStyles = makeStyles(
  theme => ({
    dropZone: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      cursor: 'pointer',
      textAlign: 'center',
      color: theme.palette.getContrastText(theme.palette.background.default),
      border: `1px solid #B7B7B7`,
      borderRadius: '50%',
      '& > *': {
        marginRight: '0.5rem',
        marginLeft: '0.5rem'
      },
      height: '7.5rem',
      width: '7.5rem',
      transition: '0.5s',
      '&:hover': {
        opacity: '0.9'
      },
      zIndex: 10,
      position: 'relative',
      opacity: props => (props.disabled ? 0.7 : 1)
    },
    thumb: {
      width: 'inherit',
      height: 'inherit',
      zIndex: 0
    },
    img: {
      height: 'inherit',
      width: 'inherit'
    },
    icon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '1rem',
      height: '1rem',
      padding: '0.5rem',
      borderRadius: '50%',
      background: theme.palette.info.main,
      zIndex: 1000,
      position: 'absolute',
      bottom: 0,
      right: 0,
      border: '2px solid #fff',
      color: '#fff'
    }
  }),
  { name: 'RaProfilePhotoInput' }
);

const ProfilePhotoInput = (props) => {
    const {
        name,
        preview,
        accept,
        disabled
    } = props
    const classes = useStyles(props);

    const onDrop = (acceptedFiles, onChange) => {
        // Assuming only one file is accepted
        if (acceptedFiles.length > 0) {
            onChange(acceptedFiles[0]);
        }
    };

    const thumbs = () => (
        <Avatar
            alt="user_picture"
            className={classes.img}
            source={preview}
        />
    );

    return (
        <Field name={name}>
            {({ input }) => {
                const { onChange } = input;

                const { getRootProps, getInputProps } = useDropzone({
                    disabled: disabled,
                    onDrop: (acceptedFiles) => onDrop(acceptedFiles, onChange),
                    accept: accept, // Accept only image files
                });

                return (
                <div {...getRootProps()} className={classes.dropZone}>
                    <input {...getInputProps()} style={{ display: 'none' }} />
                    {input.value ? (
                    <div className={classes.thumb}>
                        <MuiAvatar
                        alt="Profile Preview"
                        src={URL.createObjectURL(input.value)}
                        className={classes.img}
                        />
                    </div>
                    ) : thumbs()}
                    <div className={classes.icon}>
                        <Camera />
                    </div>
                </div>
                );
            }}
        </Field>
    );
};

export default ProfilePhotoInput;
