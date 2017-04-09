var controller = require('../../controllers/controller');

describe("[Users]", function(){
	describe("[router]", function(){
		describe("GET - ['/']", function(){
			it("Initial State - Should return a default response object", function(){
				var response = new controller.responseObject();
				expect(response.toJSON()).to.have.all.keys("success", "errors", "results");
				expect((response.toJSON())["success"]).to.eql(false); 
				expect((response.toJSON())["errors"]).to.eql(null); 
				expect((response.toJSON())["results"]).to.eql(null); 
			});
			it("Populated State - Should not return a default response object", function(){
				var response = new controller.responseObject();
				response._response.success = true;
				response._response.errors = [{}, {}, {}];
				response._response.results = [{}, {}, {}];
				expect(response.toJSON()).to.have.all.keys("success", "errors", "results");
				expect((response.toJSON())["success"]).to.eql(true);
				expect((response.toJSON())["errors"]).to.have.length(3);
				expect((response.toJSON())["errors"]).to.be.a('array');
				expect((response.toJSON())["results"]).to.have.length(3);
				expect((response.toJSON())["results"]).to.be.a('array');
			});
		});
	});
});
