var authService = require('../../services/authentication');

describe("[Authentication]", function(){
	describe("generateSessionToken", function(){
		it("Should generate a session token", function(){
			var sessionToken = authService.generateSessionToken();
			expect(sessionToken).to.be.a("string");
			expect(sessionToken).to.have.lengthOf(64);
			var re = /[0-9A-Fa-f]{6}/g;
			expect(sessionToken).to.satisfy(function(hexString){ return re.test(hexString) });
		});
	});

	describe("generateJWT", function(){
		it("Should generate a JSON Web Token", function(){
			var uuid = "343e9a9a-8db7-474f-a49c-cf9e7737acab";
			var token = authService.generateJWT(uuid);
			expect(token).to.be.a('string');
		});
	});

	describe("hashPassword", function(){
		it("Should generate bcrypt hash", function(){
			var password = "test";
			var hashedPassword = authService.hashPassword(password);
			expect(hashedPassword).to.be.a('string');
		});
	});

	describe("comparePasswordAndHash", function(){
		it("Should verify plain text password and bcrypt hash match", function(){
			var password = "test";
			var hashedPassword = "$2a$10$XYlUdUbuwfJ7HoyX1eCoq.0/pzrhFkpcExusg0u9E9m6ihoy.4pdS";
			var result = authService.comparePasswordAndHash(password, hashedPassword);
			expect(result).to.be.true;
		});
	});
});
