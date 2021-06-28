import React, {useImperativeHandle, useState} from "react";

interface Props {
    children: React.ReactNode;
    buttonLabel: string
}

const Toggleable = React.forwardRef<HTMLButtonElement, Props>((props: Props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    function toggleVisibility() {
        setVisible(!visible)
    }

    // @ts-ignore
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Hide</button>
            </div>
        </>
    )
})

export default Toggleable