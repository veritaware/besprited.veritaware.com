import { renderHeader } from '/modules/header.js?v=ca1c8eeff8';
import { renderFooter } from '/modules/footer.js?v=ccff414ef0';

document.querySelector('header.site-header').innerHTML = renderHeader();
document.querySelector('footer.site-footer').innerHTML = renderFooter();
