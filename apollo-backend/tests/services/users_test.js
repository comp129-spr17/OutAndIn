var usersService = require('../../services/users');
var db = require('../../modules/database');

describe("[Users]", function(){
	beforeEach(function(){
		// Delete user just in case its in their
		var sql1 = "DELETE FROM users WHERE username = ?";
		var user = {
			"uuid": "test-id",
			"email": "test@test.com",
			"fullname": "test user",
			"username": "test",
			"password": "password",
			"avatar": "http://example.com/path/to/avatar.jpg",
			"socket": "socket-id"
		};
		// Create the user
		var username = "test";
		var sql2 = "INSERT INTO users VALUES ('', ?, ?, ?, ?, ?, ?, ?)";
		return db.pool.query(sql1, [username]).then((data) => {
			if(!data.hasOwnProperty("affectedRows")){
				throw new Error("Deleting the test user failed");	
			}
			return db.pool.query(sql2, [user.uuid, user.email, user.fullname, user.username, user.password, user.avatar, user.socket]);
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

	describe("getAllUsers", function(){
		it("Should return a collection of users", function(){
			return usersService.getAllUsers().then((users) => {
				expect(users.length).to.be.above(1);
				expect(users[0]).to.have.all.keys("uuid", "email", "fullname", "username", "avatar");
			}).catch((err) => {
				throw new Error(err);	
			});
		});
	});

	describe("getUserByUUID", function(){
		it("Should return a user", function(){
			var uuid = "test-id";
			return usersService.getUserByUUID(uuid).then((user) => {
				expect(user[0]).to.have.all.keys("uuid", "email", "fullname", "username", "avatar");
			}).catch((err) => {
				throw new Error(err);	
			});
		});
	});

	describe("getSocketID", function(){
		it("Should return a user", function(){
			var uuid = "test-id";
			return usersService.getSocketID(uuid).then((user) => {
				expect(user[0]).to.have.all.keys("socket");
			}).catch((err) => {
				throw new Error(err);	
			});
		});
	});

	describe("createUser", function(){
		it("Should create a new user", function(){
			var user = {
				"email": "test@test.com",
				"fullname": "test user",
				"username": "test",
				"password": "password"
			};
			return usersService.createUser(user.email, user.username, user.fullname, user.password).then((data) => {
				if(!data.hasOwnProperty("affectedRows")){
					throw new Error("Creating the test user failed");	
				}
			}).catch((err) => {
				throw new Error(err);	
			});
		});
	});

	describe("storeSocketID", function(){
		it("Should store a socket ID", function(){
			var uuid = "test-id";
			var socketID = "socket-id";
			return usersService.storeSocketID(uuid, socketID).then((data) => {
				if(!data.hasOwnProperty("affectedRows")){
					throw new Error("Creating the test user failed");	
				}
			}).catch((err) => {
				throw new Error(err);	
			});
		});
	});

	describe("deleteuser", function(){
		it("Should delete a user", function(){
			var uuid = "test-id";
			return usersService.deleteUser(uuid).then((data) => {
				if(!data.hasOwnProperty("affectedRows")){
					throw new Error("Creating the test user failed");	
				}
			}).catch((err) => {
				throw new Error(err);	
			});
		});
	});
});
