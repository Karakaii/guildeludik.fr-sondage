import React, { useState, useEffect } from 'react';

export default function NewPseudo({ value }) {
    const [myValue, setMyValue] = useState(value)

    // Sync the prop with the state prop
    useEffect(() => {
        setMyValue(value);
    }, [value]);

    return (
        <td>
            <input
                type="text"
                placeholder="pseudo..."
                value={myValue}
                onChange={e => setMyValue(e.currentTarget.value)}
                required
            />
        </td>
    )
}
