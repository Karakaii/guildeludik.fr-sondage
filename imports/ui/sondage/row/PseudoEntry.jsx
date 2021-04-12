import React from 'react'
import { deleteResponse } from '../../general/helper-functions/sondageMethods'

export default function PseudoEntry({ responseId, pseudo, setIsEditing, setEditingId }) {

    // When the button to edit is clicked, update the editing states to true and the response id
    const updateEditing = () => {
        setIsEditing(true)
        setEditingId(responseId)
    }

    return (
        <td className="pseudo-entry-cell">
            <span>{pseudo}</span>
            <span className="clickable-icon" onClick={updateEditing}>&#9998;</span>
            <span className="clickable-icon" onClick={() => { deleteResponse(responseId) }}><i className="fa fa-trash-o"></i></span>
        </td>
    )
}
