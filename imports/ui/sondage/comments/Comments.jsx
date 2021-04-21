import React from 'react'
import CommentForm from './CommentForm'
import CommentThread from './CommentThread'

export default function Comments({ sondageId, comments }) {

    // Get all the thread ids
    const threadIds = comments.map(comment => comment.threadId)
    // Use the set type to get only the unique ids
    const uniqThreadIds = [...new Set(threadIds)]

    return (
        <div className="comments-master-holder flex-center-column">
            <p className="comment-title">Commentaires :</p>
            <CommentForm sondageId={sondageId} comments={comments} />
            {uniqThreadIds.map((threadId, index) => {
                return <CommentThread key={index} sondageId={sondageId} comments={comments} threadId={threadId} />
            })}
        </div>
    )
}
