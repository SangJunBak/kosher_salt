module.exports = {

    references : (currData) => {

        const module = currData.references;
        const source = module.source;
        const url = module.url;
        const pre = `
        <div class="col s12 m12 l12">
            <ul class="collapsible details" data-collapsible="accordion">
            <li>
            <div class="collapsible-header">References
            <i class="material-icons close">expand_more</i>
        <i class="material-icons open">expand_less</i>
        </div>
        <div class="collapsible-body references small">
            <ol>
        `;
        const body = `
                <li>
                    ${source}
                    <a href="${url}" target="_blank">
                        ${url}
                    </a>.
                </li>
        `;
        const post = `
            </ol>
        </div>
        </li>
    </ul>

        <nav id="shareBar">
            <div class="fixed-action-btn horizontal click-to-toggle half">
                Share this article
                <a class="btn-floating">
                    <i class="material-icons share">share</i>
                    <i class="material-icons close">close</i>
                </a>
                <ul>
                    <li>
                        <a data-wtid="WT.soc" data-wtvalue="Twitter;https://twitter.com/basfagsolutions" href="https://twitter.com/basfagsolutions"
                           target="_blank" class="btn-floating social-link social-twitter social-twitter-share-page" title="Join us in Twitter">
                            <i title="Join us inTwitter"></i>
                        </a>
                    </li>
                    <li><a data-wtid="WT.soc" data-wtvalue="Email;" href="#" class="btn-floating social-link social-email" title="Share in Email"><i title="Share in Email"></i></a></li>
                </ul>
            </div>
            <div class="likedislike">
            Was this article helpful?
            <a class="btn-floating like">
                <i class="material-icons thumb_up">thumb_up</i>
            </a>
            <a class="btn-floating dislike">
            <i class="material-icons thumb_down">thumb_down</i>
        </a>
    </div>
    </nav>

        <a class="waves-effect waves-light btn backButton" href="index.html">Back to current issue</a>
    </div>
    `;
        return ({
            pre: [pre],
            post: [post],
            body: [body],
        })
    }
}