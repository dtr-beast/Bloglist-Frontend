import {ChangeEvent, useState} from "react";

// Hook for Form Inputs
export function useTextField(label: string, type = "text") {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [helperText, setHelperText] = useState('')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const reset = () => {
        setError(false)
        setHelperText('')
    }
    // Even though "secondary" is a color variant, TS only recognizes this as a string and not a type of color,
    // therefore, as "secondary" tells typescript it will remain "secondary" throughout execution
    // More Info: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#:~:text=In%20the%20above%20example%20req.method
    const color = "secondary" as "secondary"
    return {
        value,
        label,
        type,
        color,
        error,
        helperText,
        setError,
        setHelperText,
        onChange,
        reset
    }
}
