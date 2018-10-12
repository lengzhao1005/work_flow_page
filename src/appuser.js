module.exports = {
	login: function(userInfo){
		localStorage.setItem('AppUser', JSON.stringify({
			'isLogin': true, 
			'userInfo': userInfo
		}));
	}, 
	logout: function(){
		localStorage.setItem('AppUser', JSON.stringify({
			'isLogin': false, 
			'userInfo': {}
		}));
	}, 
	getData: function(){
		return JSON.parse(localStorage.getItem('AppUser'));
	}, 
	isLogin: function(){
		var appUser = JSON.parse(localStorage.getItem('AppUser'));
		if(appUser){
			return appUser.isLogin === true;
		}
		
		return false;
	}
}