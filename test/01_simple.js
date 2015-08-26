var
	spritz = require('spritz'),
	http   = require('http');

spritz.start({port:8082});
spritz.use(require('../jstemplate'),{viewDir:"test/views"});
spritz.on('/',function(req,res){
	spritz.template(req,res,'01.jst',{name:process.env.LOGNAME},200,{'content-type':'text/plain'});
});

// Test it
setTimeout(function(){

	http.get("http://127.0.0.1:8082", function(res) {
		var cont;
		res.on('data',function(c){
			cont = cont ? Buffer.concat([cont,c]) : c;
		});
		res.on('end',function(){
			if ( !cont || !cont.toString() ) {
				console.log("Got no content");
				return process.exit(-1);
			}
			if ( cont.toString().trim() != "Hello "+process.env.LOGNAME ) {
				console.log("Invalid output. Got: ",cont.toString().trim());
				return process.exit(-1);
			}

			console.log("OK");
			return process.exit(0);
		});
	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
		return process.exit(-1);
	});

},1000);
