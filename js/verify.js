const COPY_ICON = '/img/copy-machiatto.png';
const CHECK_ICON = '/img/check-machiatto.png';
const RESET_DELAY = 1500;

export function initCopyButtons() {
    document.querySelectorAll('.copy-button').forEach((button) => {
        const pre = button.closest('.code-block-wrap')?.querySelector('.code-block');
        const icon = button.querySelector('img');
        if (!pre || !icon) return;

        let resetTimer;

        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(pre.textContent.trim());
            } catch {
                return;
            }

            clearTimeout(resetTimer);
            button.classList.add('copied');
            icon.src = CHECK_ICON;
            button.setAttribute('aria-label', 'Copied!');

            resetTimer = setTimeout(() => {
                button.classList.remove('copied');
                icon.src = COPY_ICON;
                button.setAttribute('aria-label', 'Copy to clipboard');
            }, RESET_DELAY);
        });
    });
}
