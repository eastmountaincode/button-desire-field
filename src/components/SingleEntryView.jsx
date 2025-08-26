function SingleEntryView({ entryData }) {
    if (!entryData) {
        return <div>No entry data provided</div>
    }

    const renderInput = () => {
        switch(entryData.inputType) {
            case 'color':
                return <input type="color" key={entryData.value} defaultValue={entryData.value || '#000000'} />
            case 'date':
                return <input type="date" key={entryData.value} defaultValue={entryData.value || ''} />
            case 'range':
                return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }} key={`${entryData.value}-${entryData.rangeLabels?.start}-${entryData.rangeLabels?.end}`}>
                        <span>{entryData.rangeLabels?.start || ''}</span>
                        <input type="range" defaultValue={entryData.value || 50} />
                        <span>{entryData.rangeLabels?.end || ''}</span>
                    </div>
                )
            case 'time':
                return <input type="time" key={entryData.value} defaultValue={entryData.value || ''} />
            case 'checkbox':
                return (
                    <div>
                        {entryData.options?.map((option, i) => (
                            <div key={i}>
                                <input 
                                    type="checkbox" 
                                    id={`view-checkbox-${i}`} 
                                    defaultChecked={entryData.selectedValues?.includes(option.value) || false} 
                                />
                                <label htmlFor={`view-checkbox-${i}`}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                )
            case 'radio':
                return (
                    <div>
                        {entryData.options?.map((option, i) => (
                            <div key={i}>
                                <input 
                                    type="radio" 
                                    name="viewRadioGroup" 
                                    value={option.value} 
                                    id={`view-radio-${i}`}
                                    defaultChecked={entryData.selectedValue === option.value || false}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Timestamp */}
            <span>{entryData.timestamp || new Date().toLocaleTimeString()}</span>
            
            {/* Render the input based on the data */}
            {renderInput()}
            
            {/* Render the custom button */}
            {entryData.buttonText && (
                <button>{entryData.buttonText}</button>
            )}
        </div>
    )
}

export default SingleEntryView;
