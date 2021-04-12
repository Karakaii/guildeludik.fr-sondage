import React from 'react';

// Elements
import NewCell from './NewCell'
import NewPseudo from './NewPseudo'

export default function NewEntry({ parametres, responses, isEditing, editingId }) {

    // Get the response that is being edited
    const editedResponse = responses.filter(response => response._id === editingId)[0] ?? { responses: [] }

    // If there is an edited response, it will be set to the values, otherwise the values will be empty
    return (
        <tr>
            {
                parametres.categories.map((category, index) => {

                    // Return the pseudo
                    if (index === 0) {
                        return <NewPseudo key={index} category={category} value={isEditing ? editedResponse.responses[index] : ""} />
                    }

                    // Otherwise return a cell
                    return <NewCell key={index} category={category} value={isEditing ? editedResponse.responses[index] : false} />
                })
            }
        </tr>
    )
}
