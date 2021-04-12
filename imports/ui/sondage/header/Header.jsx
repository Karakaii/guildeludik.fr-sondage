import React from 'react'

export default function Header({ parametres }) {
    return (
        <thead>
            <tr>
                {parametres.categories.map((category, index) => {
                    return <th key={index}>{category}</th>
                })}
            </tr>
        </thead>
    )
}
