import { useState } from 'react'

function ButtonCreator({ onButtonTextChange }) {
    const [buttonText, setButtonText] = useState('Click me')

    const handleTextChange = (e) => {
        const newText = e.target.value || 'Click me'
        setButtonText(newText)
        onButtonTextChange?.(newText)
    }

    const handleSetButtonText = (e) => {
        const textInput = e.target.previousElementSibling
        textInput.value = ''
        setButtonText('Click me')
        onButtonTextChange?.('Click me')
    }

    return (
        <div className="bg-orange-500 border-2 border-pink-500">
            <div>
                <label>Button text: </label>
                <input type="text" placeholder="Enter button text" onChange={handleTextChange} />
                <button onClick={handleSetButtonText}>Clear</button>
            </div>
            <div>
                <button>{buttonText}</button>
            </div>
        </div>
    )
}

export default ButtonCreator;
