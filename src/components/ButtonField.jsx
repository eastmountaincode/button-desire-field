import { useState, useEffect } from 'react'
import SingleEntryView from './SingleEntryView'

function ButtonField({ onRefetch }) {
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchEntries()
    }, [])

    // Expose refetch function to parent
    useEffect(() => {
        if (onRefetch) {
            onRefetch.current = fetchEntries
        }
    }, [onRefetch])

    const fetchEntries = async () => {
        try {
            setLoading(true)

            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/entries?order=created_at.desc&limit=30`, {
                headers: {
                    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            setEntries(data)

        } catch (err) {
            console.error('Error fetching entries:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="p-2">Loading entries...</div>
    }

    if (error) {
        return <div className="p-2">Error loading entries: {error}</div>
    }

    if (entries.length === 0) {
        return (
            <div>
                <details className="p-2" open>
                    <summary className="select-none cursor-pointer">buttons ({entries.length})</summary>
                    <p className="mt-2">no buttons yet</p>
                </details>
            </div>
        )
    }

    return (
        <details className="p-2" open>
            <summary className="select-none cursor-pointer">({entries.length})</summary>
            <div className="flex flex-col gap-2 mt-2 my-2">
                {entries.map((entry) => (
                        <SingleEntryView
                            key={entry.id}
                            entryData={{
                                ...entry.data,
                                id: entry.id,
                                clicks: entry.clicks,
                                timestamp: new Date(entry.created_at).toLocaleDateString(),
                                onClickUpdate: (id) => {
                                    // Update the local state to reflect the click immediately
                                    setEntries(prev => prev.map(e => 
                                        e.id === id ? { ...e, clicks: (e.clicks || 0) + 1 } : e
                                    ))
                                }
                            }}
                            readOnly={false}
                            preview={false}
                        />

                ))}
            </div>
        </details>
    )
}

export default ButtonField
