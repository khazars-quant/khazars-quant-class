const khazars = require("./khazars/index");

async function test() {
    // console.log(
    //     khazars.utils.w3.utils.getKeyPair(khazars.utils.w3.utils.newAccount().privateKey)
    // );
    // console.log(
    //         khazars
    //     )
    // const k = new khazars.quant()
    const k = new khazars.quant(
        "binance_spot", ["binance_API", "binance_SEC"]
    )
    console.log(k)
    const acc = k.account();
}

test()