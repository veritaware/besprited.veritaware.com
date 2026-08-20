const RELEASE_TAG = 'v1.26.06';
const RELEASE_BASE = `https://github.com/veritaware/Besprited/releases/download/${RELEASE_TAG}/`;

const PACKAGES = {
    windows: {
        label: 'Windows',
        icon: 'icon-windows',
        file: `besprited-${RELEASE_TAG}-windows-x86_64.zip`,
        img: '/img/windows-macchiato.png',
    },
    macos: {
        label: 'macOS',
        icon: 'icon-apple',
        file: `besprited-${RELEASE_TAG}-macos-sillicon.zip`,
        img: '/img/apple-macchiato.png',
    },
    linux: {
        label: 'Linux',
        icon: 'icon-linux',
        file: `besprited-${RELEASE_TAG}-linux-x86_64.zip`,
        img: '/img/linux-macchiato.png',
    },
};

function detectOS() {
    const platform = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase();
    const ua = navigator.userAgent.toLowerCase();

    if (platform.includes('mac') || ua.includes('mac os')) return 'macos';
    if (platform.includes('win') || ua.includes('windows')) return 'windows';
    if (platform.includes('linux') || ua.includes('linux')) return 'linux';

    return 'windows';
}

function updateDownload(os) {
    const pkg = PACKAGES[os] ?? PACKAGES.windows;

    const button = document.getElementById('download-button');
    //const icon = document.getElementById('download-button-icon');
    const label = document.getElementById('download-button-label');
    const filename = document.getElementById('download-filename');
    const sig = document.getElementById('download-sig');
    const img = document.getElementById('download-button-img');

    button.href = RELEASE_BASE + pkg.file;
    label.textContent = `Download for ${pkg.label}`;
    //icon.className = `button-icon brand ${pkg.icon}`;
    img.src = `${pkg.img}`;
    filename.textContent = pkg.file;
    sig.href = RELEASE_BASE + `gpg-${pkg.file}.sig`;
}

export function initDownload() {
    const select = document.getElementById('os-select');
    if (!select) return;

    select.value = detectOS();
    updateDownload(select.value);

    select.addEventListener('change', () => updateDownload(select.value));
}
