/**
 * Hyperliquid stub client
 * The real implementation lives in the `@nktkas/hyperliquid` npm package.
 * This stub is used exclusively for local testing inside this repository where
 * the upstream dependency cannot be downloaded. The shape of the API mimics
 * the subset of helpers required by the khazars quant interface so that the
 * rest of the code can remain identical when the real SDK is installed.
 */
class BaseClientStub {
    constructor(config = {}) {
        this.baseUrl = config.baseUrl || "https://api.hyperliquid-stub.local";
        this.key = config.key || "demo-key";
        this.secret = config.secret || "demo-secret";
        this.account = config.account || "stub-account";
        this.quoteSymbol = config.quoteSymbol || "USDC";
        this.orderId = 0;
        this.orders = [];
        this.positions = [];
        this.balances = [{ symbol: this.quoteSymbol, available: 100000 }];
        this.maxLeverage = 1;
    }

    async getAccount() {
        return {
            account: this.account,
            balances: this.balances,
            leverage: this.maxLeverage,
            baseUrl: this.baseUrl
        };
    }

    async getBalances() {
        return this.balances;
    }

    async getOpenOrders(filter = {}) {
        return this.orders.filter((order) => {
            if (filter.symbol && order.symbol !== filter.symbol) {
                return false;
            }
            return order.status === "open";
        });
    }

    async placeOrder(orderInput = {}) {
        const order = {
            id: ++this.orderId,
            symbol: orderInput.symbol || "BTC-USDC",
            side: orderInput.side || "buy",
            price: orderInput.price || 1,
            size: orderInput.size || 1,
            type: orderInput.type || "limit",
            reduceOnly: Boolean(orderInput.reduceOnly),
            status: "open"
        };
        this.orders.push(order);

        if (this.isPerp && !order.reduceOnly) {
            const pos = this.positions.find((p) => p.symbol === order.symbol && p.side === order.side);
            if (pos) {
                pos.size += order.size;
                pos.entryPrice = order.price;
            } else {
                this.positions.push({
                    id: this.positions.length + 1,
                    symbol: order.symbol,
                    side: order.side,
                    size: order.size,
                    entryPrice: order.price
                });
            }
        }

        return order;
    }

    async cancelOrder(payload = {}) {
        const { orderId } = payload;
        const order = this.orders.find((item) => item.id === orderId);
        if (!order) {
            throw new Error(`order ${orderId} not found`);
        }
        order.status = "canceled";
        return { id: order.id, canceled: true };
    }
}

class SpotClientStub extends BaseClientStub {
    constructor(config = {}) {
        super(config);
        this.isPerp = false;
    }
}

class PerpClientStub extends BaseClientStub {
    constructor(config = {}) {
        super(config);
        this.isPerp = true;
        this.maxLeverage = config.defaultLeverage || 5;
    }

    async getPositions() {
        return this.positions;
    }

    async setLeverage(payload = {}) {
        const { leverage } = payload;
        if (typeof leverage === "number" && leverage > 0) {
            this.maxLeverage = leverage;
        }
        return { leverage: this.maxLeverage };
    }
}

function createSpotClient(config = {}) {
    return new SpotClientStub(config);
}

function createPerpClient(config = {}) {
    return new PerpClientStub(config);
}

module.exports = {
    SpotClient: SpotClientStub,
    PerpClient: PerpClientStub,
    createSpotClient,
    createPerpClient
};
