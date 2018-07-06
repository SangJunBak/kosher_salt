module.exports = {

    halfandhalf : (currData) => {
        const module = currData.halfandhalf;
        const img = module.img.slice(12);
        const subtitle = module.subtitle;
        const img_title = module.img_title;
        const img_source = module.img_source;
        const content = module.content;
        const pre = undefined;
        let body = `
                        <div class="col s12 m6 l6">
                            <div class="col s12 m12 l12 center-align">
                                <div class="card xsmall imageWithCaption left-align">
                                    <div class="card-image">
                                        <h6>
                                        ${img_title}
                                        </h6>
                                        <a class="fancybox-img" href="${img}" title="${img_title}">
                                            <img data-caption="Source: ${img_source}" src="images/body_content/Feb2018/article3/${img}">
                                        </a>
                                    </div>
                                    <div class="card-content">
                                        <p>Source: ${img_source}</p>
                                    </div>
                                </div>
                            </div>
							</div>
							<div class="col s12 m6 l6">
								<h6>
									${subtitle}
								</h6>
								<p>
									${content}
								</p>
							</div> 
        `;
        const post = undefined;

        for(var i = 1; i<10; i++){
            let replace = "[.]+["+i+"]";
            var regex = new RegExp(replace, "g");
            body = body.replace(regex, `.<sup>`+i+`</sup>`);            
        }


        return ({
            pre: [pre],
            post: [post],
            body: [body],
        })

    }
}