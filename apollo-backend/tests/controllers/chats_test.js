var jwt = require('jsonwebtoken');

describe("[Chats]", function(){
	describe("[router]", function(){
		describe("GET - ['/']", function(){
			it("Should return a collection of chats a user is a part of", function(){
				var userHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var friendHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var userUsername = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				var friendUsername = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				// Create two authenticated sessions
				var userPayload = {
					"email": userHash + "@test.com",
					"fullname": userHash,
					"username": userUsername,
					"password": userHash
				};
				var friendPayload = {
					"email": friendHash + "@test.com",
					"fullname": friendHash,
					"username": friendUsername,
					"password": friendHash
				};
				// Create user authenticated session
				return chakram.post("http://localhost:4200/api/v1/register", userPayload).then((response) => {
					// User authentication token
					var userToken = response.response.body.results[0]["token"];
					var userTokenPromise = new Promise((resolve, reject) => {
						resolve(userToken);	
					});
					// Create friend authenticated session
					return Promise.all([
						chakram.post("http://localhost:4200/api/v1/register", friendPayload),
						userTokenPromise
					]);
				}).then((results) => {
					let userToken = results[1];
					let response = results[0];
					let friendToken = response.response.body.results[0]["token"];
					let friendID = (jwt.verify(friendToken, 'super-secret')).uid;
					let payload = {
						"friendID": friendID
					};
					let userTokenPromise = new Promise((resolve, reject) => {
						resolve(userToken);	
					});
					return Promise.all([
						chakram.post("http://localhost:4200/api/v1/chats", payload, {"headers":{"Authorization": "Bearer " + userToken}}),
						userTokenPromise
					]);
				}).then((results) => {
					let userToken = results[1];
					return chakram.get("http://localhost:4200/api/v1/chats", {"headers": {"Authorization": "Bearer " + userToken}});
				}).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.success).to.be.a("boolean");
					expect(response.response.body.success).to.equal(true);
					expect(response.response.body.results).to.be.a("array");
				});
			});
			it("Should return an error saying the user is not a part of any chats", function(){
				var userHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var friendHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var userUsername = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				var friendUsername = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				// Create two authenticated sessions
				var userPayload = {
					"email": userHash + "@test.com",
					"fullname": userHash,
					"username": userUsername,
					"password": userHash
				};
				var friendPayload = {
					"email": friendHash + "@test.com",
					"fullname": friendHash,
					"username": friendUsername,
					"password": friendHash
				};
				// Create user authenticated session
				return chakram.post("http://localhost:4200/api/v1/register", userPayload).then((response) => {
					// User authentication token
					var userToken = response.response.body.results[0]["token"];
					var userTokenPromise = new Promise((resolve, reject) => {
						resolve(userToken);	
					});
					// Create friend authenticated session
					return Promise.all([
						chakram.post("http://localhost:4200/api/v1/register", friendPayload),
						userTokenPromise
					]);
				}).then((results) => {
					let userToken = results[1];
					return chakram.get("http://localhost:4200/api/v1/chats", {"headers": {"Authorization": "Bearer " + userToken}});
				}).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.success).to.be.a("boolean");
					expect(response.response.body.success).to.equal(false);
					expect(response.response.body.errors).to.be.a("array");
				});
			});

		});
		describe("POST - ['/']", function(){
			it("Should return a success code acknowledging a successfully created chat between two friends", function(){
				var userHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var friendHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var userUsername = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				var friendUsername = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				// Create two authenticated sessions
				var userPayload = {
					"email": userHash + "@test.com",
					"fullname": userHash,
					"username": userUsername,
					"password": userHash
				};
				var friendPayload = {
					"email": friendHash + "@test.com",
					"fullname": friendHash,
					"username": friendUsername,
					"password": friendHash
				};
				// Create user authenticated session
				return chakram.post("http://localhost:4200/api/v1/register", userPayload).then((response) => {
					// User authentication token
					var userToken = response.response.body.results[0]["token"];
					var userTokenPromise = new Promise((resolve, reject) => {
						resolve(userToken);	
					});
					// Create friend authenticated session
					return Promise.all([
						chakram.post("http://localhost:4200/api/v1/register", friendPayload),
						userTokenPromise
					]);
				}).then((results) => {
					let userToken = results[1];
					let response = results[0];
					let friendToken = response.response.body.results[0]["token"];
					let friendID = (jwt.verify(friendToken, 'super-secret')).uid;
					let payload = {
						"friendID": friendID
					};
					return chakram.post("http://localhost:4200/api/v1/chats", payload, {"headers":{"Authorization": "Bearer " + userToken}});
				}).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.success).to.be.a("boolean");
					expect(response.response.body.success).to.equal(true);
				});
			});
			it("Should return a success code acknowledging an unsuccessfully created chat between two friends", function(){
				var userHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var friendHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var userUsername = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				var friendUsername = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				// Create two authenticated sessions
				var userPayload = {
					"email": userHash + "@test.com",
					"fullname": userHash,
					"username": userUsername,
					"password": userHash
				};
				var friendPayload = {
					"email": friendHash + "@test.com",
					"fullname": friendHash,
					"username": friendUsername,
					"password": friendHash
				};
				// Create user authenticated session
				return chakram.post("http://localhost:4200/api/v1/register", userPayload).then((response) => {
					// User authentication token
					var userToken = response.response.body.results[0]["token"];
					var userTokenPromise = new Promise((resolve, reject) => {
						resolve(userToken);	
					});
					// Create friend authenticated session
					return Promise.all([
						chakram.post("http://localhost:4200/api/v1/register", friendPayload),
						userTokenPromise
					]);
				}).then((results) => {
					let userToken = results[1];
					let response = results[0];
					let friendToken = response.response.body.results[0]["token"];
					let friendID = (jwt.verify(friendToken, 'super-secret')).uid;
					let payload = {
						"friendID": friendID
					};
					let payloadPromise = new Promise((resolve, reject) => {
						resolve(payload);	
					});
					let userTokenPromise = new Promise((resolve, reject) => {
						resolve(userToken);	
					});
					return Promise.all([
						chakram.post("http://localhost:4200/api/v1/chats", payload, {"headers":{"Authorization": "Bearer " + userToken}}),
						payloadPromise,
						userTokenPromise
					]);
				}).then((results) => {
					let payload = results[1];
					let userToken = results[2];
					return chakram.post("http://localhost:4200/api/v1/chats", payload, {"headers":{"Authorization": "Bearer " + userToken}});
				}).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.success).to.be.a("boolean");
					expect(response.response.body.success).to.equal(false);
				});
			});
		});
	});
});
