/*---Copyright by: Matthias Zubke, 75196 Remchingen, Germany--*/

var currLang = 0;
var questionList = [];
var mealHistoryList = [];

//Cordova library ready function
document.addEventListener("deviceready", onDeviceReady, false);

onDeviceReady();//We need to call this function directly for web version.

loadQuestionJSONFile();//Load de_Questions_AB2.json file

//Define Meal Type
var MEAL_TYPE = {
	None: 0,
	Fastlane : 1,
	BBreakfast : 2,
	Breakfast : 3,
	ABreakfast : 4,
	Lunch : 5,
	ALunch : 6,
	Dinner : 7,
	ADinner : 8
};

var MealTypes = ["None","Fastlane","BBreakfast","Breakfast","ABreakfast","Lunch","ALunch","Dinner","ADinner"];

var MealTypeClass = ["None","vFastlane","vBBreakfast","vBreakfast","vABreakfast","vLunch","vALunch","vDinner","vADinner"];

//Define Mood status
var MOOD = {
	Bad : 0,
	Normal : 1,
	Good : 2
}

//Save latest Meal type on the local storage




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

	$("#input .lastMeal").removeClass().addClass("lastMeal");
	var lastMealType = window.localStorage.getItem("lastmeal");
	
	var mealString = "";
	
	if(lastMealType == undefined || lastMealType == null) {
		
	}else{
		$("#input .lastMeal").addClass(MealTypeClass[lastMealType]);
	}
	
	changeLanguage();
});

//Show date picker control to change date.
function showDatePicker() {
	$("#datePicker").datepicker("show");
}

$(document).on("change", "#input #datePicker", function(event) {
	//alert($(this).val());
	var currentDate = window.localStorage.getItem("date");
	
	window.localStorage.setItem("date", $(this).val());
	$("#input #date").html($(this).val());
	
	//Reset data
	mealHistoryList = [];
	window.localStorage.setItem("currentMeal", "");
	window.localStorage.setItem("lastmeal", "");
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


//MealType Page Show Events
$(document).on("pageshow", "#mealtype", function(event) {
	
	//alert(MEAL_TYPE.ADinner);
	
	//Decide the available meal type
	var lastMealType = window.localStorage.getItem("lastmeal");
	var mealString = "";
	
	$("#mealtype .lastMeal").removeClass().addClass("lastMeal");		
	
	if(lastMealType == undefined || lastMealType == null || lastMealType == "") {
		lastMealType = MEAL_TYPE.None;
	}else{
		$("#mealtype .lastMeal").addClass(MealTypeClass[lastMealType]);
	}
	
	if(lastMealType == MEAL_TYPE.None && lastMealType != MEAL_TYPE.Fastlane) {
		mealString += '<li class="fastlane" style="padding: 20px;">';
		mealString += '	<div class="ui-btn-left">';
		mealString += '		<h2 class="vFastlane">Fastlane</h2>';
		mealString += '	</div>';
		mealString += '	<div class="ui-btn-right" style="right: 105px;top:10px">';
		mealString += '		<div data-role="controlgroup" data-type="horizontal">';
		mealString += '			<input name="meal" type="radio" style="margin-left:70px;"/>';
		mealString += '		</div>';
		mealString += '	</div>';
		mealString += '</li>';
	}
	
	if(lastMealType == MEAL_TYPE.None && lastMealType != MEAL_TYPE.Fastlane) {
		mealString += '<li class="bbreakfast" style="padding: 20px;">';
		mealString += '	<div class="ui-btn-left">';
		mealString += '		<h2 class="VBBreakfast">Before breakfast</h2>';
		mealString += '	</div>';
		mealString += '	<div class="ui-btn-right" style="right: 105px;top:10px">';
		mealString += '		<div data-role="controlgroup" data-type="horizontal">';
		mealString += '			<input name="meal" type="radio" style="margin-left:70px;"/>';
		mealString += '		</div>';
		mealString += '	</div>';
		mealString += '</li>';
	}
	
	if(lastMealType < MEAL_TYPE.Breakfast && lastMealType != MEAL_TYPE.Fastlane) {
		mealString += '<li class="breakfast" style="padding: 20px;">';
		mealString += '	<div class="ui-btn-left">';
		mealString += '		<h2 class="vBreakfast">Breakfast</h2>';
		mealString += '	</div>';
		mealString += '	<div class="ui-btn-right" style="right: 105px;top:10px">';
		mealString += '		<div data-role="controlgroup" data-type="horizontal">';
		mealString += '			<input name="meal" type="radio" style="margin-left:70px;"/>';
		mealString += '		</div>';
		mealString += '	</div>';
		mealString += '</li>';
	}
	
	if(lastMealType <= MEAL_TYPE.ABreakfast && lastMealType != MEAL_TYPE.Fastlane) {
		mealString += '<li class="abreakfast" style="padding: 20px;">';
		mealString += '	<div class="ui-btn-left">';
		mealString += '		<h2 class="vABreakfast">After breakfast</h2>';
		mealString += '	</div>';
		mealString += '	<div class="ui-btn-right" style="right: 105px;top:10px">';
		mealString += '		<div data-role="controlgroup" data-type="horizontal">';
		mealString += '			<input name="meal" type="radio" style="margin-left:70px;"/>';
		mealString += '		</div>';
		mealString += '	</div>';
		mealString += '</li>';
	}
	
	if(lastMealType < MEAL_TYPE.Lunch && lastMealType != MEAL_TYPE.Fastlane) {
		mealString += '<li class="lunch" style="padding: 20px;">';
		mealString += '	<div class="ui-btn-left">';
		mealString += '		<h2 class="vLunch">Lunch</h2>';
		mealString += '	</div>';
		mealString += '	<div class="ui-btn-right" style="right: 105px;top:10px">';
		mealString += '		<div data-role="controlgroup" data-type="horizontal">';
		mealString += '			<input name="meal" type="radio" style="margin-left:70px;"/>';
		mealString += '		</div>';
		mealString += '	</div>';
		mealString += '</li>';
	}
	
	if(lastMealType <= MEAL_TYPE.ALunch && lastMealType != MEAL_TYPE.Fastlane) {
		mealString += '<li class="alunch" style="padding: 20px;">';
		mealString += '	<div class="ui-btn-left">';
		mealString += '		<h2 class="vALunch">After lunch</h2>';
		mealString += '	</div>';
		mealString += '	<div class="ui-btn-right" style="right: 105px;top:10px">';
		mealString += '		<div data-role="controlgroup" data-type="horizontal">';
		mealString += '			<input name="meal" type="radio" style="margin-left:70px;"/>';
		mealString += '		</div>';
		mealString += '	</div>';
		mealString += '</li>';
	}
	
	if(lastMealType < MEAL_TYPE.Dinner && lastMealType != MEAL_TYPE.Fastlane) {
		mealString += '<li class="dinner" style="padding: 20px;">';
		mealString += '	<div class="ui-btn-left">';
		mealString += '		<h2 class="vDinner">Dinner</h2>';
		mealString += '	</div>';
		mealString += '	<div class="ui-btn-right" style="right: 105px;top:10px">';
		mealString += '		<div data-role="controlgroup" data-type="horizontal">';
		mealString += '			<input name="meal" type="radio" style="margin-left:70px;"/>';
		mealString += '		</div>';
		mealString += '	</div>';
		mealString += '</li>';
	}	
	
	if(lastMealType <= MEAL_TYPE.ADinner && lastMealType != MEAL_TYPE.Fastlane) {
		mealString += '<li class="adinner" style="padding: 20px;">';
		mealString += '	<div class="ui-btn-left">';
		mealString += '		<h2 class="vADinner">After dinner</h2>';
		mealString += '	</div>';
		mealString += '	<div class="ui-btn-right" style="right: 105px;top:10px">';
		mealString += '		<div data-role="controlgroup" data-type="horizontal">';
		mealString += '			<input name="meal" type="radio" style="margin-left:70px;"/>';
		mealString += '		</div>';
		mealString += '	</div>';
		mealString += '</li>';
	}
	
	$("#mealtypeList").html(mealString);
	
	$("#mealtypeList input[type='radio']").checkboxradio();
	$("#mealtypeList input[type='radio']").checkboxradio("refresh");
	//$( "#mealtypeList #fastlaneRdo" ).prop( "checked", true ).checkboxradio( "refresh" );
	$( "#mealtypeList" ).listview( "refresh" );
	
	
	var historyString = "";
	//Load meal history
	for(var i = 0; i < mealHistoryList.length; i++){
		var mealHistory = mealHistoryList[i];
		
		className = MealTypeClass[mealHistory.mealtype];
		mealtype = MealTypes[mealHistory.mealtype];
		
		var imgSrc = "better.png";
		if(mealHistory.status <= 2.9){
			imgSrc = "bad.png"
		}else if (mealHistory.status <= 3.9){
			imgSrc = "good.png"
		}else{
			imgSrc = "better.png"
		}
		
		historyString += '<li class="history">';
		historyString += '	<a href="#" style="">';
		historyString += '		<h2  class="' + className  + '">' + mealtype + '</h2>';
		historyString += '		<img src="res/' + imgSrc + '" alt="good" />';
		historyString += '	</a>';
		historyString += '</li>';
	}
	
	$("#mealhistoryList").html(historyString);
	$("#mealhistoryList" ).listview( "refresh" );
	
	changeLanguage();
});

$(document).on("click", "#mealtype #mealtypeList li", function(event) {
	var className = $(this).attr("class");
	console.log(className);	
	if($(this).hasClass("fastlane")) {
		window.localStorage.setItem("currentMeal", MEAL_TYPE.Fastlane);
	}
	if($(this).hasClass("bbreakfast")) {
		window.localStorage.setItem("currentMeal", MEAL_TYPE.BBreakfast);
	}
	if($(this).hasClass("breakfast")) {
		window.localStorage.setItem("currentMeal", MEAL_TYPE.Breakfast);
	}
	if($(this).hasClass("abreakfast")) {
		window.localStorage.setItem("currentMeal", MEAL_TYPE.ABreakfast);
	}
	if($(this).hasClass("lunch")) {
		window.localStorage.setItem("currentMeal", MEAL_TYPE.Lunch);
	}
	if($(this).hasClass("alunch")) {
		window.localStorage.setItem("currentMeal", MEAL_TYPE.ALunch);
	}
	if($(this).hasClass("dinner")) {
		window.localStorage.setItem("currentMeal", MEAL_TYPE.Dinner);
	}
	if($(this).hasClass("adinner")) {
		window.localStorage.setItem("currentMeal", MEAL_TYPE.ADinner);
	}
	
	$.mobile.changePage("#question");
});



/***********
	Load Question Page
	Test Phase: Show Questions about Hunger
************/
$(document).on("pageshow", "#question", function(event) {
	
	currentMeal = window.localStorage.getItem("currentMeal");
	
	$("#question .currentmeal").removeClass().addClass("currentmeal");
	$("#question .currentmeal").addClass(MealTypeClass[currentMeal]);

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
	
	$("#mealtypeList input[type='radio']").checkboxradio();
	$("#mealtypeList input[type='radio']").checkboxradio("refresh");	
});

//Question Page Click Event
//We will get the number of question.
$(document).on("click", "#question #questionList li", function(event) {
	console.log($(this).index());
	var statusNum = $(this).index() - 1;
	currentMeal = window.localStorage.getItem("currentMeal");
	
	window.localStorage.setItem("lastmeal", currentMeal);
	
	mealHistoryList.push({
		mealtype : currentMeal,
		status : statusNum		
	});
	
	$.mobile.changePage("#input");
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
	
	$('.vFastlane').html(langLabel[currLang].vFastlane);
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
	
	//Question Page
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

