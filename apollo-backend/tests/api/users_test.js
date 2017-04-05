describe('Users - "/users":', function(){
    it('GET: Should return a list of users', function(){
        var response = chakram.get('http://localhost:4200/api/v1/users');
        expect(response).to.have.json('header.object', "user");
        expect(response).to.have.json('header.action', "list");
        expect(response).to.have.json('header.code', 0);
        expect(response).to.have.json('header.message', "success");
        expect(response).to.have.json('body.list', []);
        expect(response).to.have.status(200)
        return chakram.wait();
    });
    it('POST: Should return a list of users', function(){
        var response = chakram.post('http://localhost:4200/api/v1/users/create', {
            username: "testtest"
        });
        expect(response).to.have.json('header.message', "success"); 
        return chakram.wait();
    });
});
