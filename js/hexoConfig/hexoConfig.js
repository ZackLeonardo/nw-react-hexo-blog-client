
var html = new EJS({url: 'hexoConfig.ejs'}).render(data);
$("#container").html(html);//

var data = {	title:	'Cleaning Supplies',
           supplies:	['mop', 'broom', 'duster']	};
