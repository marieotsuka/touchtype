
$(document).ready(function(){

	var timer = 0;
	var blur;
	var digit = "";
	var pressed = false;
	var shift = false;

	$(document).keydown(function(e) {
		if(!pressed){
			checkKey(e.which||e.keyCode);
			console.log(e.which);
		}
	}).keypress(function(e){
		if(!pressed){
			digit = String.fromCharCode(e.keyCode||e.which);		
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
	  		pressed = true;
	  		break;
		  }
	  	  // case 13: //enter
	  	  // {
    		// $('#cursor').before('<div class="linebreak"></div>');	
    		// break;
	  	  // }
		  case 16: //shift
		  {
	    	shift = true;
	    	console.log('shift');
		    break;
		  };
		  case 32: //space bar
		  {
	  		$('#cursor').before('<div class="char">&nbsp;</div>');
	  		pressed = true;
	  		break;
		  };
		  case 37://left arrow
		  {
	    	$('#cursor').insertBefore($('#cursor').prev());
	      	pressed = true;
	      	break;
		  };
		  case 39://right arrow
		  {
	    	$('#cursor').insertAfter($('#cursor').next());
	      	pressed = true;
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
