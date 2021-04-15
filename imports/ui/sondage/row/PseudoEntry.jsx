import React from 'react'
import { deleteResponse } from '../../general/helper-functions/sondageMethods'

export default function PseudoEntry({ responseId, pseudo, setIsEditing, setEditingId, updateForm }) {

    // When the button to edit is clicked, update the editing states to true and the response id
    const updateEditing = () => {

        // Set that we are editing
        setIsEditing(true)
        setEditingId(responseId)

        // Update the form with this response id
        updateForm(responseId)
    }

    return (
        <td className="pseudo-entry-cell">
            <span style={{ minWidth: "0" }}>{pseudo}</span>
            <span className="clickable-icon" onClick={updateEditing}>&#9998;</span>
            <span className="clickable-icon" onClick={() => { deleteResponse(responseId) }}><i className="fa fa-trash-o"></i></span>
        </td>
    )
}
