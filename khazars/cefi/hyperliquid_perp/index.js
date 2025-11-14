const { createPerpClient } = require("../../utils/src/external/hyperliquid");

/**
 * Hyperliquid perpetual trading adapter.
 * Maintains the same ergonomics as the Binance future connector so strategies
 * can switch between exchanges with minimal friction.
 */
class main {
    constructor(url, KEY, SEC, extra = {}) {
        this.baseUrl = url || "https://api.hyperliquid.xyz";
        this.KEY = KEY || "";
        this.SEC = SEC || "";
        this.extra = extra;
        this.client = createPerpClient({
            baseUrl: this.baseUrl,
            key: this.KEY,
            secret: this.SEC,
            account: extra.account,
            defaultLeverage: extra.defaultLeverage
        });
    }

    async wrap(action) {
        try {
            const data = await action();
            return { status: true, data };
        } catch (error) {
            return { status: false, error };
        }
    }

    /** Account and margin overview. */
    async account() {
        return this.wrap(() => this.client.getAccount());
    }

    /** Current open derivatives positions. */
    async positions() {
        return this.wrap(() => this.client.getPositions());
    }

    /** Places a perpetual order (market/limit supported by the SDK). */
    async placeOrder(orderPayload = {}) {
        return this.wrap(() => this.client.placeOrder(orderPayload));
    }

    /** Cancels a pending order by id. */
    async cancelOrder(cancelPayload = {}) {
        return this.wrap(() => this.client.cancelOrder(cancelPayload));
    }

    /** Lists all open orders optionally filtered by symbol. */
    async openOrders(filter = {}) {
        return this.wrap(() => this.client.getOpenOrders(filter));
    }

    /** Updates account leverage configuration when supported. */
    async setLeverage(payload = {}) {
        return this.wrap(() => this.client.setLeverage(payload));
    }
}

module.exports = {
    main
};
