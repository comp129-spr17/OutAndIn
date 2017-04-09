describe("[Session]", function(){
	describe("[router]", function(){
		describe("POST - ['/']", function(){
			it("Should return a signed json web token", function(){
				var username = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				var hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var registerPayload = {
					"email": hash + "@test.com",
					"fullname": hash,
					"username": username,
					"password": hash
				};
				var sessionPayload = {
					"username": registerPayload["username"],
					"password": registerPayload["password"]
				};
				return chakram.post("http://localhost:4200/api/v1/register", registerPayload).then((response) => {
					return chakram.post("http://localhost:4200/api/v1/session", sessionPayload);
				}).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.results).to.be.a("array");
					expect(response.response.body.results[0]).to.have.property("token");
					expect(response.response.body.results[0]["token"]).to.be.a("string");
				});
			});
			it("Should return an error saying both the username and password must be supplied", function(){
				var sessionPayload = {
					"username": "",
					"password": ""
				};
				return chakram.post("http://localhost:4200/api/v1/session", sessionPayload).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.errors).to.be.a("array");
					expect(response.response.body.errors[0]).to.have.property("message");
					expect(response.response.body.errors[0]["message"]).to.be.a("array");
					expect(response.response.body.errors[0]["message"]).to.have.lengthOf(2);
					expect(response.response.body.errors[0]["message"][0]["message"]).to.eql("username must be supplied");
					expect(response.response.body.errors[0]["message"][1]["message"]).to.eql("password must be supplied");
				});
			});
			it("Should return an error saying a username must be supplied", function(){
				var hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var sessionPayload = {
					"username": "",
					"password": hash
				};
				return chakram.post("http://localhost:4200/api/v1/session", sessionPayload).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.errors).to.be.a("array");
					expect(response.response.body.errors[0]).to.have.property("message");
					expect(response.response.body.errors[0]["message"]).to.be.a("array");
					expect(response.response.body.errors[0]["message"]).to.have.lengthOf(1);
					expect(response.response.body.errors[0]["message"][0]["message"]).to.eql("username must be supplied");
				});
			});
			it("Should return an error saying a password must be supplied", function(){
				var username = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				var sessionPayload = {
					"username": username,
					"password": ""
				};
				return chakram.post("http://localhost:4200/api/v1/session", sessionPayload).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.errors).to.be.a("array");
					expect(response.response.body.errors[0]).to.have.property("message");
					expect(response.response.body.errors[0]["message"]).to.be.a("array");
					expect(response.response.body.errors[0]["message"]).to.have.lengthOf(1);
					expect(response.response.body.errors[0]["message"][0]["message"]).to.eql("password must be supplied");
				});
			});
			it("Should return an error saying the username or password are invalid", function(){
				var username = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				var sessionPayload = {
					"username": "test",
					"password": "test"
				};
				return chakram.post("http://localhost:4200/api/v1/session", sessionPayload).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.errors).to.be.a("array");
					expect(response.response.body.errors[0]).to.have.property("message");
					expect(response.response.body.errors[0]["message"]).to.be.a("string");
					expect(response.response.body.errors[0]["message"]).to.eql("Username or Password is invalid");
				});
			});
		});
		describe("DELETE - ['/']", function(){
			it("Should return a confirmation that the user was successfully logged out", function(){
				var hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var username = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				var sessionPayload = {
					"email": hash + "@test.com",
					"fullname": hash,
					"username": username,
					"password": hash
				};
				return chakram.post("http://localhost:4200/api/v1/register", sessionPayload).then((response) => {
					let token = response.response.body.results[0]["token"];
					return chakram.delete("http://localhost:4200/api/v1/session", undefined, { headers: {"Authorization": "Bearer " + token}});
				}).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.success).to.be.a("boolean");
					expect(response.response.body.success).to.eql(true);
				});
			});
			// TODO:(mcervco) Do test cases where session token that is in the jwt is somehow not in the system anymore and fails to log in
		});
	});
});
