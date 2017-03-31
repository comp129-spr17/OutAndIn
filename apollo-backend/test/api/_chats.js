describe('API: Chats Resource', function(){
    it('GET: Should return a list of users', function(){
        var response = chakram.get('http://localhost:4200/api/v1/users');
        expect(response).to.have.json('header.object', "user");
        expect(response).to.have.json('body.list', []);
        expect(response).to.have.status(200)
        return chakram.wait();

        /*
        var missing = chakram.delete('http://localhost:4200/api/v1/users');
        return chakram.waitFor([
            expect(missing).to.have.status(404),
            expect(response).to.have.status(200)
        ]);
        */
    });
});
