const userUtil = require("./userUtil");

const userService = {
		createUser: userUtil.createUser((res)=>{
			res.send("done");
		})	
		
}

module.export = userService;