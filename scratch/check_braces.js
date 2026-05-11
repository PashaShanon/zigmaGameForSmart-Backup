const fs = require('fs');
const content = fs.readFileSync('server/src/rooms/GameRoom.ts', 'utf8');
const lines = content.split('\n');
let balance = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let char of line) {
        if (char === '{') balance++;
        if (char === '}') {
            balance--;
            if (balance < 0) {
                console.log(`Extra closing brace found at line ${i + 1}: ${line.trim()}`);
                process.exit(0);
            }
        }
    }
}
if (balance > 0) {
    console.log(`Unclosed opening brace(s). Balance: ${balance}`);
} else {
    console.log("Braces are balanced.");
}
