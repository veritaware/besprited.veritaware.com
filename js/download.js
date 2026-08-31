const RELEASE_TAG = 'v1.26.09';
const VERSION = '1.26.09';
const RELEASE_BASE = `https://github.com/veritaware/Besprited/releases/download/${RELEASE_TAG}/`;

// Each format: label shown in the format picker, the asset filename, and the
// GPG signature filename (or null when the release ships no signature for it).
const PACKAGES = {
    windows: {
        label: 'Windows',
        img: '/img/windows-macchiato.png?v=d79e2b512d',
        formats: [
            {
                id: 'exe',
                label: 'Installer (.exe)',
                file: `besprited-${RELEASE_TAG}-windows-x86_64.exe`,
                sig: `gpg-besprited-${RELEASE_TAG}-windows-x86_64.exe.sig`,
            },
            {
                id: 'zip',
                label: 'Portable (.zip)',
                file: `besprited-${RELEASE_TAG}-windows-x86_64.zip`,
                sig: `gpg-besprited-${RELEASE_TAG}-windows-x86_64.zip.sig`,
            },
        ],
    },
    macos: {
        label: 'macOS',
        img: '/img/apple-macchiato.png?v=8746477cbe',
        formats: [
            {
                id: 'silicon',
                label: 'Apple Silicon (.dmg)',
                file: `besprited-${RELEASE_TAG}-macos-silicon.dmg`,
                sig: `gpg-besprited-${RELEASE_TAG}-macos-silicon.dmg.sig`,
            },
            {
                id: 'intel',
                label: 'Intel (.dmg)',
                file: `besprited-${RELEASE_TAG}-macos-intel.dmg`,
                sig: `gpg-besprited-${RELEASE_TAG}-macos-intel.dmg.sig`,
            },
        ],
    },
    linux: {
        label: 'Linux',
        img: '/img/linux-macchiato.png?v=30f937d667',
        formats: [
            {
                id: 'appimage',
                label: 'AppImage (any distro)',
                file: `Besprited-${RELEASE_TAG}-anylinux-x86_64.AppImage`,
                sig: null,
            },
            {
                id: 'targz',
                label: 'Tarball (.tar.gz)',
                file: `besprited-${RELEASE_TAG}-linux-x86_64.tar.gz`,
                sig: `gpg-besprited-${RELEASE_TAG}-linux-x86_64.tar.gz.sig`,
            },
            {
                id: 'rpm',
                label: 'Fedora / openSUSE (.rpm)',
                file: `besprited-${VERSION}-x86_64.rpm`,
                sig: `gpg-besprited-${VERSION}-x86_64.rpm.sig`,
            },
            {
                id: 'deb-debian13',
                label: 'Debian 13 (.deb)',
                file: `besprited-${VERSION}-debian13_amd64.deb`,
                sig: `gpg-besprited-${VERSION}-debian13-amd64.deb.sig`,
            },
            {
                id: 'deb-ubuntu2404',
                label: 'Ubuntu 24.04 (.deb)',
                file: `besprited-${VERSION}-ubuntu24.04_amd64.deb`,
                sig: `gpg-besprited-${VERSION}-ubuntu24.04-amd64.deb.sig`,
            },
            {
                id: 'deb-ubuntu2604',
                label: 'Ubuntu 26.04 (.deb)',
                file: `besprited-${VERSION}-ubuntu26.04_amd64.deb`,
                sig: `gpg-besprited-${VERSION}-ubuntu26.04-amd64.deb.sig`,
            },
        ],
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

function populateFormats(os) {
    const formatSelect = document.getElementById('format-select');
    if (!formatSelect) return;

    const pkg = PACKAGES[os] ?? PACKAGES.windows;
    formatSelect.innerHTML = '';
    for (const format of pkg.formats) {
        const option = document.createElement('option');
        option.value = format.id;
        option.textContent = format.label;
        formatSelect.appendChild(option);
    }
}

function updateDownload(os, formatId) {
    const pkg = PACKAGES[os] ?? PACKAGES.windows;
    const format = pkg.formats.find((f) => f.id === formatId) ?? pkg.formats[0];

    const button = document.getElementById('download-button');
    const label = document.getElementById('download-button-label');
    const filename = document.getElementById('download-filename');
    const sig = document.getElementById('download-sig');
    const sigWrap = document.getElementById('download-sig-wrap');
    const img = document.getElementById('download-button-img');

    button.href = RELEASE_BASE + format.file;
    label.textContent = `Download for ${pkg.label}`;
    img.src = pkg.img;
    filename.textContent = format.file;

    if (format.sig) {
        sig.href = RELEASE_BASE + format.sig;
        sigWrap.hidden = false;
    } else {
        sigWrap.hidden = true;
    }
}

export function initDownload() {
    const osSelect = document.getElementById('os-select');
    const formatSelect = document.getElementById('format-select');
    if (!osSelect || !formatSelect) return;

    osSelect.value = detectOS();
    populateFormats(osSelect.value);
    updateDownload(osSelect.value, formatSelect.value);

    osSelect.addEventListener('change', () => {
        populateFormats(osSelect.value);
        updateDownload(osSelect.value, formatSelect.value);
    });

    formatSelect.addEventListener('change', () => {
        updateDownload(osSelect.value, formatSelect.value);
    });
}
