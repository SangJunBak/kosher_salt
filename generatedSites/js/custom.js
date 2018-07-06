
// PREFIXFREE PLUGIN CODE
(function($, self){

if(!$ || !self) {
	return;
}

for(var i=0; i<self.properties.length; i++) {
	var property = self.properties[i],
		camelCased = StyleFix.camelCase(property),
		PrefixCamelCased = self.prefixProperty(property, true);
	
	$.cssProps[camelCased] = PrefixCamelCased;
}

})(window.jQuery, window.PrefixFree);

// APPLICATION CODE HERE
var didScroll;
var lastScrollTop = 0;
var secondLastScrollTop = 0;
var scrolledUp;
$(function(){
	var winWidth;
		startWidth = $(window).innerWidth();
	function resizer(){
		$(".button-collapse").sideNav();
		updateCardEllipsize();
		moduleResizer();
		hasScrolled(true);
		//updateTableStructure();
	}
   
	$(window).on('resize', function(){resizer()});
	// Listen for orientation changes      
	window.addEventListener("orientationchange", function() {	
		resizer();
	}, false);
	if (document.addEventListener){
	    document.addEventListener('webkitfullscreenchange', exitHandler, false);
	    document.addEventListener('mozfullscreenchange', exitHandler, false);
	    document.addEventListener('fullscreenchange', exitHandler, false);
	    document.addEventListener('MSFullscreenChange', exitHandler, false);
	}

	function exitHandler(){
	    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null){
	        resizer();
	    }
	}


});

$(document).ready(function(){
	$(".button-collapse").sideNav();
	$('#mobile-sidenav .menu-buttons').click(function() { $('.button-collapse').sideNav('hide'); }); 
	$('.modal').modal();
	$('.materialboxed').materialbox();
	moduleResizer();
	backupCardDetail();
	GalleryCarousel();
	updateCardEllipsize();
	bindLikeDislike();
	updateTableStructure()
	
	$('body').on('scroll', function() {

		didScroll = true;

   		/*if($('#section-nav').offset().top<=$('.navbar-fixed').outerHeight()) {
	       $('#backToTop').addClass('reveal');

	    } else {
	    	$('#backToTop').removeClass('reveal');
	    }*/
	    
	});
	
	setInterval(function() {
	    if (didScroll) {

	        hasScrolled();
	        if($('#section-nav').offset().top<=$('.navbar-fixed').outerHeight()) {
	      		$('#backToTop').addClass('reveal');
			} else {
	    		$('#backToTop').removeClass('reveal');
	    	}
	    	 didScroll = false;
	    	/* if (scrolledUp = true){
	    	 	setTimeout(function() {
	    	 		if (!didScroll){
  				 		hasScrolled('up');
  				 	}
				}, 2500);
	    	}*/
	       
	   		}
	}, 50);
	
	$('body').materialScrollTop({
		padding: 100,          
		// <a href="https://www.jqueryscript.net/animation/">Animation</a> will run 600 ms
		duration: 600,             
		// easing animations
		easing: 'swing',
		 revealElement: 'heroImage',    // Reveal button when scrolling over <header> ...
   	 	revealPosition: 'top'
   	});

   	// FANCYBOX
	$(".fancybox-img").fancybox();

	// SOCIAL MEDIA LINKS
    $(".social-twitter-share-page").attr('href', 'https://twitter.com/share?text=' + $('#share-text').text() + ' %40BASFAgSolutions');
    $(".social-email").attr('href', 'mailto:?subject=' + $('#share-text').text() + '&body=' + window.location.href);

	// TWITTER
	$(".social-twitter-share-page").click(function(e){
		var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
    	window.open(url, 'social-twitter-share-page', opts);
 
    	return false;
  	});

  	// COOKIE LAYER

  	$('#cookieLayer').addClass('active');
  	hasScrolled(true);

    $('.cookieButton').on('click',function(e){
    	e.preventDefault();
    	$('#cookieLayer').removeClass('active');
    	hasScrolled(true);
    })
});
function updateTableStructure(){
	// ADD CLASSES AND MOBILE CONTENT TO APPLICATION TABLE
	$('.application-table').each(function(){
		var headArray = [];
		var $table = $(this);
		for (var i = 0; i < $table.find('tr').children('th').length; i++){
			headArray.push($table.find('tr').children('th').eq(i).text());
		}
		var rowSpan = 0;
		$table.find('tr').each(function(){
			if ($(this).find('td').eq(0).attr('rowspan') >= 2 ){
				$(this).find('td').eq(0).addClass('sorter sup-row');
				rowSpan = $(this).find('td').eq(0).attr('rowspan');
				for (var i = 0; i < headArray.length; i++){
					$(this).find('td').eq(i).prepend('<span class="hidden-header">'+headArray[i]+'</span>');
				}

			}else if (!$(this).find('td').eq(0).attr('rowspan') || $(this).find('td').eq(0).attr('rowspan') == 1){
				for (var i = 0; i < headArray.length; i++){
					if(rowSpan <= 0){
						$(this).find('td').eq(i).prepend('<span class="hidden-header">'+headArray[i]+'</span>');
						$(this).find('td').eq(0).addClass('sorter');
					}else if(rowSpan >=1){
						$(this).addClass('sub-row');
						$(this).find('td').eq(i).prepend('<span class="hidden-header">'+headArray[i+1]+'</span>');
					}
				}
			}
			rowSpan--;
			if(rowSpan == -1){rowSpan=0;}
			if($(this).find('.sorter').text().length <= 79 && $(this).find('.sorter').text().length >= 45){
				$(this).addClass('two-lines');
			}else if($(this).find('.sorter').text().length >= 80 && $(this).find('.sorter').text().length <= 114){
				$(this).addClass('three-lines');
			}else if($(this).find('.sorter').text().length >= 115){
				$(this).addClass('four-lines');
			}
		});
	});
	$('div .application-table td table .sorter').removeClass('sorter');
	$('div .application-table tr').find('.sorter').on('click',function(){
		$(this).parents('tr').toggleClass('open');
		if($(this).hasClass('sup-row')){
			nextTr = $(this).parents('tr').next('tr')
			while ($(nextTr).hasClass('sub-row')){
				$(nextTr).toggleClass('open');
				nextTr = $(nextTr).next('tr');
			}
		//	$(this).parents('tr').next('tr').toggleClass('open');
		}
	});
}
function hasScrolled(type) {
	/*type = type || '';
	//alert('hero'+$('#heroImage').offset().top);
	var st =  $('#heroImage').offset().top //Math.max( $("html").scrollTop(), $("body").scrollTop() );//$('body').scrollTop();
    headerHeight = ($('#navBar').outerHeight() + $('#title').outerHeight() +$('#top-banderole').outerHeight());
    if (st<0)  st = Math.abs(st - headerHeight);
    else  st = Math.abs(st) - headerHeight;
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= headerHeight && lastScrollTop<=headerHeight )
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
   
    if ((st > lastScrollTop && st > headerHeight) ){//|| (st >  headerHeight && lastScrollTop==st) || type=='up' ){
        // Scroll Down
        $('.navbar-fixed').addClass('nav-up');
        $('.navbar-fixed').css('top',('-'+($('#title').outerHeight() +$('#top-banderole').outerHeight())+'px'));

       // scrolledUp = false
    } else {
        // Scroll Up

        if(st + $(window).height() < $(document).height()) {
            $('.navbar-fixed').removeClass('nav-up');
             $('.navbar-fixed').css('top','0px');

           //  if (lastScrollTop>2*headerHeight && secondLastScrollTop != st) 
           //  	scrolledUp = true;
        }
    }*/
    
    var st =  $('#heroImage').offset().top;
    headerHeight = ($('#navBar').outerHeight() + $('#title').outerHeight() +$('#top-banderole').outerHeight());
    if (st<0)  st = Math.abs(st - headerHeight);
    else  st = Math.abs(st) - headerHeight;
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= headerHeight && lastScrollTop<=headerHeight && !type){
        return;
    }
    
   // if ((st > lastScrollTop && st > headerHeight) ){
  // if ((st > headerHeight) ){
  	if(type){
  		st = 0;
  	}
  	if($('#cookieLayer').hasClass('active')){
  		st -= 50;
  	}
    if ((st > 50) ){
        // Scroll Down
        $('.navbar-fixed').addClass('nav-up');
        var navbarHeight = $('#title').outerHeight() + $('#top-banderole').outerHeight();
        navbarHeight += $('#cookieLayer').outerHeight();
        $('.navbar-fixed').css('top', - navbarHeight + 'px');
    } else {
        // Scroll Up
    	if(st + $(window).height() < $(document).height()) {
            $('.navbar-fixed').removeClass('nav-up');
	        if($('#cookieLayer').hasClass('active')){
            	$('.navbar-fixed').css('top','0px');
	        } else {
	        	var cookieHeight = $('#cookieLayer').outerHeight();
				$('.navbar-fixed').css('top', - cookieHeight + 'px');
	        }
       }
    }
    secondLastScrollTop = lastScrollTop;
    lastScrollTop = st;

    var navbarHeight = $('#title').outerHeight() + $('#top-banderole').outerHeight() + $('#navBar').outerHeight();
    if($('#cookieLayer').hasClass('active')){
    	navbarHeight += $('#cookieLayer').outerHeight();
    }
    $("#heroImage").css('margin-top', navbarHeight + 'px');
}
function bindLikeDislike(){
	$('body').on('click','.likedislike a', function(e){
		var _this = $(this);
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			if ($(this).siblings('a').hasClass('active')){
				 $(this).siblings('a').removeClass('active');
				  if ($(this).hasClass('like')) saveLikeDislike('remove','dislike');
				  else saveLikeDislike('remove','like');
			}
			if ($(this).hasClass('like')) saveLikeDislike('add','like');
			else saveLikeDislike('add','dislike');
		} else {
			if ($(this).hasClass('like')) saveLikeDislike('remove','like');
			else saveLikeDislike('remove','dislike');
		}
	});
	
}
function saveLikeDislike(type,helpful){
	alert('User '+type + ' ' +helpful);
}
function GalleryCarousel(){
	$('.imageGalleryCarousel').slick({
    		dots: true,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 4,
		  slidesToScroll: 4,
		  responsive: [
		    {
		      breakpoint: 992,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		       
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		   ]
	});

}
function backupCardDetail(){
	$('.article .card .card-content').each(function() {
		var e1= $(this).children('p');
		$(e1).attr('data-text',$(e1).html());
	})
}
function updateCardEllipsize(){
	$('.article .card .card-content').each(function() {
		ellipsizeTextBox($(this))
	});
}
function ellipsizeTextBox(id) {
    var e1= $(id).children('p')
    if ($(e1).attr('data-text')==undefined) return;
    $(e1).html($(e1).attr('data-text'))
    var wordArray = $(e1).html().split(' ');
    while($(id)[0].scrollHeight > $(id)[0].clientHeight) {
        wordArray.pop();
        $(e1).html(wordArray.join(' ') + '...');
    }
}
function moduleResizer(){
	$('.row.articleSection').each(function(){
		var modHeightArray = [];
		var modHeight;

		// RESIZE UNIFORM WIDTH MODULE HEIGHTS
		$(this).children('.col').css({'height':'auto'});
		//$(this).children('div').css({'height':'auto'});
		for (var i = 0; i < $(this).children('.col').length; i++){
		//for (var i = 0; i < $(this).children('div').length; i++){
			modHeightArray.push($(this).children('.col').eq(i).height());
			//modHeightArray.push($(this).children('div').eq(i).outerHeight());
		}
		modHeightArray.sort(function(a, b){return b-a});
		modHeight = modHeightArray[0];
		$(this).children('.col').css({'height':modHeight+'px'});
		$(this).css({'height':modHeight+'px'});
	});
};
function  populateArticle(){
	var issueJSON = getArticleJSON();
	alert("got it!");
}
function getArticleJSON(){
	return {
			id: "",
			title : "Winter 2018, Issue #1",
			issueHeader : "Waterhemp. Or is it?",
			issueSubheader : "Identification is the first step to proper management.",
			headerImage : "images/heroBg.jpg",
			headerSmallImage : "images/heroBg-small.jpg",
			featureArticle : {
					header: "Feature article",
					description:"Now found in Ontario fields, glyphosate-resistant waterhemp is easily mistaken with other Amaranthus weeds such as redroot pigweed. That’s why waterhemp identification through methods such as checking for stem hairs and examining leaf shape is the first step to managing it properly.",
					linkType : "link",
					linkText: "Read",
					link:"/emagazine/article1.html"
				},
			articles:[
					{
						imageSize1:"images/article1_S1.jpg",
						imageSize2:"images/article1_S2.jpg",
						imageSize3:"images/article1_S3.jpg",
						imageBgPosition:"top center",
						title:"Business interest",
						rightTitle:"",
						header: "A solution for the labour shortage in Canadian agriculture.",
						description:"With agricultural labour shortages increasing across Canada, hiring experienced foreign ag workers is a growing trend for Canadian growers.",
						linkType : "link",
						linkText: "Read",
						link:"/emagazine/article2.html"
					},
					{
						imageSize1:"images/article4_S1.jpg",
						imageSize2:"images/article4_S2.jpg",
						imageSize3:"images/article4_S3.jpg",
						imageBgPosition:"center center",
						title:"Business interest",
						rightTitle:"",
						header: "The commotion over glyphosate: Could it cross the Atlantic?",
						description:"After three failed attempts, the European Commission approved a 5-year renewal of glyphosate just weeks before the interim licence was set to expire. Find out what sparked the debate over one of the world’s most widely used herbicides.",
						linkType : "link",
						linkText: "Read",
						link:"#"
					},
					{
						imageSize1:"images/article2_S1.jpg",
						imageSize2:"images/article2_S2.jpg",
						imageSize3:"images/article2_S3.jpg",
						imageBgPosition:"top center",
						title:"Corn",
						rightTitle:"",
						header: "The right nutrients at the right time.",
						description:"Corn production is a nutrient-intensive process and to truly optimize these nutrient inputs, growers need to use the right sources at the right rate, time and place.",
						linkType : "link",
						linkText: "Read",
						link:"#"
					},
					{
						imageSize1:"images/article3_S1.jpg",
						imageSize2:"images/article3_S2.jpg",
						imageSize3:"images/article3_S3.jpg",
						imageBgPosition:"center center",
						title:"",
						rightTitle:"",
						header: "Soy & corn: Year in review.",
						description:"Soy and corn - year in review: season (weather, production) and results (acres, yield).",
						linkType : "link",
						linkText: "Read",
						link:"#"
					},
					{
						imageSize1:"images/article5_S1.jpg",
						imageSize2:"images/article5_S2.jpg",
						imageSize3:"images/article5_S3.jpg",
						imageBgPosition:"center center",
						title:"Corn",
						rightTitle:"",
						header: "Corn runs on synergy.",
						description:"Taking advantage of the relationship between nitrogen and fungicides in corn.<br><br>It's time to start thinking of nitrogen and fungicides together to truly take advantage of the synergy that exists between them.",
						linkType : "uplink",
						linkText: "Read",
						link:"#"
					},
					{
						imageSize1:"images/video_S1.jpg",
						imageSize2:"images/video_S2.jpg",
						imageSize3:"images/video_S3.jpg",
						imageBgPosition:"top center",
						title:"Herbicide",
						rightTitle:"26:00",
						header: "Corn school: Profit strategies for fixed and flex ear hybrids.",
						description:"Not all corn fields are created equal. And Aaron Stevanus from Pride Seeds explains why. Learn more about the basic differences between fixed and flex hybrids and strategies for incorporating them into your operation.",
						linkType : "vlink",
						linkText: "Watch",
						link:"https://www.youtube.com/watch?v=5NLKlmRurhU"
					},
					{
						imageSize1:"images/article6_S1.jpg",
						imageSize2:"images/article6_S2.jpg",
						imageSize3:"images/article6_S3.jpg",
						imageBgPosition:"center center",
						title:"Crop establishment",
						rightTitle:"",
						header: "Frost Seeding Cereals.",
						description:"Peter Johnson shares his tips for frost seeding cereals, including strategies like using the right tractor, using a fungicide seed treatment, the importance of crop rotation and more.",
						linkType : "uplink",
						linkText: "Read",
						link:"#"
					},
					{
						imageSize1:"images/article7_S1.jpg",
						imageSize2:"images/article7_S2.jpg",
						imageSize3:"images/article7_S3.jpg",
						imageBgPosition:"center center",
						title:"potatoes",
						rightTitle:"",
						header: "Getting the dirt on rhizoctonia in potatoes.",
						description:"Maintaining soil health is a key part of an integrated management strategy to control a soil-borne disease like rhizoctonia.",
						linkType : "link",
						linkText: "Read",
						link:"#"
					},
					{
						imageSize1:"images/article8_S1.jpg",
						imageSize2:"images/article8_S2.jpg",
						imageSize3:"images/article8_S3.jpg",
						imageBgPosition:"center center",
						title:"Herbicide",
						rightTitle:"",
						header: "Get control that sticks so weeds don’t.",
						description:"Discover more about Zidua<sup>™</sup> SC herbicide, the latest Group 15 innovation from BASF.",
						linkType : "link",
						linkText: "Read",
						link:"#"
					}

				],
			information:[
					{
						imageSize1:"images/DidYouKnow.jpg",
						imageBgPosition:"center center",
						title:"",
						header: "Did you know?",
						description:"Canada is the world’s largest producer of wild blueberries...",
						linkType : "clink",
						linkText: "Read",
						link:"#",
						rightTitle:"",
						revealheader:"DID YOU KNOW?",
						revealDescription:"Canada is the world's largest producer of wild blueberries.<br><br>Setting new records in 2011, we exported 90,979 metric tonnes of wild and highbush blueberries at a value of $335 million.",
						revealDescriptionSmall:"Source: Canadian Fruit Fact Sheet, Canada Brand, Agriculture and Agri-Food Canada"
					}
				],
			events:[
					{
						title:"Event Reminder",
						header: "London calling.",
						subHeader:"Don’t miss the London Farm Show.",
						description:"visit us at booth #1234",
						eventDate:"March 7- 9",
						eventTime:"",
						eventTimezone:"",
						linkType : "",
						linkText: "",
						overlayHeader: "",
						overlayDescription:""
					},
					{
						title:"Event Reminder",
						header: "A capital Idea.",
						subHeader:"Check out the Ottawa Valley Farm Show.",
						description:"visit us at booth #5678",
						eventDate:"March 7- 9",
						eventTime:"",
						eventTimezone:"",
						linkType : "",
						linkText: "",
						overlayHeader: "",
						overlayDescription:""
					},
					{
						title:"Webinar & Podcast Reminder",
						header: "No small potatoes.",
						subHeader:"Spudsmart Webinar & Podcast on Managing Soil-borne potato diseases.",
						description:"Sponsored by BASF",
						eventDate:"March 21, 2018",
						eventTime:"1 PM",
						eventTimezone:"est",
						linkType : "link",
						linkText: "Learn more",
						overlayHeader: "Event header",
						overlayDescription:"A bunch of text goes here. A bunch of text. A bunch of text goes here. A bunch of text. A bunch of text goes here. A bunch of text. A bunch of text goes here. A bunch of text. A bunch of text goes here. A bunch of text."
					}
				]

	}
}