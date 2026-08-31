export function renderHeader() {
  return `
        <div class="wrap">
            <a href="/">
                <img class="logo" src="/img/branding.png?v=1e8067ff63" alt="Besprited">
            </a>
            <nav class="site-nav">
                <ul>
                    <li><a href="/download.html">
                      <img src="/img/download-macchiato.png?v=7f35b06f38" class="button-icon-img nav-icon" />
                      Download
                    </a></li>
                    <!--<li><a href="/themes.html">
                      <img src="/img/palette-macchiato.png?v=3f3164b1bc" class="button-icon-img nav-icon" />
                      Themes
                    </a></li>-->
                    <li><a href="/roadmap.html">
                      <img src="/img/road-macchiato.png?v=072536e6bc" class="button-icon-img nav-icon" />
                      Roadmap
                    </a></li>
                    <li><a href="https://ko-fi.com/veritaware" class="button-donate">
                      <img src="/img/heart-macchiato.png?v=a91f41d54f" class="button-icon-img nav-icon" />
                      Donate
                    </a></li>
                    <!--<li><a href="https://github.com/veritaware/Besprited/releases/latest">
                      Change Notes
                    </a></li>-->
                </ul>
            </nav>
        </div>
    `;
}
