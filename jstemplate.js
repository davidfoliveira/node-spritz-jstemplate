var
	JSTemplate = require('jstemplate');


// Initialize
exports.init = function(args) {

	var
		self = this,
		opts = args || {};

	// Check the options hash
	if ( !opts.viewDir )
		opts.viewDir = './views';

	// Instantiate JSTemplate
	self.jst = new JSTemplate(opts);

	// Set the templating function
	self.template = function(req,res,file,dataObj,status,headers,callback){
		self.jst.process(file,dataObj,function(err,output){
			if ( err ) {
				if ( callback )
					return callback(err);
				return self.json(req,res,{error:{where:'modules.jst',detail:err}},500);
			}

			if ( !headers )
				headers = {};
			if ( !headers['content-type'] )
				headers['content-type'] = 'text/html; charset=UTF-8';

			// Send data
			self.text(req,res,output,status,headers,callback);
		});
	};

};
