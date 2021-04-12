import { check } from 'meteor/check';
import { ParametresCollection } from './ParametresCollection';
import { ResponsesCollection } from './ResponsesCollection';

Meteor.methods({

    //Method to add a new sondage to the list of parametres
    'sondage.insert'(sondageId, titre, date, categories) {
        check(sondageId, String);
        check(titre, String);
        check(date, Date);
        check(categories, Array);

        ParametresCollection.insert({
            sondageId: sondageId,
            titre: titre,
            date: date,
            categories: categories,
            createdAt: new Date()
        })
    },

    //Add a response to a particular sondage
    'response.insert'(sondageId, responses, refSondage) {
        check(sondageId, String);
        check(responses, Array);
        check(refSondage, String);


        ResponsesCollection.insert({
            sondageId: sondageId,
            responses: responses,
            refSondage: refSondage,
            createdAt: new Date(),
        })
    },

    //Delete a particular response
    'response.delete'(_id) {
        check(_id, String);
        ResponsesCollection.remove(_id);
    },

    //Update a particular response
    'response.update'(responseIdToEdit, responses) {
        check(responseIdToEdit, String);
        check(responses, Array)

        ResponsesCollection.update(responseIdToEdit,
            {
                $set:
                    { responses: responses }
            })
    },
});