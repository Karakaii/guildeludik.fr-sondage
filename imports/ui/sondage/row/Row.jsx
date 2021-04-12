import React from 'react'
import Cell from './Cell'
import PseudoEntry from './PseudoEntry'

export default function Row(props) {
    const { response } = props

    return (
        <tr>
            {response.responses.map((entry, index) => {

                // Return the pseudo
                if (index === 0) {
                    return <PseudoEntry key={index} responseId={response._id} pseudo={entry} {...props} />
                }

                // Otherwise return a cell
                return <Cell key={index} truthy={entry} />
            })}
        </tr>
    )
}
