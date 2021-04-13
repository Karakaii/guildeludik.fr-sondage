import React from 'react';

export default function NewPseudo({ isEditing, setIsEditing, updateForm }) {

    // Click on the symbol to stop editing
    const stopEditing = () => {

        // Stop editing
        setIsEditing(false)

        // Clear the form
        updateForm("")
    }

    return (
        <td>
            <input
                type="text"
                placeholder="pseudo..."
                required
            />
            {isEditing && <span className="clickable-icon" onClick={stopEditing}>&#8630;</span>}
        </td>
    )
}
