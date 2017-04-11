var sessionService = require('../../services/sessions');

describe("[Sessions]", function(){
	var user_uuid = "test-user-uuid";
	var sessionToken = "test-user-session-token";


	describe("storeSessionToken", function(){
		it("should return a query object", function(){
			return sessionService.storeSessionToken(user_uuid, sessionToken).then((user) => {	
				console.log(JSON.stringify(user));
				expect(user).to.have.all.keys("fieldCount","affectedRows", "insertId", "serverStatus", "warningCount", "message", "protocol41", "changedRows");
			}).catch((err) => {
				throw new Error(err);
			});
		});
	});

	describe("getUserIDBySessionToken", function(){
		it("should return a user id", function(){
			return sessionService.getUserIDBySessionToken(sessionToken).then((userID) => {
				console.log(JSON.stringify(userID));	
				expect(userID[0]).to.have.all.keys("user_id");
			}).catch((err) => {
				throw new Error(err);
			});
		});
	});

	describe("getSessionToken", function(){
		it("should return a session token", function(){
			return sessionService.getSessionToken(sessionToken).then((session) => {
				console.log(JSON.stringify(session));
				expect(session[0]).to.have.all.keys("id", "user_id", "token", "created_at", "updated_at");
			}).catch((err) => {
				throw new Error(err);
			});
		});
	});


	describe("deleteSessionToken", function(){
		it("should return a query object", function(){
			return sessionService.deleteSessionToken(user_uuid, sessionToken).then((user) => {
				console.log(JSON.stringify(user));	
				expect(user).to.have.all.keys("fieldCount","affectedRows", "insertId", "serverStatus", "warningCount", "message", "protocol41", "changedRows");
				
			}).catch((err) => {
				throw new Error(err);
			});
		});
	});


});
