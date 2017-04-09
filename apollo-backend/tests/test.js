var testsRunningInNode = (typeof global !== "undefined" ? true : false),
    chakram = (testsRunningInNode ? global.chakram : window.chakram),
    expect = (testsRunningInNode ? global.expect : window.expect);

function importTest(name, path){
    describe(name, function(){
        require(path); 
    });
}

describe("[===Apollo Backend API Test Cases===]", function(){
	importTest("[===SERVICES===]", "./services/index.js");
	importTest("[===CONTROLLERS===]", "./controllers/index.js");
});
