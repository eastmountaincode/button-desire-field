import { useState } from 'react'

function ButtonCreator({ onButtonTextChange }) {
    const [buttonText, setButtonText] = useState('click me')

    const handleTextChange = (e) => {
        const newText = e.target.value || 'click me'
        setButtonText(newText)
        onButtonTextChange?.(newText)
    }

    const handleSetButtonText = (e) => {
        const textInput = e.target.previousElementSibling
        textInput.value = ''
        setButtonText('click me')
        onButtonTextChange?.('click me')
    }

    return (
        <div className="p-2 flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <label>button text: </label>
                <input type="text" placeholder="enter button text" onChange={handleTextChange} />
                <button onClick={handleSetButtonText}>clear</button>
            </div>
            <div>
                <button className="whitespace-pre-wrap break-words max-w-full">{buttonText}</button>
            </div>
        </div>
    )
}

export default ButtonCreator;
