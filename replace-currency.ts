import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (filePath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const targetDir = path.join(process.cwd(), 'src');

walkDir(targetDir, (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace $ followed by a digit (e.g. $45 -> ₹45)
    let newContent = content.replace(/\$([0-9])/g, '₹$1');
    
    // Replace $${ (e.g. `$${price}` -> `₹${price}`)
    newContent = newContent.replace(/\$\$\{/g, '₹${');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated:', filePath);
    }
  }
});
