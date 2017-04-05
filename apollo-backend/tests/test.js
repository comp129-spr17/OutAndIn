var testsRunningInNode = (typeof global !== "undefined" ? true : false),
    chakram = (testsRunningInNode ? global.chakram : window.chakram),
    expect = (testsRunningInNode ? global.expect : window.expect);

function importTest(name, path){
    describe(name, function(){
        require(path); 
    });
}

describe("Apollo Backend API Test Cases", function(){
    // Testing REST API Routes
	importTest("[REST API]", "./api/index.js");
	importTest("[SERVICES]", "./services/index.js");
    // Testing Service functions directly
    //importTest("Services", "./api/index.js");
});
