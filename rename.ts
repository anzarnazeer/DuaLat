import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (filePath: string) => void) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const targetDir = path.join(process.cwd(), 'src');

walkDir(targetDir, (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js') || filePath.endsWith('.json')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    let newContent = content.replace(/SproutWear/gi, 'DuaLat');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated:', filePath);
    }
  }
});
