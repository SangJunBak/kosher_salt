module.exports = {

    fulltext : (currData) => {
        const module = currData.fulltext;
        const subtitle = module.subtitle;
        const content = module.content;

        const pre = undefined;
        let body = `
                            <div class="col s12 m12 l12">
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