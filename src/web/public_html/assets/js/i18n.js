i18n_lang='en';
i18n_dict={
	"en":{
		"play_again":"Play Again",
		"play":"Play",
		"my_rank":"Your final length was",
		"tips":[
			"When longer, hold the mouse for a speed boost!",
			"Don't run into other snakes!",
			"Eat to grow longer!"
		]
	},
	"ru":{
		"play_again":"Играть еще раз",
		"play":"Играть",
		"my_rank":"Ваша конечная длина была",
		"tips":[
			"Кликни мышь для повышения скорости!",
			"Не попадитесь другим змеям!",
			"Ешьте, чтобы расти!"
		]
	}
};
i18n_lang = (window.navigator.userLanguage || window.navigator.language || 'en').split('-')[0];
if(!i18n_dict.hasOwnProperty(i18n_lang)){
	i18n_lang = 'en';
}
i18n=i18n_dict[i18n_lang];
function parseString(tag,token,arr){
	var finalText = i18n[tag];
	for(i = 0; i < arr.length; i++){
		finalText = finalText.replace(token,arr[i]);
	}
	return finalText;
}
window["parseString"] = parseString;