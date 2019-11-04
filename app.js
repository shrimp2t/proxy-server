let express = require('express');
let exec = require('child_process').exec;
let app = express();


app.get('/', (req, res, next)=>{
	var limit = (req.query.limit)?req.query.limit:1;
	var country = (req.query.country)?req.query.country:"US";
	var types = (req.query.types)?req.query.types:"HTTPS SOCKS4 SOCKS5";
	exec(`proxybroker find --countries ${country} --types ${types} --lvl High --strict -l ${limit}`,{windowsHide :true}, (err, stdout, stderr) => {
	  if (err) {
	    res.status(401).json({status: 'error', message: 'error', data: err});
	    return;
	  }
	  var proxies = stdout.split('\r');
	  proxies = proxies.map((proxy)=>{
		proxy = proxy.replace(/[<>]/g, '').replace(/, /g, ',').split(' ');  	
		return {country: proxy[1],type: proxy[3], proxy: proxy[4]};
	  });
	  res.json({status: 'success', message: 'Successfully', data: proxies});
	  //console.log(proxies);
	});
});

app.listen(3000, (err, data)=>{
	console.log("start at 3000...");
})