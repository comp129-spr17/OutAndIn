var apollo = require('./apollo');

var api = new apollo();

api.usersGetAll().then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});
