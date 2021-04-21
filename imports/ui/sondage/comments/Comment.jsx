import React from 'react'

export default function Comment({ index, comment }) {

    // Getting the date:
    const date = new Date(comment.createdAt).toLocaleString().trim();

    // Getting the comment width based on the index
    const commentWidth = index > 0 ? `${99.5 - index}%` : "100%"

    return (
        <div className="comment" style={{ width: commentWidth }}>
            <div className="comment-holder">
                <p className="comment-info"><span className="comment-pseudo">{comment.pseudo}</span><span className="comment-date">{date}</span></p>
                <p className="comment-text">{comment.comment}</p>
            </div>
        </div>
    )
}
