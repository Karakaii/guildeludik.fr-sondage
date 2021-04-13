import React from 'react';

// Elements
import NewCell from './NewCell'
import NewPseudo from './NewPseudo'

export default function NewEntry({ parametres }) {

    return (
        <tr>
            {
                parametres.categories.map((category, index) => {

                    // Return the pseudo
                    if (index === 0) {
                        return <NewPseudo key={index} category={category} />
                    }

                    // Otherwise return a cell
                    return <NewCell key={index} category={category} />
                })
            }
        </tr>
    )
}
