

/* Accordion Menu Right */


$(document).ready(function() {
	 
	//ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.accordionButton').click(function() {

		//REMOVE THE ON CLASS FROM ALL BUTTONS
		$('.accordionButton').removeClass('on');
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordionContent').slideUp('normal');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($(this).next().is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$(this).addClass('on');
			  
			//OPEN THE SLIDE
			$(this).next().slideDown('normal');
		 } 
		  
	 });
	  
	
	/*** REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	//ADDS THE .OVER CLASS FROM THE STYLESHEET ON MOUSEOVER 
	$('.accordionButton').mouseover(function() {
		$(this).addClass('over');
		
	//ON MOUSEOUT REMOVE THE OVER CLASS
	}).mouseout(function() {
		$(this).removeClass('over');										
	});
	
	/*** END REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	
	/********************************************************************************************************************
	CLOSES ALL S ON PAGE LOAD
	********************************************************************************************************************/	
	$('.accordionContent').hide();

});





/* Left menu */

$(function(){
             $('.slide-out-div-left').tabSlideOut({
                 tabHandle: '.handle-left',                              //class of the element that will be your tab
                 pathToTabImage: 'images/left-handle.png',         // path to the image for the tab (optionaly can be set using css)
                 imageHeight: '45px',                               //height of tab image
                 imageWidth: '20px',                               //width of tab image    
                 tabLocation: 'left',                               //side of screen where tab lives, top, right, bottom, or left
                 speed: 500,                                        //speed of animation
                 action: 'click',                                   //options: 'click' or 'hover', action to trigger animation
                 topPos: '0px',                                   //position from the top
                 fixedPosition: true                               //options: true makes it stick(fixed position) on scroll
             });
         });
		 
/* Right menu */		

$(function(){
             $('.slide-out-div-right').tabSlideOut({
                 tabHandle: '.handle-right',                              //class of the element that will be your tab
                 pathToTabImage: 'images/right-handle.png',          //path to the image for the tab (optionaly can be set using css)
                 imageHeight: '122px',                               //height of tab image
                 imageWidth: '20px',                               //width of tab image    
                 tabLocation: 'right',                               //side of screen where tab lives, top, right, bottom, or left
                 speed: 500,                                        //speed of animation
                 action: 'click',                                   //options: 'click' or 'hover', action to trigger animation
                 topPos: '0px',                                   //position from the top
                 fixedPosition: true                               //options: true makes it stick(fixed position) on scroll
             });
         }); 
		 


/* Full width Slider */
		 
		 
$(function(){
				$('#maximage').maximage({
					cycleOptions: {
						fx: 'fade',
						speed: 1000, // Has to match the speed for CSS transitions in style.css (lines 318 - 321)
						timeout: 0,
						prev: '#arrow_left',
						next: '#arrow_right',
						pause: 1,
						before: function(last,current){
							if(!$.browser.msie){
								// Start HTML5 video when you arrive
								if($(current).find('video').length > 0) $(current).find('video')[0].play();
							}
						},
						after: function(last,current){
							if(!$.browser.msie){
								// Pauses HTML5 video when you leave it
								if($(last).find('video').length > 0) $(last).find('video')[0].pause();
							}
						}
					},
					onFirstImageLoaded: function(){
						jQuery('#cycle-loader').hide();
						jQuery('#maximage').fadeIn('slow');
					}
				});
	
				// Helper function to Fill and Center the HTML5 Video
				jQuery('video,object').maximage('maxcover');
	
				// To show it is dynamic html text
				jQuery('.in-slide-content').delay(1200).fadeIn();
			});
			
			
			
			
			
			
			
			
		







