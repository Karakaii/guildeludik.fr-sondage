import React, { useState, useRef } from 'react';
import { Meteor } from 'meteor/meteor';

// Function to get URL parameters
import { getParameterByName } from '../general/helper-functions/getParameterByName'

//Importing collections
import { useTracker } from 'meteor/react-meteor-data';
import { ParametresCollection } from '../../api/ParametresCollection';
import { ResponsesCollection } from '../../api/ResponsesCollection';

// Function to communicate with the backend
import { insertResponse, updateResponse } from '../general/helper-functions/sondageMethods'

// Elements of the Sondage
import Header from './header/Header';
import NewEntry from './newEntry/NewEntry';
import Row from './row/Row';
import Footer from './footer/Footer';
import Title from '../general/title/Title';

export default function Sondage() {
    // Sondage id state
    const [sondageId, setSondageId] = useState(getParameterByName("id"))

    // State whether the user is currently editing a response
    const [isEditing, setIsEditing] = useState(false)
    // State that marks the index of which response is being edited (-1 if not being edited)
    const [editingId, setEditingId] = useState("")

    /* -----------------
    - Getting the data -
    ------------------ */
    // useTracker to load the collections
    const { parametres, responses, isLoading } = useTracker(() => {
        // What to return if there is no data available
        const noDataAvailable = { parametres: [], responses: [] };

        // Subscribe the user to the tasks they can get
        const handlerParametres = Meteor.subscribe('parametres');
        const handlerResponses = Meteor.subscribe('responses');

        // The handler takes some time to load, whilst it is not ready, return no data and set isLoading to true
        if (!handlerParametres.ready() || !handlerResponses.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        // Returning the information once the handlers have loaded
        const parametres = ParametresCollection.find({ sondageId: { $eq: sondageId } }).fetch()[0];
        const responses = ResponsesCollection.find({ sondageId: { $eq: sondageId } }).fetch();
        const isLoading = false;
        return { parametres, responses, isLoading }
    });

    /* -------------------
    - Form manipulations -
    ------------------- */
    // Create ref for my form
    const myForm = useRef(null)

    // Function to get all the form elements
    const getFormElements = () => {
        return Object.keys(myForm.current.elements).map((key) => myForm.current.elements[key]).filter(element => element.type !== "submit")
    }

    // Function that will update the form if a response id is presented or reset it if an empty string is presented
    const updateForm = (editingId) => {
        const formElements = getFormElements()
        const editedResponse = responses.filter(response => response._id === editingId)[0] ?? { responses: [] }

        formElements.forEach((element, index) => {
            if (index === 0) {
                element.value = editedResponse.responses[index] ?? ""
            } else {
                element.checked = editedResponse.responses[index] ?? false
            }
        })
    }

    /* ---------------------
    - Form submit function -
    --------------------- */
    // Submit a new entry function
    const submitNewEntry = e => {
        e.preventDefault()

        //Get an array of the elements
        const formElements = getFormElements()

        // Get the entries for the new responses
        const entries = formElements.map(entry => {

            // If this is a text input return the value
            if (entry.type === "text") {
                return entry.value
            }

            // Otherwise, return whether it is checked or not
            return entry.checked
        })

        // If editing...
        if (isEditing) {
            // Update the response
            updateResponse(editingId, entries)
        } else {
            // Otherwise insert the new answer
            insertResponse(sondageId, entries, parametres._id)
        }

        // Reset the editing states and the form
        setIsEditing(false)
        setEditingId("")
        updateForm("")
    }

    /* -----------------
    - Render component -
    ----------------- */
    return (
        <div>
            <Title text={parametres.titre} />
            {isLoading
                ? <div className="flex-center-center"><img src="img/spinner.gif" alt="Chargement en cours..." /></div>
                : <div className="flex-center">
                    <form onSubmit={submitNewEntry} className="flex-center-column" ref={myForm}>
                        <table className="sondage-table">
                            <Header parametres={parametres} />
                            <tbody>
                                <NewEntry
                                    parametres={parametres}
                                    responses={responses}
                                    isEditing={isEditing}
                                    editingId={editingId}
                                    setIsEditing={setIsEditing}
                                    updateForm={updateForm}
                                />

                                {responses.map((response, index) => {
                                    return <Row
                                        key={index}
                                        response={response}
                                        setIsEditing={setIsEditing}
                                        setEditingId={setEditingId}
                                        updateForm={updateForm}
                                    />
                                })}
                            </tbody>
                            <Footer parametres={parametres} responses={responses} />
                        </table>

                        <div className="flex-center">
                            <button type="submit">{isEditing ? "Modifier" : "M'inscrire"}</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

