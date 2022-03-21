import React, { useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface SelectInputProps{
    name:string,
    options:string[],
    initialValue: string | null,
    setChoice: React.Dispatch<React.SetStateAction<string | null>>
}

const SelectInput:React.FC<SelectInputProps> = ({ name, options, setChoice, initialValue }) => {
    const [value, setValue] = useState<string | null>(initialValue || "");
    const [inputValue, setInputValue] = useState('');

    return ( initialValue?
            <Autocomplete
                value={value}
                onChange={(_: any, newValue: string | null) => {
                    setChoice(newValue === ''? null : newValue);
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => {
                    setChoice(newInputValue === ''? null : newInputValue);
                    setInputValue(newInputValue);
                }}
                id={`controllable-${name}`}
                options={options}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label={name} />}
            />
            :
            <Autocomplete
            inputValue={value || ""}
            onInputChange={(_: any, newValue: string | null) => {
                setChoice(newValue === ''? null : newValue);
                setValue(newValue);
            }}
            id={`controllable-${name}`}
            options={options}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label={name} />}
        />
    );
}

export default SelectInput;