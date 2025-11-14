# Khazars quant trading system

** Khazars quant trading system is a env platform for crypto quantum trading .**

## What crypto exchange supoort ?

- #### Defi part
    - [ ] 1inch swap 
    - [ ] uniswap v2

- #### Cefi part
    - [ ] Binance spot
    - [ ] Binance U-future
    - [ ] Okex spot
    - [ ] Okex U-future
    - [ ] Bybit spot
    - [ ] Bybit U-future
    - [x] Hyperliquid spot (powered by `@nktkas/hyperliquid`)
    - [x] Hyperliquid perpetuals (powered by `@nktkas/hyperliquid`)

### Hyperliquid 现货/永续接口

Hyperliquid 适配器默认会尝试加载 [`@nktkas/hyperliquid`](https://www.npmjs.com/package/@nktkas/hyperliquid)。
在无法联网的环境中，系统会自动回退到仓库内置的 stub，从而保证示例与测试依旧可运行。

```js
const { quant } = require("./khazars");
const hyperSpot = new quant("hyperliquid_spot", ["pubKey", "privKey"]);
const order = await hyperSpot.placeOrder({ symbol: "BTC-USDC", side: "buy", price: 10000, size: 0.1 });
```

若要在生产环境中连接真实的交易所，只需先安装官方 SDK：

```bash
npm install @nktkas/hyperliquid
```

### 测试

```bash
npm test
```

## How should i run the example / test

```node test.js```

**You can also find the npm ** [Here](https://www.npmjs.com/package/khazars-quant)

**Or**

```npm i khazars-quant```