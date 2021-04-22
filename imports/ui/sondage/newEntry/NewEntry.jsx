import React from 'react';

// Elements
import NewCell from './NewCell'
import NewPseudo from './NewPseudo'

export default function NewEntry(props) {
    const { parametres, isEditing } = props
    return (
        <>
            <tr className="new-entry-row">
                {
                    parametres.categories.map((category, index) => {

                        // Return the pseudo
                        if (index === 0) {
                            return <NewPseudo key={index} {...props} />
                        }

                        // Otherwise return a cell
                        return <NewCell key={index} />
                    })
                }
            </tr>
            <tr className="new-entry-submit-row">
                <td colSpan={parametres.categories.length} className="flex-center submit-button-cell">
                    <button type="submit" className="new-entry-submit-button">{isEditing ? "Modifier" : "M'inscrire"}</button>
                </td>
            </tr>
        </>
    )
}
