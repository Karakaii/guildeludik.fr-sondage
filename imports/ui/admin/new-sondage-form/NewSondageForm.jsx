import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

/* -----------
- Datepicker -
------------ */
// Get DatePicker and its css
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
// Register the local (fr)
import fr from 'date-fns/locale/fr'
registerLocale("fr", fr);

/* -----
- Form -
------ */

export default function NewSondageForm() {
    // Prepare elements for the form
    const [selectedDate, setSelectedDate] = useState(null);
    const [titre, setTitre] = useState("Dimanche Ludik du");
    const [categories, setCategories] = useState("40k,AoS,Autres");

    // Handle when a new sondage is submitted
    const submitNewSondage = (e) => {
        // Prevent default behaviour of the form
        e.preventDefault();

        // Get the form
        let form = e.currentTarget;
        // Get the text version of the date by extracting it from the value of the DatePicker
        let dateText = Object.keys(form.elements).map((key) => form.elements[key])[1].value;

        // If the date is empty, signal an error to the user
        if (dateText === "") {
            return alert("Erreur : Il faut choisir une date.")
        }

        // Otherwise process the form...
        // Getting the categories by spliting the text across ','
        const finalCategories = categories.split(",").map(categorie => categorie.trim());
        // Add the 'Pseudo' category as the first category 
        finalCategories.unshift("Pseudo")

        // Get the titre
        let finalTitre = titre;
        // Add the date to it if the titre is still "Dimanche Ludik du"
        if (titre === "Dimanche Ludik du") {
            finalTitre = titre + " " + dateText
        }

        // Make the sondage id with the title and the date
        let sondageId = titre + " " + dateText

        // Inserting new sondage
        Meteor.call('sondage.insert', sondageId, finalTitre, selectedDate, finalCategories);

        // Reset the variables so that a new form can be entered
        setSelectedDate(null);
        setTitre("Dimanche Ludik du");
        setCategories("40k,AoS,Autres");
    }

    return (
        <div className="new-sondage-form">
            <form onSubmit={submitNewSondage}>
                <div style={{ padding: "1rem" }}>
                    <p>Titre : </p>
                    <p className="sous-titre">Si le titre reste "Dimanche Ludik du", la date sera automatiquement ajoutée</p>
                    <input
                        type="text"
                        value={titre}
                        onChange={(e) => setTitre(e.currentTarget.value)}
                        required
                    />

                    <div>
                        <p>Date : </p>
                        <DatePicker
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            showWeekNumbers
                            locale="fr"
                            minDate={new Date()}
                            dateFormat='dd-MM-yyyy'
                            showMonthDropdown
                            showYearDropdown
                            placeholderText="Cliquer pour choisir une date"
                            className="datepicker"
                        />
                    </div>

                    <div>
                        <p>Catégories : </p>
                        <p className="sous-titre">Ecrire chaque catégorie separée par une virgule</p>
                        <input
                            type="text"
                            value={categories}
                            onChange={(e) => setCategories(e.currentTarget.value)}
                            required
                        />
                    </div>

                    <br />
                    <div className="flex-center">
                        <button type="submit">Nouveau Sondage</button>
                    </div>

                </div>
            </form>
        </div >
    )
}
