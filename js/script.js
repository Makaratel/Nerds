var popup = document.querySelector(".popup-letter");
var popupOpen = document.querySelector(".contacts__button");
var popupClose = document.querySelector(".popup-letter__button-close");
var form = document.querySelector(".popup-letter__form");
var formName = form.querySelector("[name = surname]");
var formMail = form.querySelector("[name = email]");
var formText = form.querySelector("[name = text]");

popupOpen.addEventListener("click", function(evt){
	evt.preventDefault();
	popup.classList.add("popup--show");
})

popupClose.addEventListener("click", function(){
	popup.classList.remove("popup--show");
})

var testError = function(field, form, evt){
	if(field.value.length < 1){
		evt.preventDefault();
		form.classList.remove("popup--error");
		form.classList.add("popup--error");
		field.classList.add("invalid");
	}
}

form.addEventListener("submit", function(evt){
	testError(formName, form, evt);
	testError(formMail, form, evt);
	testError(formText, form, evt);
	})

var slider = document.querySelector('.price-control__scale');
var bar = document.querySelector('.price-control__bar');
var priceMin = document.querySelector('.price-control__toogle--min');
var priceMax = document.querySelector('.price-control__toogle--max');
var resultMin = document.querySelector('.price-control__input--min');
var resultMax = document.querySelector('.price-control__input--max');

//Функция оценки координат ползунка
var cordinates = function(scale, toogleMin, toogleMax, evt){
	var scaleCoords = scale.getBoundingClientRect();
	var toogleMinCoords = toogleMin.getBoundingClientRect();
	var toogleMaxCoords = toogleMax.getBoundingClientRect();

	var scaleLeft = scaleCoords.left + pageXOffset;
	var scaleLength = scale.offsetWidth - toogleMin.offsetWidth;
	var toogleMinLeft = toogleMinCoords.left + pageXOffset;
	var toogleMaxLeft = toogleMaxCoords.left + pageXOffset;
	var shift = evt.pageX - toogleMinLeft;
	var rangePriceMin = toogleMaxLeft - scaleLeft - toogleMax.offsetWidth;
	var rangePriceMax = toogleMaxLeft - scaleLeft + toogleMax.offsetWidth;

	var massiv = [scaleLeft, shift, rangePriceMin, rangePriceMax, scaleLength];
	return massiv;
}

//Минимальная цена
priceMin.onmousedown = function(evt){
	var position = cordinates(slider, priceMin, priceMax, evt);
   
	priceMin.ondragstart = function() {
    	return false;
	};
	document.onmousemove = function(evt){
   		var newLeft = evt.pageX - position[0] - position[1];
    	if(newLeft < 0) newLeft = 0;
    	if(newLeft > position[2]) newLeft = position[2];
    	priceMin.style.left = newLeft + "px";
    	var labelMin = Math.round(newLeft / position[4] * 15000);
    	resultMin.setAttribute("value", labelMin);
    	bar.style.left = newLeft + "px";
		return false;
   }
	document.onmouseup = function(){
   		document.onmousemove = null;
   }
}

//Максимальная цена
priceMax.onmousedown = function(evt){
	var position = cordinates(slider, priceMax, priceMin, evt);
	priceMax.ondragstart = function() {
    	return false;
	};
	document.onmousemove = function(evt){
   		var newRight = evt.pageX - position[0] - position[1];
    	if(newRight < position[3]) newRight = position[3];
    	if(newRight > position[4]) newRight = position[4];
    	priceMax.style.left = newRight + "px";
    	var labelMax = Math.round(newRight / position[4] * 15000);
    	resultMax.setAttribute("value", labelMax);
    	bar.style.right = 210 - newRight + "px";
		return false;
   }
	document.onmouseup = function(){
   		document.onmousemove = null;
   }
}