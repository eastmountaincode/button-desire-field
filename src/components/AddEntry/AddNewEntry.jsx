import { useState } from 'react'
import InputTypeSelector from './InputTypeSelector'
import ButtonCreator from './ButtonCreator'
import SingleEntryView from '../SingleEntryView'

function AddNewEntry() {
    const [buttonText, setButtonText] = useState('Click me')
    const [inputData, setInputData] = useState({ inputType: 'none' })

    const previewData = {
        inputType: inputData.inputType,
        buttonText: buttonText,
        options: inputData.options || [],
        selectedValue: inputData.selectedValue,
        selectedValues: inputData.selectedValues,
        value: inputData.value,
        rangeLabels: inputData.rangeLabels
    }

    return (
        <div className="bg-green-500 border-2 border-yellow-500">
            <header className="text-2xl">Add New Entry</header>
            <ButtonCreator onButtonTextChange={setButtonText} />
            <InputTypeSelector onInputDataChange={setInputData} />
            <div>
                <header>Preview:</header>
                <SingleEntryView entryData={previewData} readOnly={true} />
            </div>
            <button>Add</button>
        </div>
    )
}
export default AddNewEntry;