export function renderHeader() {
  return `
        <div class="wrap">
            <a href="/">
                <img class="logo" src="/img/branding.png" alt="Besprited">
            </a>
            <nav class="site-nav">
                <ul>
                    <li><a href="/download.html">
                      <img src="/img/download-macchiato.png" class="button-icon-img nav-icon" />
                      Download
                    </a></li>
                    <!--<li><a href="/themes.html">
                      <img src="/img/palette-macchiato.png" class="button-icon-img nav-icon" />
                      Themes
                    </a></li>-->
                    <li><a href="/roadmap.html">
                      <img src="/img/road-macchiato.png" class="button-icon-img nav-icon" />
                      Roadmap
                    </a></li>
                    <li><a href="https://ko-fi.com/veritaware" class="button-donate">
                      <img src="/img/heart-macchiato.png" class="button-icon-img nav-icon" />
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
