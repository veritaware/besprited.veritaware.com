export function renderFooter() {
    const year = new Date().getFullYear();
    return `
        <div class="wrap">
            <p>Besprited is Free and Open Source Software distributed under the GNU General Public License Version 2.</p>
            <p>Copyright (c) ${year}
                <a href="https://veritaware.com" class="veritaware">Veritaware</a>
            </p>
        </div>
    `;
}
