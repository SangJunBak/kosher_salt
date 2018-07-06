module.exports = {

    page : (currData) => {
        const module = currData.page;
        const title = module.title;
        const author = module.author;

        const pre = `
<!-- START PRE PAGE --> 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="description" content="">
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
		<meta http-equiv="cleartype" content="on">
		<meta http-equiv="cache-control" content="no-cache, no-store">
		<link rel="stylesheet" href="css/normalize.css">
		<link rel="stylesheet" href="css/materialize.css">
		
		<link rel="stylesheet" type="text/css" href="css/slick.css"/>
		<link rel="stylesheet" type="text/css" href="css/slick-theme.css"/>
		<link rel="stylesheet" type="text/css" href="css/jquery.fancybox.min.css">

		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="css/article.css">
		<script src="js/modernizr-2.7.1.min.js"></script>
		<script src="js/jquery-2.1.0.min.js"></script>
		<script src="js/materialize.js"></script>
		 <script type="text/javascript" src="js/slick.min.js"></script>
		
		<script src="js/jquery.fancybox.js"></script>

		<link href="https://fonts.googleapis.com/icon?family=Material+Icons"  rel="stylesheet">
		
		<title>Business Interest - eMagazine - Winter 2018</title>
		
	</head>
	<body>
		<div id="page-wrap">
			<div class="navbar-fixed">
				<nav id="top-banderole">
			  		<a href="#" class="brand-logo"><div id="basf-logo"></div></a>
				</nav>
				<nav id="title">
					<div id="titleBg">
						<img src='images/emagazineBG.jpg' class="hide-on-small-only">
						<img src='images/emagazine.png' class="hide-on-med-and-up">
					</div>
					<div  id="titletext">Winter 2018, Issue #1</div>
				</nav>
				<nav id="navBar">
			    	<div class="nav-wrapper">
			     		<a href="#" data-activates="mobile-sidenav" class="hide-on-med-and-up button-collapse"><i class="material-icons">menu</i></a>
			      		<ul class="hide-on-small-only">
					    	<li class="active"><a href="index.html">Current issue</a></li>
			      		</ul>
			     		  <ul class="side-nav" id="mobile-sidenav">
			      			<li class="menu-buttons"><a href="#" class="btn-close">Close</a></li>
			    	    	<li class="active"><a href="index.html">Current issue</a></li>
				      	</ul>
        				<div class="fixed-action-btn horizontal click-to-toggle">
    						<a class="btn-floating">
						      <i class="material-icons share">share</i>
						      <i class="material-icons close">close</i>
						    </a>
						    <ul>
						    	<li><a data-wtid="WT.soc" data-wtvalue="Twitter;https://twitter.com/basfagsolutions" href="https://twitter.com/basfagsolutions" target="_blank" class="btn-floating social-link social-twitter social-twitter-share-page" title="Join us in Twitter"><i title="Join us inTwitter"></i></a></li>
                                <li><a data-wtid="WT.soc" data-wtvalue="Email;" href="#" class="btn-floating social-link social-email" title="Share in Email"><i title="Share in Email"></i></a></li>
						     </ul>
  						</div>
       				</div>
				</nav>
			</div>
			<div id="heroImage" class="imageWithText">
				<img src='images/body_content/Feb2018/article3/heroBg.jpg'>
				<img src='images/body_content/Feb2018/article3/headerText.svg' id="headerTextImage">
			</div>
			
			<nav id="section-nav">
				<p id="share-text" class="left">Business Interest</p>
				<ul class="right" id="shortcuts">
					<li><a href="#"><i class="material-icons left">chat</i><span class="hide-on-small-only">Live chat</span></a></li>
        			<li><a href="#"><i class="material-icons left">phone</i><span class="hide-on-small-only">Contact</span></a></li>
				</ul>
			</nav>
			
			<main>
				<div class="row">
					<div class="col s12 m12 l12">
						<p class="authorName">by
							<span>${author}</span>
						</p>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m12 l9 noPadLeft">
						<div class="row">
							<div class="col s12 m12 l12">
								<h5 style="padding-bottom: 10px;">
								${title}
                                </h5>
							</div>
							<!-- END PRE PAGE -->
        `;
        const post = `
						</div>	
					</div> 
					<!--Other articles-->
					<div class="col s12 m12 l3 hide-on-small-only noPadLeft">
						<div class="row">
							<div class="col s12 m12 l12">
								<h6>OTHER ARTICLES IN THIS ISSUE:</h6>
							</div>
						</div>
			
						<div class="row">
							<div class="article style7 col s12 m6 l12">
								<div class="card">
									<div class="card-image">
										<div class="card-bg" style="background:url(images/article4_S3.jpg) no-repeat top center / cover;"></div>
										<span class="card-title">Business interest</span>
									</div>
									<div class="card-content">
										<h6>The commotion over glyphosate: Could it cross the Atlantic? </h6>
										<p>After three failed attempts, the European Commission approved a 5-year renewal of glyphosate just weeks before the
											interim licencewas set to expire.</p>
									</div>
									<div class="card-action">
										<ul>
											<li>
												<a href="#" class="link">Read</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
			
							<div class="article style7 col s12 m6 l12">
								<div class="card">
									<div class="card-image">
										<div class="card-bg" style="background:url(images/article1_S3.jpg) no-repeat top center / cover;"></div>
										<span class="card-title">Business interest</span>
									</div>
									<div class="card-content">
										<h6>A solution for the labour shortage in Canadian agriculture.</h6>
										<p>With agricultural labour shortages increasing across Canada, hiring experienced foreign ag workers is a growing trend
											for Canadian growers.</p>
									</div>
									<div class="card-action">
										<ul>
											<li>
												<a href="article2.html" class="link">Read</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
			
							<div class="article style7 col s12 m6 l12">
								<div class="card">
									<div class="card-image">
										<div class="card-bg" style="background:url(images/article3_S3.jpg) no-repeat top center / cover;"></div>
										<span class="card-title"></span>
									</div>
									<div class="card-content">
										<h6>Soy & corn: Year in review.</h6>
										<p>Soy and corn - year in review: season (weather, production) and results (acres, yield).</p>
									</div>
									<div class="card-action">
										<ul>
											<li>
												<a href="#" class="link">Read</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
			
							<div class="article style7 col s12 m6 l12">
								<div class="card">
									<div class="card-image">
										<div class="card-bg" style="background:url(images/article2_S3.jpg) no-repeat top center / cover;"></div>
										<span class="card-title">Corn</span>
									</div>
									<div class="card-content">
										<h6>The right nutrients at the right time.</h6>
										<p>Corn production is a nutrient-intensive process and to truly optimize these nutrient inputs, growers need to use the
											right sources at the right rate, time and place.</p>
									</div>
									<div class="card-action">
										<ul>
											<li>
												<a href="#" class="link">Read</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m12 l12">
						<h6>Recommended:</h6>
					</div>
				</div>
				<div class="row imageGalleryCarousel">
			
					<div class="article style5 col s12 m12 l12">
						<div class="card">
							<div class="card-image">
								<div class="card-bg" style="background:url(images/article_seedtreat_soy/recommended1.jpg) no-repeat top center / cover;"></div>
								<span class="card-title">HERBICIDE</span>
							</div>
							<div class="card-content">
								<h6>Get control that sticks so weeds don't.</h6>
								<p>Discover more about Zidua&trade; SC herbicide, the latest Group 15 innovation from BASF.</p>
							</div>
							<div class="card-action">
								<ul>
									<li>
										<a href="#" class="link">Read</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
			
				</div>
			</main>
			<main class="page-footer">
	          
	            <div class="row">
	              <div class="col l6 m12 s12">
	              	<div class="module">
	                	<h6>Talk to us. We are here for you.</h6>
	                	<p>Want to chat? One of our agents is ready to answer your questions.<br>
						<span class="hide-on-small-only">1-877-371-BASF (2273).</span></p>

						<div class="card-action">
              				<ul>
								<li><a href="tel:+18773712273"  id="iPhoneButton" class="link button hide-on-med-and-up">Call Now</a></li>
              					<li>
              					</li>
              				</ul>
            			</div>
					</div>
	             </div>
	            
	             <div class="col l6 m12 s12">
	             	<div class="module">
		             	<div class="row">
							<div class="col l6 m6 s12">
								<h6>Got Questions?</h6>
		                		<p>Contact your local BASF Sales Representative</p>
								<div class="contactInfo">
									<p>Name: Ken curah<br>
										Phone: 519-476-4683<br>
										Email: ken.currah@basf.com
									</p>
								</div>
							</div>
							<div class="col l6 m6 s12">
								<ul class="">
	                                <li>
	                                    <a data-wtid="WT.soc" data-wtvalue="Youtube;https://www.youtube.com/user/BASFAgSolutions" href="https://www.youtube.com/user/BASFAgSolutions" target="_blank" class="social-link social-youtube" title="Join us in Youtube">
	                                        <i title="Join us in Youtube"></i><span class="social-name">BASFAgSolutions</span>
	                                     </a>
	                                </li>
	                                <li>
	                                    <a data-wtid="WT.soc" data-wtvalue="Twitter;https://twitter.com/basfagsolutions" href="https://twitter.com/basfagsolutions" target="_blank" class="social-link social-twitter" title="Join us inTwitter">
	                                        <i title="Join us inTwitter"></i><span class="social-name">@BASFAgSolutions</span>
	                                     </a>
	                                </li>
	                            </ul>
							</div>
		             	</div>
		            </div>
	             	</div>
	         	</div>
	       <button id="backToTop" class="material-scrolltop" type="button"></button>
	         </main>
			<script src="js/custom.js"></script>
		</div>
	</body>
</html>
        `;
        const body = undefined;

        return ({
            pre: [pre],
            post: [post],
            body: [body],
        })

    }
};
