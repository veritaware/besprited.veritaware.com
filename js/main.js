import { renderHeader } from '/modules/header.js';
import { renderFooter } from '/modules/footer.js';

document.querySelector('header.site-header').innerHTML = renderHeader();
document.querySelector('footer.site-footer').innerHTML = renderFooter();
