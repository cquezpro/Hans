/*---Copyright by: Matthias Zubke, 75196 Remchingen, Germany--*/
var currLang = 0;

//Cordova library ready function
document.addEventListener("deviceready", onDeviceReady, false);

onDeviceReady();//We need to call this function directly for web version.

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
	
}