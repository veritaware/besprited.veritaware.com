#!/usr/bin/env node
/*
 * Cache-busting stamper.
 *
 * Rewrites every reference to a local asset (in img/, css/, js/, font/,
 * modules/) across the HTML/CSS/JS source so it carries a `?v=<hash>` query
 * string. Browsers treat a changed query string as a new URL, so an edited
 * asset is picked up immediately instead of being served stale from cache.
 *
 * The stamp is a short hash of the asset's own bytes, so it changes when and
 * only when the asset changes, and is identical on every machine. Some assets
 * (js/main.js, css/style.css, the modules) are themselves scanned and
 * rewritten — when one of those gets a new stamp its content changes too, so
 * the pass repeats until the whole tree reaches a fixed point.
 *
 * Run it before every deploy:  node stamp.js
 * A run with nothing left to change is a no-op.
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SELF = fileURLToPath(import.meta.url);

// Files whose contents we scan and rewrite.
const SOURCE_DIRS = ['.', 'css', 'js', 'modules'];
const SOURCE_EXT = new Set(['.html', '.css', '.js']);

// Any absolute reference into one of these asset trees, with or without an
// existing ?v= suffix.
const ASSET_RE = /\/(?:img|css|js|font|modules)\/[\w./-]+?\.(?:png|css|js|ttf|woff2?|svg|jpg|jpeg|gif|webp)(?:\?v=[\w]+)?/g;

function collectSources() {
    const files = [];
    for (const dir of SOURCE_DIRS) {
        for (const entry of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
            const path = join(ROOT, dir, entry.name);
            if (entry.isFile() && SOURCE_EXT.has(extname(entry.name)) && path !== SELF) {
                files.push(path);
            }
        }
    }
    return files;
}

function stampOf(assetPath) {
    const full = join(ROOT, assetPath);
    if (!existsSync(full)) return null; // missing asset: leave the reference untouched
    return createHash('sha256').update(readFileSync(full)).digest('hex').slice(0, 10);
}

const stamped = new Set();

function pass() {
    let changed = 0;
    for (const file of collectSources()) {
        const before = readFileSync(file, 'utf8');
        const after = before.replace(ASSET_RE, (match) => {
            const path = match.replace(/\?v=[\w]+$/, '');
            const v = stampOf(path);
            return v === null ? match : `${path}?v=${v}`;
        });
        if (after !== before) {
            writeFileSync(file, after);
            changed++;
            stamped.add(file.slice(ROOT.length + 1));
        }
    }
    return changed;
}

let passes = 0;
while (pass() > 0 && ++passes < 10);

if (stamped.size) {
    for (const f of [...stamped].sort()) console.log(`stamped ${f}`);
    console.log(`\nDone — ${stamped.size} file(s) updated.`);
} else {
    console.log('Done — everything already up to date.');
}
