let express = require('express');
let exec = require('child_process').exec;
let app = express();


app.get('/', (req, res, next)=>{
	var limit = (req.query.limit)?req.query.limit:10;
	exec(`python3 proxies.py --limit ${limit}`,{windowsHide :true}, (err, stdout, stderr) => {
	  if (err) {
	    res.status(401).json({status: 'error', message: 'error', data: err});
	    return;
	  }
	  var proxies = stdout.split('\n');
	  console.log( 'proxies', proxies );
	  res.json({status: 'success', message: 'Successfully', data: proxies});
	});
});

app.listen(4444, (err, data)=>{
	console.log("start at 4444...");
})