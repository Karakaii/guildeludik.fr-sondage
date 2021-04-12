import React from 'react'

export default function Cell({ truthy }) {
    return (
        <td className={`${truthy ? "positive" : "negative"}-response`}>
            {truthy ? <span>&#10004;</span> : <span>&#10006;</span>}
        </td>
    )
}
