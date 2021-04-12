// List of functions to communication with the backend made easy.
import { Meteor } from 'meteor/meteor';

// Insert a new response
export const insertResponse = (sondageId, responses, refSondage) => {
    Meteor.call('response.insert', sondageId, responses, refSondage);
}

// Update an existing response
export const updateResponse = (sondageId, responses) => {
    Meteor.call('response.update', sondageId, responses);
}

// Delete an existing response
export const deleteResponse = sondageId => {
    Meteor.call('response.delete', sondageId);
}