import { useState, useEffect } from 'react'

function InputTypeSelector({ onInputDataChange }) {
    const [inputType, setInputType] = useState('none')
    const [checkboxCount, setCheckboxCount] = useState(1)
    const [radioCount, setRadioCount] = useState(1)
    const [checkboxLabels, setCheckboxLabels] = useState(['option 1'])
    const [radioLabels, setRadioLabels] = useState(['option 1'])
    const [colorValue, setColorValue] = useState('#000000')
    const [dateValue, setDateValue] = useState('')
    const [rangeValue, setRangeValue] = useState(50)
    const [rangeStartLabel, setRangeStartLabel] = useState('')
    const [rangeEndLabel, setRangeEndLabel] = useState('')
    const [timeValue, setTimeValue] = useState('')
    const [checkedBoxes, setCheckedBoxes] = useState([])
    const [selectedRadio, setSelectedRadio] = useState(null)

    // Update parent whenever relevant data changes
    useEffect(() => {
        const inputData = {
            inputType: inputType,
            value: inputType === 'color' ? colorValue
                : inputType === 'date' ? dateValue
                    : inputType === 'range' ? rangeValue
                        : inputType === 'time' ? timeValue
                            : undefined,
            rangeLabels: inputType === 'range' ? { start: rangeStartLabel, end: rangeEndLabel } : undefined,
            selectedValues: inputType === 'checkbox'
                ? checkedBoxes.map(index => `checkbox-${index}`)
                : undefined,
            selectedValue: inputType === 'radio' && selectedRadio !== null
                ? `radio-${selectedRadio}`
                : undefined,
            options: inputType === 'checkbox'
                ? checkboxLabels.slice(0, checkboxCount).map((label, i) => ({ label, value: `checkbox-${i}` }))
                : inputType === 'radio'
                    ? radioLabels.slice(0, radioCount).map((label, i) => ({ label, value: `radio-${i}` }))
                    : []
        }
        onInputDataChange?.(inputData)
    }, [inputType, checkboxCount, radioCount, checkboxLabels, radioLabels, colorValue, dateValue, rangeValue, rangeStartLabel, rangeEndLabel, timeValue, checkedBoxes, selectedRadio, onInputDataChange])

    const handleInputTypeChange = (event) => {
        setInputType(event.target.value)
    }

    const handleCheckboxCountChange = (e) => {
        const newCount = parseInt(e.target.value) || 1
        setCheckboxCount(newCount)
        // Adjust labels array to match new count
        const newLabels = [...checkboxLabels]
        while (newLabels.length < newCount) {
            newLabels.push(`option ${newLabels.length + 1}`)
        }
        setCheckboxLabels(newLabels.slice(0, newCount))
    }

    const handleRadioCountChange = (e) => {
        const newCount = parseInt(e.target.value) || 1
        setRadioCount(newCount)
        // Adjust labels array to match new count
        const newLabels = [...radioLabels]
        while (newLabels.length < newCount) {
            newLabels.push(`option ${newLabels.length + 1}`)
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

    const handleCheckboxChange = (index, checked) => {
        if (checked) {
            setCheckedBoxes([...checkedBoxes, index])
        } else {
            setCheckedBoxes(checkedBoxes.filter(i => i !== index))
        }
    }

    const handleRadioChange = (index) => {
        setSelectedRadio(index)
    }

    const renderInput = () => {
        switch (inputType) {
            case 'color':
                return <input type="color" value={colorValue} onChange={(e) => setColorValue(e.target.value)} />
            case 'date':
                return <input type="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)} />
            case 'range':
                return (
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <label>start label: </label>
                            <input type="text" placeholder="enter start label" />
                            <button onClick={(e) => {
                                const textInput = e.target.previousElementSibling
                                setRangeStartLabel(textInput.value)
                                textInput.value = ''
                            }}>set</button>
                        </div>
                        <div className="flex flex-row gap-2">
                            <label>end label: </label>
                            <input type="text" placeholder="enter end label" />
                            <button onClick={(e) => {
                                const textInput = e.target.previousElementSibling
                                setRangeEndLabel(textInput.value)
                                textInput.value = ''
                            }}>set</button>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span>{rangeStartLabel}</span>
                            <input type="range" value={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />
                            <span>{rangeEndLabel}</span>
                        </div>
                    </div>
                )
            case 'time':
                return <input type="time" value={timeValue} onChange={(e) => setTimeValue(e.target.value)} />
            case 'checkbox':
                return (
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <label>number of checkboxes: </label>
                            <input
                                type="number"
                                min="1"
                                max="3"
                                value={checkboxCount}
                                onChange={handleCheckboxCountChange}
                                onKeyDown={(e) => e.preventDefault()}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            {Array.from({ length: checkboxCount }, (_, i) => (
                                <div key={i} className="flex flex-row gap-2">
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${i}`}
                                        checked={checkedBoxes.includes(i)}
                                        onChange={(e) => handleCheckboxChange(i, e.target.checked)}
                                    />
                                    <label htmlFor={`checkbox-${i}`}>{checkboxLabels[i]}</label>
                                    <input type="text" placeholder="enter label" />
                                    <button onClick={(e) => {
                                        const textInput = e.target.previousElementSibling
                                        setCheckboxLabel(i, textInput.value)
                                        textInput.value = ''
                                    }}>set</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            case 'radio':
                return (
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <label>number of radio buttons: </label>
                            <input
                                type="number"
                                min="1"
                                max="3"
                                value={radioCount}
                                onChange={handleRadioCountChange}
                                onKeyDown={(e) => e.preventDefault()}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            {Array.from({ length: radioCount }, (_, i) => (
                                <div key={i} className="flex flex-row gap-2">
                                    <input 
                                        type="radio" 
                                        name="radioGroup" 
                                        value={`option${i + 1}`} 
                                        id={`radio-${i}`}
                                        checked={selectedRadio === i}
                                        onChange={() => handleRadioChange(i)}
                                    />
                                    <label htmlFor={`radio-${i}`}>{radioLabels[i]}</label>
                                    <input type="text" placeholder="enter label" />
                                    <button onClick={(e) => {
                                        const textInput = e.target.previousElementSibling
                                        setRadioLabel(i, textInput.value)
                                        textInput.value = ''
                                    }}>set</button>
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
        <div className="p-2">
            <div className="flex flex-row gap-2 mb-2">
                <label htmlFor="inputType" className="block">additional input</label>
                <select id="inputType" onChange={handleInputTypeChange}>
                    <option value="none">none</option>
                    <option value="color">color</option>
                    <option value="date">date</option>
                    <option value="range">range</option>
                    <option value="time">time</option>
                    <option value="checkbox">checkbox</option>
                    <option value="radio">radio</option>
                </select>
            </div>
            <div>
                {renderInput()}
            </div>
        </div>
    )
}

export default InputTypeSelector;
