const khazars = require("./khazars/index");

async function test() {
    console.log(
        khazars.utils.w3.utils.getKeyPair(khazars.utils.w3.utils.newAccount().privateKey)
    );
    // const k = new khazars.quant()
}

test()