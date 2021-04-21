import { check } from 'meteor/check'
import { CommentsCollection } from './CommentsCollection'
import { ParametresCollection } from './ParametresCollection'
import { ResponsesCollection } from './ResponsesCollection'

Meteor.methods({

    // Method to add a new sondage to the list of parametres
    'sondage.insert'(sondageId, titre, date, categories) {
        check(sondageId, String)
        check(titre, String)
        check(date, Date)
        check(categories, Array)

        ParametresCollection.insert({
            sondageId: sondageId,
            titre: titre,
            date: date,
            categories: categories,
            createdAt: new Date()
        })
    },

    // Method to delete a sondage from the parameteres
    'sondage.delete'(sondageId) {
        check(sondageId, String)
        ParametresCollection.remove(sondageId)
    },

    // Add a response to a particular sondage
    'response.insert'(sondageId, responses, refSondage) {
        check(sondageId, String)
        check(responses, Array)
        check(refSondage, String)


        ResponsesCollection.insert({
            sondageId: sondageId,
            responses: responses,
            refSondage: refSondage,
            createdAt: new Date(),
        })
    },

    // Delete a particular response
    'response.delete'(responseId) {
        check(responseId, String)
        ResponsesCollection.remove(responseId)
    },

    // Update a particular response
    'response.update'(responseId, responses) {
        check(responseId, String)
        check(responses, Array)

        ResponsesCollection.update(responseId,
            {
                $set:
                    { responses: responses }
            })
    },

    // Add a comment
    'comment.insert'(sondageId, pseudo, comment, threadId) {
        check(sondageId, String)
        check(pseudo, String)
        check(comment, String)
        check(threadId, String)

        CommentsCollection.insert({
            sondageId,
            pseudo,
            comment,
            threadId,
            createdAt: new Date()
        })
    }
})