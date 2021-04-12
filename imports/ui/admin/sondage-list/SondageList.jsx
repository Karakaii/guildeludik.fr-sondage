import React from 'react'
import { Meteor } from 'meteor/meteor';

export default function SondageList({ parametres }) {
    const url = Meteor.absoluteUrl()

    //Get a date object in to a dd/mm/yyyy string
    const formattedDate = (d) => {
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return `${day}/${month}/${year}`;
    }

    return (
        <div className="sondage-list">
            <table>
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Date</th>
                        <th>Lien</th>
                        <th>iframe</th>
                    </tr>
                </thead>
                <tbody>
                    {parametres.map((sondage, index) => {
                        return (
                            <tr key={index}>
                                <td>{sondage.titre}</td>
                                <td>{formattedDate(sondage.date)}</td>
                                <td><a href={url + "sondage?id=" + sondage.sondageId} target="_blank">lien</a></td>
                                <td><span className="clickable-icon" onClick={() => { navigator.clipboard.writeText(`<iframe src=${url + "sondage?id=" + sondage.sondageId}></iframe>`) }}>&#x1F4CB;</span></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
