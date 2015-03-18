/*---Copyright by: Matthias Zubke, 75196 Remchingen, Germany--*/

var currLang = 0;
var questionList = [];

//Cordova library ready function
document.addEventListener("deviceready", onDeviceReady, false);

onDeviceReady();//We need to call this function directly for web version.

loadQuestionJSONFile();//Load de_Questions_AB2.json file

//Name: onDeviceReady
//Comment: 
//1. Get last language from local storage after run app
//2. After get language, change language
function onDeviceReady(){
    var currLang1 = window.localStorage.getItem("currLang");
    if(currLang1 == null){
        currLang = 0;
    }else{
        currLang = window.localStorage.getItem("currLang");
    }

    changeLanguage();
 }

//Name: Home page show (jquery mobile  function)
//Comment: 
//1. This function will call when show home page. 
//2. Localization with current language
$(document).on("pageshow", "#home", function(event) {
	changeLanguage();
});


//Name: Input page show (jquery mobile  function)
//Comment: 
//1. This function will call when show input page. 
//2. Localization with current language
$(document).on("pageshow", "#input", function(event) {
	changeLanguage();
});

//Name: Options page show (jquery mobile  function)
//Comment: 
//1. This function will call when show options page. 
//2. Localization with current language
//3. Change language of app when change language control.
$(document).on("pageshow", "#options", function(event) {
	$("#multilang").val(currLang);
    $("#multilang").selectmenu('refresh');
	changeLanguage();
	$("#multilang").change(function(){
	       currLang = $(this).val();
	       window.localStorage.setItem("currLang", currLang);
	       changeLanguage();
	});
});


$(document).on("pageshow", "#mealtype1", function(event) {
	changeLanguage();
});

$(document).on("pageshow", "#mealtype2", function(event) {
	changeLanguage();
});

$(document).on("pageshow", "#mealtype3", function(event) {
	changeLanguage();
});


/***********
	Load Question Page
	Test Phase: Show Questions about Hunger
************/
$(document).on("pageshow", "#question", function(event) {
	changeLanguage();
	$("input[type='radio']").checkboxradio();
	$("input[type='radio']").checkboxradio("refresh");
	for(var i=0;i<questionList.length;i++) {
		var question = questionList[i]; 
		if(question._id == "KHunger") {
			$("#question #title").html(question.Titel);
			$("#question .A1 h2").html(question.A1);
			$("#question .A2 h2").html(question.A2);
			$("#question .A3 h2").html(question.A3);
			$("#question .A4 h2").html(question.A4);
			$("#question .A5 h2").html(question.A5);
			$("#question .A6 h2").html(question.A6);
			$("#question .A7 h2").html(question.A7);
			$("#question .A8 h2").html(question.A8);
			$("#question .A9 h2").html(question.A9);
			$("#question .A10 h2").html(question.A10);
			
			if(question.A1.length < 1){
				$("#question .A1").hide();
			}
			if(question.A2.length < 1){
				$("#question .A2").hide();
			}
			if(question.A3.length < 1){
				$("#question .A3").hide();
			}
			if(question.A4.length < 1){
				$("#question .A4").hide();
			}
			if(question.A5.length < 1){
				$("#question .A5").hide();
			}
			if(question.A6.length < 1){
				$("#question .A6").hide();
			}
			if(question.A7.length < 1){
				$("#question .A7").hide();
			}
			if(question.A8.length < 1){
				$("#question .A8").hide();
			}
			if(question.A9.length < 1){
				$("#question .A9").hide();
			}
			if(question.A10.length < 1){
				$("#question .A10").hide();
			}
		}
	}	
});

//Name: changeLanguage
//Comment: 
//1. Localization with current language
//2. Add class all elements need to be translated.
function changeLanguage(){
	//home page 
	$('.vHome').html(langLabel[currLang].vHome);
	$('.vEmergency').html(langLabel[currLang].vEmergency);
	$('.vInput').html(langLabel[currLang].vInput);
	$('.vEvaluation').html(langLabel[currLang].vEvaluation);
	$('.vGoalDay').html(langLabel[currLang].vGoalDay);
	$('.vGoalWeek').html(langLabel[currLang].vGoalWeek);
	$('.vTraining').html(langLabel[currLang].vTraining);
	$('.vHelp').html(langLabel[currLang].vHelp);
	$('.vOptions').html(langLabel[currLang].vOptions);

	//option page	
	$('.vTraining').html(langLabel[currLang].vTraining);
	$('.vEvaluation').html(langLabel[currLang].vEvaluation);
	$('.vOptions').html(langLabel[currLang].vOptions);
	$('.vMedicine').html(langLabel[currLang].vMedicine);
	$('.vBloodPressure').html(langLabel[currLang].vBloodPressure);
	$('.vBloodSugar').html(langLabel[currLang].vBloodSugar);
	$('.vInsulinMeasure').html(langLabel[currLang].vInsulinMeasure);
	$('.vNeverDrinkAlc').html(langLabel[currLang].vNeverDrinkAlc);
	$('.vLanguage').html(langLabel[currLang].vLanguage);
	$('.vWeight').html(langLabel[currLang].vWeight);
	$('.vNumber').html(langLabel[currLang].vNumber);
	$('.vAmount').html(langLabel[currLang].vAmount);
	
	//input page
	$('.vTraining').html(langLabel[currLang].vTraining);
	$('.vEvaluation').html(langLabel[currLang].vEvaluation);
	$('.vLastMeal').html(langLabel[currLang].vLastMeal);
	$('.vLunch').html(langLabel[currLang].vLunch);
	$('.vMeal').html(langLabel[currLang].vMeal);
	$('.vDrinking').html(langLabel[currLang].vDrinking);
	$('.vFruit').html(langLabel[currLang].vFruit);
	$('.vVegetable').html(langLabel[currLang].vVegetable);
	$('.vExercize').html(langLabel[currLang].vExercize);
	$('.vMedicine').html(langLabel[currLang].vMedicine);
	$('.vBloodPressure').html(langLabel[currLang].vBloodPressure);
	$('.vBloodSugar').html(langLabel[currLang].vBloodSugar);
	$('.vInsulin').html(langLabel[currLang].vInsulin);
	$('.vDailynote').html(langLabel[currLang].vDailynote);
	$('.vWeight').html(langLabel[currLang].vWeight);
	$('.vCompleteDay').html(langLabel[currLang].vCompleteDay);	

	//Mean type page
	$('.vLastMeal').html(langLabel[currLang].vLastMeal);
	$('.vLunch').html(langLabel[currLang].vLunch);
	$('.vSelectType').html(langLabel[currLang].vSelectType);
	$('.vBBreakfast').html(langLabel[currLang].vBBreakfast);
	$('.vBreakfast').html(langLabel[currLang].vBreakfast);
	$('.vABreakfast').html(langLabel[currLang].vABreakfast);
	$('.vLunch').html(langLabel[currLang].vLunch);
	$('.vALunch').html(langLabel[currLang].vALunch);
	$('.vDinner').html(langLabel[currLang].vDinner);
	$('.vADinner').html(langLabel[currLang].vADinner);
	$('.vMealHistory').html(langLabel[currLang].vMealHistory);
}


/*****************
Load JSON File
json file path: data/de_Questions_AB2.json
******************/
function loadQuestionJSONFile() {
	$.getJSON("data/de_Questions_AB2.json", function( data ) {
		questionList = data.Standardfragen_de.Frage;
		//alert(questionList.length);
	});
}