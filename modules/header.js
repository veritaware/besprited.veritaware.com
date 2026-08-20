export function renderHeader() {
  return `
        <div class="wrap">
            <a href="/">
                <img class="logo" src="/img/branding.png" alt="Besprited">
            </a>
            <nav class="site-nav">
                <ul>
                    <li><a href="/download.html">
                      <i class="button-icon icon-download" aria-hidden="true"></i>
                      Download
                    </a></li>
                    <li><a href="/themes.html">
                      <i class="button-icon icon-palette" aria-hidden="true"></i>
                      Themes
                    </a></li>
                    <li><a href="/roadmap.html">
                      <i class="button-icon icon-road" aria-hidden="true"></i>
                      Roadmap
                    </a></li>
                    <li><a href="https://ko-fi.com/veritaware" class="button-donate">
                      <i class="button-icon icon-heart" aria-hidden="true"></i>
                      Donate
                    </a></li>
                    <!--<li><a href="https://github.com/veritaware/Besprited/releases/latest">
                      <i class="button-icon icon-list" aria-hidden="true"></i>
                      Change Notes
                    </a></li>-->
                </ul>
            </nav>
        </div>
    `;
}
