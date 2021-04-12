import React from 'react'

export default function Footer({ parametres, responses }) {
    return (
        <tfoot>
            <tr>
                {parametres.categories.map((category, index) => {

                    // If this is the first category, return the word "Total"
                    if (index === 0) {
                        return <th key={index}>Total:</th>
                    }

                    // Otherwise return the calculated total of the column

                    // Get the number of true entries for this category index in the 
                    // responses.
                    const columnTotal = responses.map((response) => {
                        return response.responses[index]
                    }).filter(entry => entry).length

                    return <th key={index}>{columnTotal}</th>
                })}
            </tr>
        </tfoot>
    )
}
