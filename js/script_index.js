var popup = document.querySelector(".popup-letter");
var popupOpen = document.querySelector(".contacts__button");
var popupClose = document.querySelector(".popup-letter__button-close");

popupOpen.addEventListener("click", function(evt){
	evt.preventDefault();
	popup.classList.add("popup--show");
})

popupClose.addEventListener("click", function(){
	popup.classList.remove("popup--show");
})