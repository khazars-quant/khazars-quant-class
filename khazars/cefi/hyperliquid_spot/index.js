const { createSpotClient } = require("../../utils/src/external/hyperliquid");

/**
 * Hyperliquid spot trading adapter.
 *
 * The class mirrors the same shape and response helpers that are already used
 * in the Binance adapters so that the quant orchestrator can call a unified
 * surface across every CEX/CEX-like integration. Every public method returns a
 * `{ status, data | error }` object to keep the calling conventions identical
 * to the historical implementation.
 */
class main {
    constructor(url, KEY, SEC, extra = {}) {
        this.baseUrl = url || "https://api.hyperliquid.xyz";
        this.KEY = KEY || "";
        this.SEC = SEC || "";
        this.extra = extra;
        this.client = createSpotClient({
            baseUrl: this.baseUrl,
            key: this.KEY,
            secret: this.SEC,
            account: extra.account
        });
    }

    /**
     * Helper that wraps async client calls and converts them to the unified
     * response format used throughout the rest of the codebase.
     */
    async wrap(action) {
        try {
            const data = await action();
            return { status: true, data };
        } catch (error) {
            return { status: false, error };
        }
    }

    /** Fetches account details including balances and auth metadata. */
    async account() {
        return this.wrap(() => this.client.getAccount());
    }

    /** Fetches the raw balance list for the current key pair. */
    async balances() {
        return this.wrap(() => this.client.getBalances());
    }

    /** Places a spot order. */
    async placeOrder(orderPayload = {}) {
        return this.wrap(() => this.client.placeOrder(orderPayload));
    }

    /** Cancels a previously submitted order. */
    async cancelOrder(cancelPayload = {}) {
        return this.wrap(() => this.client.cancelOrder(cancelPayload));
    }

    /** Lists currently open spot orders. */
    async openOrders(filter = {}) {
        return this.wrap(() => this.client.getOpenOrders(filter));
    }
}

module.exports = {
    main
};
