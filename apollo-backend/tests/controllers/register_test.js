var crypto = require('crypto');

describe("[Register]", function(){
	describe("[router]", function(){
		describe("POST - ['/']", function(){
			it("Should return a signed json web token", function(){
				var hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var username = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);

				var payload = {
					"email": hash + "@test.com",
					"fullname": hash,
					"username": username,
					"password": hash
				};
				return chakram.post("http://localhost:4200/api/v1/register", payload).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.results).to.be.a("array");
					expect(response.response.body.results[0]).to.have.key("token");
					expect(response.response.body.results[0]["token"]).to.be.a("string");
				});
			});
			it("Should return an error saying the username and email already exists", function(){
				var hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var username = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				var payload = {
					"email": hash + "@test.com",
					"fullname": hash,
					"username": username,
					"password": hash
				};
				return chakram.post("http://localhost:4200/api/v1/register", payload).then((response) => {
					return chakram.post("http://localhost:4200/api/v1/register", payload);
				}).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.errors).to.be.a("array");
					expect(response.response.body.errors[0]).to.have.property("message");
					expect(response.response.body.errors[0]["message"]).to.have.lengthOf(2);
					expect(response.response.body.errors[0]["message"][0]["message"]).to.be.a("string");
					expect(response.response.body.errors[0]["message"][0]["property_name"]).to.be.a("string");
					expect(response.response.body.errors[0]["message"][1]["message"]).to.be.a("string");
					expect(response.response.body.errors[0]["message"][1]["property_name"]).to.be.a("string");
					expect(response.response.body.errors[0]["message"][0]["message"]).to.eql("Username already exists");	
					expect(response.response.body.errors[0]["message"][0]["property_name"]).to.eql("username");	
					expect(response.response.body.errors[0]["message"][1]["message"]).to.eql("Email already exists");	
					expect(response.response.body.errors[0]["message"][1]["property_name"]).to.eql("email");	
				});
			});
			it("Should return an error saying the username already exists", function(){
				var hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var username = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				var payload = {
					"email": hash + "@test.com",
					"fullname": hash,
					"username": username,
					"password": hash
				};
				return chakram.post("http://localhost:4200/api/v1/register", payload).then((response) => {
					payload["email"] = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "@test.com";
					return chakram.post("http://localhost:4200/api/v1/register", payload);
				}).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.errors).to.be.a("array");
					expect(response.response.body.errors[0]).to.have.property("message");
					expect(response.response.body.errors[0]["message"]).to.have.lengthOf(1);
					expect(response.response.body.errors[0]["message"][0]["message"]).to.be.a("string");
					expect(response.response.body.errors[0]["message"][0]["message"]).to.eql("Username already exists");	
				});
			});
			it("Should return an error saying the email already exists", function(){
				var hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var username = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
				var payload = {
					"email": hash + "@test.com",
					"fullname": hash,
					"username": username,
					"password": hash
				};
				return chakram.post("http://localhost:4200/api/v1/register", payload).then((response) => {
					payload["username"] = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 10);
					return chakram.post("http://localhost:4200/api/v1/register", payload);
				}).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.errors).to.be.a("array");
					expect(response.response.body.errors[0]).to.have.property("message");
					expect(response.response.body.errors[0]["message"]).to.have.lengthOf(1);
					expect(response.response.body.errors[0]["message"][0]["message"]).to.be.a("string");
					expect(response.response.body.errors[0]["message"][0]["message"]).to.eql("Email already exists");	
				});
			});
			it("Should return an error saying all values are not valid", function(){
				var hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				var payload = {
					"email": hash,
					"fullname": hash + hash + hash,
					"username": "test__   _",
					"password": hash + hash + hash
				};
				return chakram.post("http://localhost:4200/api/v1/register", payload).then((response) => {
					expect(response.response.body).to.have.keys("success", "errors", "results");
					expect(response.response.body.errors).to.be.a("array");
					expect(response.response.body.errors[0]).to.have.property("message");
					expect(response.response.body.errors[0]["message"]).to.have.lengthOf(4);
					expect(response.response.body.errors[0]["message"][0]["message"]).to.be.a("string");
					expect(response.response.body.errors[0]["message"][0]["message"]).to.eql("Email is not valid");	
					expect(response.response.body.errors[0]["message"][1]["message"]).to.be.a("string");
					expect(response.response.body.errors[0]["message"][1]["message"]).to.eql("Username is not valid");	
					expect(response.response.body.errors[0]["message"][2]["message"]).to.be.a("string");
					expect(response.response.body.errors[0]["message"][2]["message"]).to.eql("Full Name is not valid");	
					expect(response.response.body.errors[0]["message"][3]["message"]).to.be.a("string");
					expect(response.response.body.errors[0]["message"][3]["message"]).to.eql("Password is not valid");	
				});
			});
		});
	});
});
