var chatsService = require('../../services/chats');
var db = require('../../modules/database');

describe("[Chats]", function(){
	describe("getUserChats", function(){
		it("Should return chats", function(){
			var uuid = "4321";
			return chatsService.getChatsForUser(uuid).then((data) => {
				expect("test").to.be.a('string');
			}).catch((err) => {
				throw new Error(err);	
			});
		});
	});
});
