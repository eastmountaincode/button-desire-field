import { useState, useEffect } from 'react'

function InputTypeSelector({ onInputDataChange }) {
    const [inputType, setInputType] = useState('none')
    const [checkboxCount, setCheckboxCount] = useState(1)
    const [radioCount, setRadioCount] = useState(1)
    const [checkboxLabels, setCheckboxLabels] = useState(['Option 1'])
    const [radioLabels, setRadioLabels] = useState(['Option 1'])
    const [colorValue, setColorValue] = useState('#000000')
    const [dateValue, setDateValue] = useState('')
    const [rangeValue, setRangeValue] = useState(50)
    const [rangeStartLabel, setRangeStartLabel] = useState('')
    const [rangeEndLabel, setRangeEndLabel] = useState('')

    // Update parent whenever relevant data changes
    useEffect(() => {
        const inputData = {
            inputType: inputType,
            value: inputType === 'color' ? colorValue 
                 : inputType === 'date' ? dateValue 
                 : inputType === 'range' ? rangeValue
                 : undefined,
            rangeLabels: inputType === 'range' ? { start: rangeStartLabel, end: rangeEndLabel } : undefined,
            options: inputType === 'checkbox' 
                ? checkboxLabels.slice(0, checkboxCount).map((label, i) => ({ label, value: `checkbox-${i}` }))
                : inputType === 'radio'
                ? radioLabels.slice(0, radioCount).map((label, i) => ({ label, value: `radio-${i}` }))
                : []
        }
        onInputDataChange?.(inputData)
    }, [inputType, checkboxCount, radioCount, checkboxLabels, radioLabels, colorValue, dateValue, rangeValue, rangeStartLabel, rangeEndLabel, onInputDataChange])

    const handleInputTypeChange = (event) => {
        setInputType(event.target.value)
    }

    const handleCheckboxCountChange = (e) => {
        const newCount = parseInt(e.target.value) || 1
        setCheckboxCount(newCount)
        // Adjust labels array to match new count
        const newLabels = [...checkboxLabels]
        while (newLabels.length < newCount) {
            newLabels.push(`Option ${newLabels.length + 1}`)
        }
        setCheckboxLabels(newLabels.slice(0, newCount))
    }

    const handleRadioCountChange = (e) => {
        const newCount = parseInt(e.target.value) || 1
        setRadioCount(newCount)
        // Adjust labels array to match new count
        const newLabels = [...radioLabels]
        while (newLabels.length < newCount) {
            newLabels.push(`Option ${newLabels.length + 1}`)
        }
        setRadioLabels(newLabels.slice(0, newCount))
    }

    const setCheckboxLabel = (index, label) => {
        const newLabels = [...checkboxLabels]
        newLabels[index] = label
        setCheckboxLabels(newLabels)
    }

    const setRadioLabel = (index, label) => {
        const newLabels = [...radioLabels]
        newLabels[index] = label
        setRadioLabels(newLabels)
    }

    const renderInput = () => {
        switch(inputType) {
            case 'color':
                return <input type="color" value={colorValue} onChange={(e) => setColorValue(e.target.value)} />
            case 'date':
                return <input type="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)} />
            case 'range':
                return (
                    <div>
                        <div>
                            <label>Start label: </label>
                            <input type="text" placeholder="Enter start label" />
                            <button onClick={(e) => {
                                const textInput = e.target.previousElementSibling
                                setRangeStartLabel(textInput.value)
                                textInput.value = ''
                            }}>Set</button>
                        </div>
                        <div>
                            <label>End label: </label>
                            <input type="text" placeholder="Enter end label" />
                            <button onClick={(e) => {
                                const textInput = e.target.previousElementSibling
                                setRangeEndLabel(textInput.value)
                                textInput.value = ''
                            }}>Set</button>
                        </div>
                        <div>
                            <span>{rangeStartLabel}</span>
                            <input type="range" value={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />
                            <span>{rangeEndLabel}</span>
                        </div>
                    </div>
                )
            case 'time':
                return <input type="time" />
            case 'checkbox':
                return (
                    <div>
                        <label>Number of checkboxes: </label>
                        <input 
                            type="number" 
                            min="1" 
                            max="3" 
                            value={checkboxCount}
                            onChange={handleCheckboxCountChange}
                            onKeyDown={(e) => e.preventDefault()}
                        />
                        <div>
                            {Array.from({length: checkboxCount}, (_, i) => (
                                <div key={i}>
                                    <input type="checkbox" id={`checkbox-${i}`} />
                                    <label htmlFor={`checkbox-${i}`}>{checkboxLabels[i]}</label>
                                    <input type="text" placeholder="Enter label" />
                                    <button onClick={(e) => {
                                        const textInput = e.target.previousElementSibling
                                        setCheckboxLabel(i, textInput.value)
                                        textInput.value = ''
                                    }}>Set</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            case 'radio':
                return (
                    <div>
                        <label>Number of radio buttons: </label>
                        <input 
                            type="number" 
                            min="1" 
                            max="3" 
                            value={radioCount}
                            onChange={handleRadioCountChange}
                            onKeyDown={(e) => e.preventDefault()}
                        />
                        <div>
                            {Array.from({length: radioCount}, (_, i) => (
                                <div key={i}>
                                    <input type="radio" name="radioGroup" value={`option${i + 1}`} id={`radio-${i}`} />
                                    <label htmlFor={`radio-${i}`}>{radioLabels[i]}</label>
                                    <input type="text" placeholder="Enter label" />
                                    <button onClick={(e) => {
                                        const textInput = e.target.previousElementSibling
                                        setRadioLabel(i, textInput.value)
                                        textInput.value = ''
                                    }}>Set</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            case 'none':
            default:
                return null
        }
    }

    return (
        <div className="bg-purple-500 border-2 border-blue-500">
            <header className="text-2xl">Input Type Selector</header>
            <label htmlFor="inputType" className="block">Input type</label>
            <select id="inputType" onChange={handleInputTypeChange}>
                <option value="none">None</option>
                <option value="color">Color</option>
                <option value="date">Date</option>
                <option value="range">Range</option>
                <option value="time">Time</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
            </select>
            <div>
                {renderInput()}
            </div>
        </div>
    )
}

export default InputTypeSelector;
