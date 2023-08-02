import React, { useCallback } from "react";
import { Images } from '@approbado/lib/icons'
import { Field } from "react-final-form";
import { useDropzone } from "react-dropzone";
import IconButton from '@material-ui/core/IconButton';

const FileField = ({ name, ...props }) => (
    <Field name={name} {...props} component={FileFieldInput} />
);

function FileFieldInput({ input, dropZoneProps, className }) {
    const onDrop = useCallback(
        (files) => {
            input.onChange(files);
        },
        [input]
    );

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop,
        noDrag: true,
        accept: 'image/png,image/jpg',
        ...dropZoneProps
    });

    const files = acceptedFiles.map((file) => (
        <span key={file.path}>
            {file.path} - {file.size} bytes
        </span>
    ));

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <IconButton className={className}>
                <Images />
            </IconButton>
            {files}
        </div>
    );
}

export default FileField;
