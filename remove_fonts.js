const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory && !dirPath.includes('node_modules') && !dirPath.includes('.next')) {
            walkDir(dirPath, callback);
        } else if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
            callback(dirPath);
        }
    });
}

function processFiles() {
    let filesChanged = 0;
    walkDir(path.join(__dirname, 'app'), file => {
        let content = fs.readFileSync(file, 'utf8');
        const originalContent = content;
        
        // Remove font-mono, font-sans, font-pixel, font-serif, and also any extra spaces left behind
        content = content.replace(/\bfont-(mono|sans|pixel|serif)\b/g, '');
        // Clean up multiple spaces inside className attributes
        content = content.replace(/className=(["'{])\s*(.*?)\s*(["'}])/g, (match, p1, p2, p3) => {
             const cleaned = p2.replace(/\s+/g, ' ').trim();
             return `className=${p1}${cleaned}${p3}`;
        });

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            filesChanged++;
            console.log(`Updated ${file}`);
        }
    });
    
    walkDir(path.join(__dirname, 'components'), file => {
        let content = fs.readFileSync(file, 'utf8');
        const originalContent = content;
        
        content = content.replace(/\bfont-(mono|sans|pixel|serif)\b/g, '');
        content = content.replace(/className=(["'{])\s*(.*?)\s*(["'}])/g, (match, p1, p2, p3) => {
             const cleaned = p2.replace(/\s+/g, ' ').trim();
             return `className=${p1}${cleaned}${p3}`;
        });

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            filesChanged++;
            console.log(`Updated ${file}`);
        }
    });
    
    console.log(`Total files changed: ${filesChanged}`);
}

processFiles();
