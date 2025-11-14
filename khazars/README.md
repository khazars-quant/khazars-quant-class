# Khazars quant trading system npm 

** Khazars quant trading system is a env platform for crypto quantum trading .**

## What crypto exchange supoort ?

- #### Defi part
    - [ ] 1inch swap 
    - [ ] uniswap v2

- #### Cefi part
    - [x] Binance spot
    - [x] Binance U-future
    - [ ] Okex spot
    - [ ] Okex U-future
    - [ ] Bybit spot
    - [ ] Bybit U-future
    - [x] Hyperliquid spot (via `@nktkas/hyperliquid`)
    - [x] Hyperliquid perpetuals (via `@nktkas/hyperliquid`)

### Hyperliquid 现货/永续接口

```js
const { quant } = require("khazars-quant");
const hyperSpot = new quant("hyperliquid_spot", ["pubKey", "privKey"]);
const hyperPerp = new quant("hyperliquid_perp", ["pubKey", "privKey"], { defaultLeverage: 5 });

await hyperSpot.placeOrder({ symbol: "BTC-USDC", side: "buy", price: 25000, size: 0.1 });
await hyperPerp.setLeverage({ leverage: 10 });
```

> 依赖 `@nktkas/hyperliquid` SDK。若该模块无法下载，khazars 会自动启用内置 stub 以方便本地调试与测试。

## How should i run the example / test

Install the npm package

```npm i khazars-quant ```

Import it 

```
const khazars = require("khazars-quant");
```