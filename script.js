
$(document).ready(function(){

	var timer = 0;
	var blur;
	var digit = "";
	var pressed=false;
	var shift = false;

	$(document).keydown(function(e) {
		if(!pressed){
			checkKey(e.keyCode);
		}
	}).keypress(function(e){
		if(!pressed){
			digit = String.fromCharCode(e.keyCode);		
			typeKey(digit);
			console.log('keypress',digit);
		}
	}).keyup(function(e) {
		if(!shift && pressed){
			clearInterval(blur);
			timer = 0; 
			$('.char').removeAttr('id');
			console.log('stop');
			pressed = false;
		}else{
			shift = false;
		}
	});


	function checkKey(data){
		switch (data) {
		  case 8: //delete
		  {
	  		$('#cursor').prev().addClass('strike');
	  		$('#cursor').insertBefore($('#cursor').prev());	
	  		break;
		  }
		  case 16: //shift
		  {
	    	shift = true;
	    	console.log('shift');
		    break;
		  };
		  case 32: //space bar
		  {
	  		$('#cursor').before('<div class="char">&nbsp;</div>');
	  		break;
		  };
		  case 37://left arrow
		  {
	    	$('#cursor').insertBefore($('#cursor').prev());
	      	break;
		  };
		  case 39://right arrow
		  {
	    	$('#cursor').insertAfter($('#cursor').next());
	      	break;
		  };
		};
	}

	function typeKey(char){
		pressed = true;
		$('#cursor').before('<div class="char" id="pressed">'+char+'</div>');
		blur = setInterval(charBlur, 50);
	}

	function charBlur(){
		timer++;
		var param;
		if(timer<40){
			param = 20-timer/2;
		}else{
			param = 0;
		}
		$('#pressed').css('filter','blur(' + param +'px)');
	}


});
