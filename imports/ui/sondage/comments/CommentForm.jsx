import { set } from 'date-fns/esm'
import React, { useState, useRef } from 'react'
import { insertComment } from '../../general/helper-functions/sondageMethods'

export default function CommentForm({ sondageId, comments, threadId = "" }) {
    // Set the states
    const [pseudo, setPseudo] = useState("")
    const [comment, setComment] = useState("")
    const [nbRows, setnbRows] = useState(1)

    // Set the ref to the comment box
    const commentBox = useRef(null)

    const formatComment = e => {
        // Get the comment and set it
        const tmpComment = e.currentTarget.value
        setComment(tmpComment)

        // Get the number of characters
        const nbCharacters = tmpComment.length
        const commentBoxWidth = commentBox.current.offsetWidth

        // calculate the number of rows as (1 character = 8px)/width
        const tmpNbRows = Math.ceil(nbCharacters * 8 / commentBoxWidth)
        setnbRows(tmpNbRows > 0 ? tmpNbRows : 1)
    }

    const addComment = e => {
        e.preventDefault()

        // Get the threadId
        let newThreadId = threadId
        // If the threadId is empty, get the highest id
        if (threadId === "") {
            // Get all the thread ids
            const threadIds = comments.map(comment => comment.threadId)
            // Use the set type to get only the unique ids
            const uniqThreadIds = [...new Set(threadIds)]
            // Get the new thread id based on the length of unique ids
            newThreadId = (uniqThreadIds.length + 1).toString()
        }

        // Insert the comment
        insertComment(sondageId, pseudo, comment, newThreadId)

        // Clear the form
        setPseudo("")
        setComment("")
        setnbRows(1)
    }

    return (
        <form onSubmit={addComment}>
            <p>Ajouter {threadId === "" ? "un commentaire" : "une réponse"} :</p>
            <input
                type="text"
                placeholder="pseudo..."
                className="comment-form-entry"
                value={pseudo}
                onChange={e => setPseudo(e.currentTarget.value)}
                required
            />
            <br />
            <textarea
                rows={nbRows}
                placeholder="commentaire..."
                className="comment-form-entry"
                value={comment}
                onChange={formatComment}
                ref={commentBox}
                required
            />
            <br />
            <div className="flex-center comment-form-button"><button type="submit">{threadId === "" ? "Ajouter" : "Répondre"}</button></div>
        </form>
    )
}
