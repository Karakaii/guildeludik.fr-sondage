import React, { useState, useEffect } from 'react';

export default function NewCell({ value }) {
    const [myValue, setMyValue] = useState(value)

    // Sync the prop with the state prop
    useEffect(() => {
        setMyValue(value);
    }, [value]);

    return (
        <td>
            <input
                type="checkbox"
                checked={myValue}
                onChange={e => setMyValue(e.currentTarget.checked)}
            />
        </td>
    )
}
