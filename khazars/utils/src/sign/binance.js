var crypto = require('crypto');

function encodeHMAC(SEC, data) {
    return crypto.createHmac('SHA256', SEC).update(data).digest('hex');
}

function signData(SEC, data) {
    var time = Date.now();
    var encodeData = ""
    var k = Object.keys(data)
    k.forEach(e => {
        if (e != "path") {
            encodeData += `${e}=${data[e]}&`
        }
    });
    encodeData += 'timestamp=' + time;
    encodeData = encodeHMAC(SEC, encodeData);
    data.time = time;
    data.sign = encodeData;
    return data;
}

module.exports = {
    encodeHMAC,
    signData
}