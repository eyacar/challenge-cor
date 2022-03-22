import React, { useState, memo, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

interface SelectInputProps {
    name: string,
    options: string[],
    inputKey: string,
    initialValue: string | null,
    onHandleChange: (inputKey: string, value: string) => void,
    inputValue: string,
    error?: string,
}

const SelectInput: React.FC<SelectInputProps> = ({ name, options, onHandleChange, inputKey, inputValue, initialValue, error }) => {
    const [value, setValue] = useState<string | null>(initialValue || "");

    const handleOnChange = useCallback(
        (_, value) => {
            onHandleChange(inputKey, value);
        },
        [onHandleChange, inputKey]
    );

    return (
        <FormControl sx={{ m: 1, width: 290 }} variant="outlined">
            {initialValue ?
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => { setValue(newValue) }}
                    inputValue={inputValue}
                    onInputChange={handleOnChange}
                    id={`controllable-${name}`}
                    options={options}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label={name} />}
                />
                :
                <Autocomplete
                    inputValue={inputValue}
                    onInputChange={handleOnChange}
                    id={`controllable-${name}`}
                    options={options}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label={name} />}
                />
            }
            {error && (
                <FormHelperText error id="filled-weight-helper-text">
                    {error}
                </FormHelperText>
            )}
        </FormControl>

    );
}

export default memo(SelectInput);