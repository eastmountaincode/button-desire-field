function SingleEntryView({ entryData, readOnly = false }) {
    if (!entryData) {
        return <div>No entry data provided</div>
    }

    const renderInput = () => {
        switch(entryData.inputType) {
            case 'color':
                return <input type="color" key={entryData.value} defaultValue={entryData.value || '#000000'} readOnly={readOnly} />
            case 'date':
                return <input type="date" key={entryData.value} defaultValue={entryData.value || ''} readOnly={readOnly} />
            case 'range':
                return (
                    <div className="flex flex-row gap-2" key={`${entryData.value}-${entryData.rangeLabels?.start}-${entryData.rangeLabels?.end}`}>
                        <span>{entryData.rangeLabels?.start || ''}</span>
                        <input type="range" defaultValue={entryData.value || 50} disabled={readOnly} />
                        <span>{entryData.rangeLabels?.end || ''}</span>
                    </div>
                )
            case 'time':
                return <input type="time" key={entryData.value} defaultValue={entryData.value || ''} readOnly={readOnly} />
            case 'checkbox':
                return (
                    <div key={entryData.selectedValues?.join(',')} className="flex gap-2">
                        {entryData.options?.map((option, i) => (
                            <div key={i}>
                                <input 
                                    type="checkbox" 
                                    id={`view-checkbox-${i}`} 
                                    defaultChecked={entryData.selectedValues?.includes(option.value) || false} 
                                    disabled={readOnly}
                                />
                                <label htmlFor={`view-checkbox-${i}`} className="ml-1">{option.label}</label>
                            </div>
                        ))}
                    </div>
                )
            case 'radio':
                return (
                    <div key={entryData.selectedValue} className="flex gap-2">
                        {entryData.options?.map((option, i) => (
                            <div key={i} className="flex gap-2">
                                <input 
                                    type="radio" 
                                    name="viewRadioGroup" 
                                    value={option.value} 
                                    id={`view-radio-${i}`}
                                    defaultChecked={entryData.selectedValue === option.value || false}
                                    disabled={readOnly}
                                />
                                <label htmlFor={`view-radio-${i}`}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                )
            case 'none':
            default:
                return null
        }
    }

    return (
        <div className="flex items-start gap-2">
            {/* Timestamp */}
            <span>{entryData.timestamp || new Date().toLocaleDateString()}</span>
            
            {/* Render the input based on the data */}
            {renderInput()}
            
            {/* Render the custom button */}
            {entryData.buttonText && (
                <button className="whitespace-pre-wrap break-words min-w-0 flex-shrink">{entryData.buttonText}</button>
            )}
        </div>
    )
}

export default SingleEntryView;
