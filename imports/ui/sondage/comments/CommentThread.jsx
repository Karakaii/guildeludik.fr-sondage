import React, { useState } from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'

export default function CommentThread({ sondageId, comments, threadId }) {
    const [givingResponse, setgivingResponse] = useState(false)

    // Get all the comments for this thread
    const threadComments = comments.filter(comment => comment.threadId === threadId)

    return (
        <div className="comment-thread">
            <div className="comment-thread-comments">
                {threadComments.map((comment, index) => {
                    return <Comment key={index} index={index} comment={comment} />
                })}
            </div>

            <div className="comment-thread-form flex-center">
                {givingResponse && <CommentForm sondageId={sondageId} comments={comments} threadId={threadId} />}
            </div>

            <div className="comment-thread-reply-holder">
                <span className="comment-thread-reply" onClick={() => { setgivingResponse(!givingResponse) }}>{!givingResponse ? "Répondre" : "x"}</span>
            </div>
        </div>
    )
}
