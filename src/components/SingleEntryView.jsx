function SingleEntryView({ entryData, readOnly = false, preview = true }) {
    if (!entryData) {
        return <div>No entry data provided</div>
    }

    const handleButtonClick = async () => {
        if (preview || !entryData.id) return // Don't increment clicks in preview mode or if no ID
        
        try {
            // Call the secure increment function
            await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/increment_entry_clicks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({ 
                    entry_id: entryData.id
                })
            })
            
            // Update local state to reflect the change immediately
            if (entryData.onClickUpdate) {
                entryData.onClickUpdate(entryData.id)
            }
            
        } catch (error) {
            console.error('Error updating clicks:', error)
        }
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
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {/* Timestamp */}
            <span className="text-xs">{entryData.timestamp || new Date().toLocaleDateString()}</span>
            
            {/* Render the input based on the data */}
            {renderInput()}
            
            {/* Render the custom button */}
            {entryData.buttonText && (
                <button 
                    className="break-words"
                    onClick={handleButtonClick}
                >
                    {entryData.buttonText}
                </button>
            )}
            
            {/* Show click count if not in preview mode */}
            {!preview && (
                <span className="text-xs text-gray-600">
                    {entryData.clicks || 0} clicks
                </span>
            )}
        </div>
    )
}

export default SingleEntryView;
