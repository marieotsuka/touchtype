
$(document).ready(function(){
	var pressed=false;
	var shift = "";
	var allowed = true;
	var animate = true;
	var timer = 0;
	var scale;
	var charCheck;
	$(document).click(function(){
		$("#input").focus();
	});

	$(document).keydown(function(e) {
		

		var key = String.fromCharCode(e.keyCode);
		console.log(e.keyCode);
		console.log(key);

		if (e.keyCode ===32){
			$('#cursor').before('<div class="char">&nbsp;</div>');
		}
		else if (e.keyCode ===8){
			$('#cursor').prev().addClass('strike');
			$('#cursor').insertBefore($('#cursor').prev());				
		}
		else if (e.keyCode ===39){
			$('#cursor').insertAfter($('#cursor').next());
		}
		else if (e.keyCode ===37){
			$('#cursor').insertBefore($('#cursor').prev());
		}
		else if (!pressed){ //play char!
			console.log('pressed');
			pressed = true;
			$('#cursor').before('<div class="char" id="pressed">'+key+'</div>');
			scale = setInterval(charBlur, 50);
		}else if (!pressed){
			displayError();
		}
	}).keyup(function(e) { 
		clearInterval(scale);
		timer = 0;
		console.log('stop');
		if(pressed = true){ 
			$('.char').removeAttr('id');
			console.log('stop');
			pressed = false;
		}
	});

	function charBlur(){
		timer++;
		var param;
		if(timer<40){
			param = 20-timer/2;
		}else{
			param = 0;
		}
		console.log(param);
		$('#pressed').css('filter','blur(' + param +'px)');
	}


});
