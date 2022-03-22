import React, { memo, useCallback } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormHelperText from "@mui/material/FormHelperText";


interface PropsTextArea {
    name: string,
    error?: string,
    onHandleChange: (inputKey: string, value: string) => void,
    inputKey:string
}

const TextArea: React.FC<PropsTextArea> = ({ name, inputKey, error, onHandleChange }) => {

    const inputHandleChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            let value = event.target.value;
            onHandleChange(inputKey, value);
        },
        [onHandleChange, inputKey]
    );

    return (
        <div>
            <TextareaAutosize
                aria-label={name}
                minRows={8}
                placeholder={name}
                style={{ width: 350 }}
                onChange={(e) => inputHandleChange(e)}
            />
            {error && (
                <FormHelperText error id="filled-weight-helper-text">
                    {error}
                </FormHelperText>
            )}
        </div>
    );
}

export default memo(TextArea);