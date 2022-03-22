import { memo, useCallback } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

interface InputProps {
    inputName: string,
    inputKey: string,
    onHandleChange: (inputKey: string, value: string) => void,
    inputValue: string,
    error?: string
}

const GenericInput: React.FC<InputProps> = memo(
    ({ onHandleChange, inputName, inputValue, inputKey, error }) => {

        const inputHandleChange = useCallback(
            (event) => {
                let value = event.target.value;
                onHandleChange(inputKey, value);
            },
            [onHandleChange, inputKey]
        );

        const isError = Boolean(error);

        return (
            <FormControl sx={{ m: 1, width: 290 }} variant="outlined">
                <InputLabel error={isError} htmlFor={`outlined-${inputName}`}>
                    {inputName}
                </InputLabel>
                <OutlinedInput
                    id={`outlined-${inputName}`}
                    name={inputName}
                    label={inputName}
                    value={inputValue}
                    onChange={inputHandleChange}
                    error={isError}
                />
                {isError && (
                    <FormHelperText error id="filled-weight-helper-text">
                        {error}
                    </FormHelperText>
                )}
            </FormControl>
        );
    }
);

export default GenericInput;
