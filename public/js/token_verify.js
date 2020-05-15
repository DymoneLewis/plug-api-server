var jwt = require('jsonwebtoken');
var signkey = 'mes_qdhd_mobile_xhykjyxgs';

exports.tokenSetter = function(username,userid){
	return new Promise((resolve,reject)=>{
		const token = jwt.sign({
			name:username,
			_id:userid
		},signkey,{ expiresIn:'1h' });
		resolve(token);
	})
}

exports.tokenVerify = function(token){
	return new Promise((resolve,reject)=>{
		var info = jwt.verify(token.split(' ')[1],signkey);
		resolve(info);
	})
}