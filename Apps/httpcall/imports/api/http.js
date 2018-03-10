import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

if (Meteor.isServer) {
	Meteor.methods({
		getRestData(whichData) {
			let url = 'https://jsonplaceholder.typicode.com/'+whichData;
			console.log('URL: ' + url);

			let result = '';
			let statusCode = '';

			try {
				try{
					let callResult = HTTP.call('GET', url);
					statusCode = callResult.statusCode;
					result = callResult;
				} catch (callErr) {
					result = {
						error: {
							statusCode: callErr.response.statusCode,
							error: 'HTTP error',
						}
					}
					result = JSON.stringify(error);
				} finally {
					return result;
				}
			} catch (err) {
				console.log('General error');
				console.log(err);
				result = {
					error: {
						statusCode: 0,
						error: err
					}
				}
				return JSON.stringify(error);
			}
		},
	});
}