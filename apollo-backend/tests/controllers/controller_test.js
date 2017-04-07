var controller = require('../../controllers/controller');

describe("[ Controller ]", function(){
	describe("<responseObject>::setSuccess", function(){
		it("Should set the state of success given", function(){
			var response = new controller.responseObject();
			response.setSuccess(true);
			expect(response._response.success).to.equal(true); 
		});
	});

	describe("<responseObject>::setErrors", function(){
		it("Should set the errors given", function(){
			var response1 = new controller.responseObject();
			response1.setErrors({});
			expect(response1._response.errors).to.be.a('array');
			expect(response1._response.errors).to.have.length(1); 
			var response2 = new controller.responseObject();
			response2.setErrors([{}, {}, {}]);
			expect(response2._response.errors).to.be.a('array');
			expect(response2._response.errors).to.have.length(3); 
		});
	});

	describe("<responseObject>::toJSON", function(){
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
