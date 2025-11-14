const assert = require("assert");
const khazars = require("./khazars/index");

async function testHyperliquidSpot() {
    const spot = new khazars.quant("hyperliquid_spot", ["spot-key", "spot-secret"]);
    const account = await spot.account();
    assert.equal(account.status, true, "spot account call failed");
    const order = await spot.placeOrder({ symbol: "BTC-USDC", side: "buy", price: 10000, size: 0.1 });
    assert.equal(order.status, true, "spot order placement failed");
    const open = await spot.openOrders({ symbol: "BTC-USDC" });
    assert.equal(open.status, true, "spot open orders failed");
    assert.equal(open.data.length, 1, "spot order not tracked");
    const cancel = await spot.cancelOrder({ orderId: order.data.id });
    assert.equal(cancel.status, true, "spot cancel failed");
    const openAfter = await spot.openOrders({ symbol: "BTC-USDC" });
    assert.equal(openAfter.data.length, 0, "spot order not cancelled");
}

async function testHyperliquidPerp() {
    const perp = new khazars.quant("hyperliquid_perp", ["perp-key", "perp-secret"], {
        defaultLeverage: 3
    });
    const account = await perp.account();
    assert.equal(account.status, true, "perp account call failed");
    const order = await perp.placeOrder({ symbol: "ETH-USDC", side: "long", price: 1800, size: 0.5 });
    assert.equal(order.status, true, "perp order placement failed");
    const positions = await perp.positions();
    assert.equal(positions.status, true, "perp positions failed");
    assert(positions.data.length > 0, "perp position not tracked");
    const leverage = await perp.setLeverage({ leverage: 8 });
    assert.equal(leverage.status, true, "perp leverage update failed");
    assert.equal(leverage.data.leverage, 8, "perp leverage mismatch");
    const cancel = await perp.cancelOrder({ orderId: order.data.id });
    assert.equal(cancel.status, true, "perp cancel failed");
}

async function run() {
    await testHyperliquidSpot();
    await testHyperliquidPerp();
    console.log("Hyperliquid integration tests passed");
}

run().catch((error) => {
    console.error(error);
    process.exit(1);
});