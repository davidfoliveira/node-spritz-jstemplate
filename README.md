# spritz-jstemplate - A [JSTemplate](https://www.npmjs.com/package/jstemplate) templating module for [Spritz web framework](https://www.npmjs.com/package/spritz)

# How to use

var
	spritz = require('spritz');

// Use it!
spritz.use(require('spritz-jstemplate'));

// On a route
spritz.on('/',function(req,res){
	spritz.template(req,res,'file',{my:'args'},200,{'content-type':'text/html; charset=UTF-8'});
});
