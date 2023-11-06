const khazars = require("./khazars/index");
require('dotenv').config()
async function test() {
    // console.log(
    //     khazars.utils.w3.utils.getKeyPair(khazars.utils.w3.utils.newAccount().privateKey)
    // );
    // console.log(
    //         khazars
    //     )
    // const k = new khazars.quant()
    const k = new khazars.quant(
        "binance_spot", [process.env.BINANCE_TEST_KEY, BINANCE_TEST_SEC]
    )
    console.log(k)
    const acc = await k.account();
    console.log(acc)
}

test()