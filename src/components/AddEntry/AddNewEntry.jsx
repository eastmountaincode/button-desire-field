import { useState } from 'react'
import InputTypeSelector from './InputTypeSelector'
import ButtonCreator from './ButtonCreator'
import SingleEntryView from '../SingleEntryView'

function AddNewEntry({ onSuccess }) {
    const [buttonText, setButtonText] = useState('Click me')
    const [inputData, setInputData] = useState({ inputType: 'none' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const previewData = {
        inputType: inputData.inputType,
        buttonText: buttonText,
        options: inputData.options || [],
        selectedValues: inputData.selectedValues,
        selectedValue: inputData.selectedValue,
        value: inputData.value,
        rangeLabels: inputData.rangeLabels
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        
        try {
            // Create the data object that will be stored as JSONB
            const data = {
                buttonText: buttonText,
                inputType: inputData.inputType,
                value: inputData.value || null,
                options: inputData.options || null,
                selectedValues: inputData.selectedValues || null,
                selectedValue: inputData.selectedValue || null,
                rangeLabels: inputData.rangeLabels || null
            }

            // Submit to Supabase
            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/entries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({ data })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
        
            alert('Entry added successfully!')
            
            // Trigger refetch of button field
            onSuccess?.()
            
        } catch (error) {
            console.error('Error submitting entry:', error)
            alert('Error adding entry. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <details className="p-2">
            <summary className="select-none cursor-pointer">add a new button</summary>
            <div className="flex flex-col gap-2 mt-2">
                <ButtonCreator onButtonTextChange={setButtonText} />
                <InputTypeSelector onInputDataChange={setInputData} />
                <div className="my-2">
                    <header>preview:</header>
                    <SingleEntryView entryData={previewData} readOnly={true} />
                </div>
                <div className="my-2">
                    <button 
                        className="self-start disabled:opacity-50" 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'adding...' : 'add'}
                    </button>
                </div>
            </div>
        </details>
    )
}
export default AddNewEntry;