var usersService = require('../../services/users');
var db = require('../../modules/database');

describe("[Users]", function(){
	beforeEach(function(){
		// Delete user just in case its in their
		var uuid = "test-id";
		var sql1 = "DELETE FROM users WHERE uuid = ?";
		var user = {
			"uuid": uuid,
			"email": "test@test.com",
			"fullname": "test user",
			"username": "test",
			"password": "password"
		};
		// Create the user
		var sql2 = "INSERT INTO users VALUES ('', ?, ?, ?, ?, ?, '', '')";
		return db.pool.query(sql1, [uuid]).then((data) => {
			if(!data.hasOwnProperty("affectedRows")){
				throw new Error("Deleting the test user failed");	
			}
			return db.pool.query(sql2, [user.uuid, user.email, user.fullname, user.username, user.password]);
		}).then((data) => {
			if(!data.hasOwnProperty("affectedRows")){
				throw new Error("Creating the test user failed");	
			}
		}).catch((err) => {
			throw new Error(err);
		});
	});

	describe("getUserByUsername", function(){
		it("Should return a user", function(){
			var username = "test";
			return usersService.getUserByUsername(username).then((user) => {
				expect(user[0]).to.have.all.keys("uuid", "email", "fullname", "username", "avatar");
			}).catch((err) => {
				throw new Error(err);	
			});
		});
	});

	describe("getUserByEmail", function(){
		it("Should return a user", function(){
			var email = "test@test.com";
			return usersService.getUserByEmail(email).then((user) => {
				expect(user[0]).to.have.all.keys("uuid", "email", "fullname", "username", "avatar");
			}).catch((err) => {
				throw new Error(err);	
			});
		});
	});
});
