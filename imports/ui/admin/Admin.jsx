import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

// Importing collections
import { useTracker } from 'meteor/react-meteor-data';
import { ParametresCollection } from '../../api/ParametresCollection';
import { ResponsesCollection } from '../../api/ResponsesCollection';

//  Components
import Title from '../general/title/Title'
import LoginForm from './login-form/LoginForm';
import NewSondageForm from './new-sondage-form/NewSondageForm';
import SondageList from './sondage-list/SondageList';

export default function Admin() {
    // Getting the user
    const [user, setUser] = useState(Meteor.user());

    // Function to log out
    const logout = () => {
        Meteor.logout(function () {
            setUser(Meteor.user())
        })
    }

    // Loading the parametres of the sondages from the collection
    const { parametres, responses, isLoading } = useTracker(() => {
        // What to return if there is no data available
        const noDataAvailable = { parametres: [], responses: [] }

        // Subscribe the user to the tasks they can get
        const handlerParametres = Meteor.subscribe('parametres')
        const handlerResponses = Meteor.subscribe('responses');

        // The handler takes some time to load, whilst it is not ready, return no data and set isLoading to true
        if (!handlerParametres.ready() || !handlerResponses.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        // Returning the parametres once they are loaded
        const parametres = ParametresCollection.find({}, { sort: { date: +1 } }).fetch()
        const responses = ResponsesCollection.find({}).fetch();
        const isLoading = false;
        return { parametres, responses, isLoading }
    })

    return user ? (
        <div>
            <Title text={"Admin"} />

            <div className="admin-logout">
                <a href="" onClick={logout}>Déconnexion</a>
            </div>

            {isLoading
                ? <div className="flex-center-center"><img src="img/spinner.gif" alt="Chargement en cours..." /></div>
                : <div className="flex-center-column">
                    <NewSondageForm />
                    <SondageList parametres={parametres} responses={responses} />
                </div>
            }
        </div>
    ) : (
        <LoginForm setUser={setUser} />
    )
}
