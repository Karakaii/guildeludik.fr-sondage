// List of functions to communication with the backend made easy.
import { Meteor } from 'meteor/meteor';

// Insert a new response
export const insertResponse = (sondageId, responses, refSondage) => {
    Meteor.call('response.insert', sondageId, responses, refSondage)
}

// Update an existing response
export const updateResponse = (responseId, responses) => {
    Meteor.call('response.update', responseId, responses)
}

// Delete an existing response
export const deleteResponse = responseId => {
    Meteor.call('response.delete', responseId)
}

// Delete a whole sondage
export const deleteSondage = (sondageParametres, responses) => {

    // Get all the responses for this sondage
    const sondageResponse = responses.filter(response => response.sondageId === sondageParametres.sondageId)
    // Go through each response and delete them
    sondageResponse.forEach(response => deleteResponse(response._id))

    // Delete the sondage parametres
    Meteor.call('sondage.delete', sondageParametres._id)

}