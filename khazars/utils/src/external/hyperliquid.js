/**
 * Thin wrapper that tries to load the official `@nktkas/hyperliquid` package.
 * When the package cannot be resolved (for example in restricted CI
 * environments) we fall back to a local stub so that the rest of the code and
 * its tests remain executable. Consumers are still encouraged to install the
 * official package in production because it includes the full feature set and
 * signature implementation provided by the Hyperliquid team.
 */
let cachedModule = null;

function resolveModule() {
    if (cachedModule) {
        return cachedModule;
    }
    try {
        cachedModule = require("@nktkas/hyperliquid");
    } catch (error) {
        cachedModule = require("./hyperliquidStub");
    }
    return cachedModule;
}

function createSpotClient(config = {}) {
    const mod = resolveModule();
    if (typeof mod.createSpotClient === "function") {
        return mod.createSpotClient(config);
    }
    if (mod.SpotClient) {
        return new mod.SpotClient(config);
    }
    if (mod.default && typeof mod.default.createSpotClient === "function") {
        return mod.default.createSpotClient(config);
    }
    throw new Error("Unable to initialise Hyperliquid spot client");
}

function createPerpClient(config = {}) {
    const mod = resolveModule();
    if (typeof mod.createPerpClient === "function") {
        return mod.createPerpClient(config);
    }
    if (mod.PerpClient) {
        return new mod.PerpClient(config);
    }
    if (mod.default && typeof mod.default.createPerpClient === "function") {
        return mod.default.createPerpClient(config);
    }
    throw new Error("Unable to initialise Hyperliquid perpetual client");
}

module.exports = {
    createSpotClient,
    createPerpClient
};
