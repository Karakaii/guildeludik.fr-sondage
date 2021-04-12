import { Meteor } from 'meteor/meteor';

//Import collection
import { ResponsesCollection } from '../imports/api/ResponsesCollection';
import { ParametresCollection } from '../imports/api/ParametresCollection';

//Import methods
import '../imports/api/methods';

//Publish collections
Meteor.publish('parametres', function publishTasks() {
	return ParametresCollection.find({});
});

Meteor.publish('responses', function publishTasks() {
	return ResponsesCollection.find({});
});

//Manually setting the initial elements of a collection on startup:

// Meteor.startup(() => {
//
//     if (ResponsesCollection.find().count() === 0) {
//         ResponsesCollection.insert({ sondageId: "lgl74", responses: ["Karakai", true, false, true], createdAt: new Date() })
//         ResponsesCollection.insert({ sondageId: "lgl74", responses: ["Adrithur", true, false, false], createdAt: new Date() })
//         ResponsesCollection.insert({ sondageId: "lgl42", responses: ["Byte", false, false, false], createdAt: new Date() })
//         ResponsesCollection.insert({ sondageId: "lgl42", responses: ["Bit", false, true, false], createdAt: new Date() })
//     }
//
//     if (ParametresCollection.find().count() === 0) {
//         ParametresCollection.insert({
//             sondageId: "lgl74", titre: "Test1", date: new Date(), categories: ['Pseudo', '40k', 'AoS', 'Autres'], createdAt: new Date()
//         })
//         ParametresCollection.insert({
//             sondageId: "lgl42", titre: "Test2", date: new Date(), categories: ['Pseudo', '40k', 'AoS', 'Autres'], createdAt: new Date()
//         })
//     }
// });
