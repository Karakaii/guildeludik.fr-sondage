import React from 'react';

// Elements
import NewCell from './NewCell'
import NewPseudo from './NewPseudo'

export default function NewEntry(props) {
    const { parametres } = props
    return (
        <tr>
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
    )
}
