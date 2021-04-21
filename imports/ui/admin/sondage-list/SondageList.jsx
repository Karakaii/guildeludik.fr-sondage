import React from 'react'
import { Meteor } from 'meteor/meteor';

// Function to communicate with the backend
import { deleteSondage } from '../../general/helper-functions/sondageMethods'

export default function SondageList({ parametres, responses }) {
    const url = Meteor.absoluteUrl()

    const deleteSurvey = sondageParametres => {

        // Check that the user really wants to delete the sondage
        if (confirm("Êtes vous sûr de vouloir supprimer ce sondage?")) {
            // If so, delete this sondage
            deleteSondage(sondageParametres, responses)
        }
    }

    // Get a date object in to a dd/mm/yyyy string
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
                        <th>#Réponses</th>
                        <th>Lien</th>
                        <th>iframe</th>
                    </tr>
                </thead>
                <tbody>
                    {parametres.map((sondage, index) => {
                        // Prepare the iframe text
                        const iframeText = `<iframe 
                        style="
                        height:200vh;
                        border: 1px solid #751919;
                        "
                        src=${url + "sondage?id=" + sondage.sondageId.replaceAll(" ", "%20")}>
                        </iframe>`

                        return (
                            <tr key={index}>
                                <td className="flex-center-center">
                                    <button style={{ padding: "4px 8px", marginRight: "5px" }} onClick={() => deleteSurvey(sondage)}>x</button>
                                    {sondage.titre}
                                </td>
                                <td>{formattedDate(sondage.date)}</td>
                                <td>{responses.filter(response => response.sondageId === sondage.sondageId).length}</td>
                                <td><a href={url + "sondage?id=" + sondage.sondageId} target="_blank">lien</a></td>
                                <td><span className="clickable-icon" onClick={() => { navigator.clipboard.writeText(iframeText) }}>&#x1F4CB;</span></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
