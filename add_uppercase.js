const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file === 'node_modules' || file === '.next' || file === 'dist') return;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(filePath));
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            results.push(filePath);
        }
    });
    return results;
}

const uppercaseClasses = [
    { match: /text-xs(?! uppercase)/g, replace: 'text-xs uppercase tracking-wider' },
    { match: /text-sm(?! uppercase)/g, replace: 'text-sm uppercase tracking-widest' },
    { match: /tracking-tight\s*text-3xl(?! uppercase)/g, replace: 'tracking-tight uppercase text-3xl' },
    { match: /tracking-tight\s*text-4xl(?! uppercase)/g, replace: 'tracking-tight uppercase text-4xl' },
    { match: /tracking-tight\s*text-xl(?! uppercase)/g, replace: 'tracking-tight uppercase text-xl' },
    { match: /font-bold([^"]*text-text-primary[^"]*mb-2(?! uppercase))/g, replace: 'font-bold$1 uppercase tracking-wider' }, // headers
    { match: /font-bold([^"]*text-text-primary[^"]*mb-4(?! uppercase))/g, replace: 'font-bold$1 uppercase tracking-wider' }, // headers
]

const files = walk('.');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    for (const {match, replace} of uppercaseClasses) {
        content = content.replace(match, replace);
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Restored uppercase in ' + file);
    }
});
