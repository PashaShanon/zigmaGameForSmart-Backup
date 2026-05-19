const encoding = '0123456789abcdefghijklmnopqrstuv';

let machineId = new Uint8Array(3);
if (typeof crypto !== 'undefined') {
    crypto.getRandomValues(machineId);
} else {
    for(let i=0; i<3; i++) machineId[i] = Math.floor(Math.random() * 256);
}

let pid = new Uint8Array(2);
if (typeof crypto !== 'undefined') {
    crypto.getRandomValues(pid);
} else {
    for(let i=0; i<2; i++) pid[i] = Math.floor(Math.random() * 256);
}

let counter = Math.floor(Math.random() * 16777216);

export function generateXid() {
    const time = Math.floor(Date.now() / 1000);
    const b = new Uint8Array(12);
    
    b[0] = (time >> 24) & 0xff;
    b[1] = (time >> 16) & 0xff;
    b[2] = (time >> 8) & 0xff;
    b[3] = time & 0xff;
    
    b[4] = machineId[0];
    b[5] = machineId[1];
    b[6] = machineId[2];
    
    b[7] = pid[0];
    b[8] = pid[1];
    
    counter = (counter + 1) & 0xffffff;
    b[9] = (counter >> 16) & 0xff;
    b[10] = (counter >> 8) & 0xff;
    b[11] = counter & 0xff;
    
    // base32 hex encoding
    let result = '';
    result += encoding[b[0] >> 3];
    result += encoding[((b[0] & 7) << 2) | (b[1] >> 6)];
    result += encoding[(b[1] >> 1) & 31];
    result += encoding[((b[1] & 1) << 4) | (b[2] >> 4)];
    result += encoding[((b[2] & 15) << 1) | (b[3] >> 7)];
    result += encoding[(b[3] >> 2) & 31];
    result += encoding[((b[3] & 3) << 3) | (b[4] >> 5)];
    result += encoding[b[4] & 31];
    result += encoding[b[5] >> 3];
    result += encoding[((b[5] & 7) << 2) | (b[6] >> 6)];
    result += encoding[(b[6] >> 1) & 31];
    result += encoding[((b[6] & 1) << 4) | (b[7] >> 4)];
    result += encoding[((b[7] & 15) << 1) | (b[8] >> 7)];
    result += encoding[(b[8] >> 2) & 31];
    result += encoding[((b[8] & 3) << 3) | (b[9] >> 5)];
    result += encoding[b[9] & 31];
    result += encoding[b[10] >> 3];
    result += encoding[((b[10] & 7) << 2) | (b[11] >> 6)];
    result += encoding[(b[11] >> 1) & 31];
    result += encoding[(b[11] & 1) << 4];
    
    return result;
}
