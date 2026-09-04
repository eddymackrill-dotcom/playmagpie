'use client'

import { useState } from 'react'

// Input-dependent lookup layer for /guides/crypto-casino-withdrawal-txid
// (slate 2026-09-05). Deliberately API-free: the component only CONSTRUCTS
// a public block-explorer URL from the user's own TXID and opens it in a
// new tab, so there are no rate limits, no keys, nothing to break, and the
// prose shell around it stays fully crawlable. Explorer links are plain
// outbound references, NOT affiliate links: rel carries no "sponsored"
// (the affiliate_click tracker keys off rel~=sponsored plus known
// affiliate hosts, so these clicks are invisible to it by design).

type Chain = {
  id: string
  label: string
  explorer: string
  buildUrl: (txid: string) => string
}

const CHAINS: Chain[] = [
  { id: 'btc', label: 'Bitcoin (BTC)', explorer: 'mempool.space', buildUrl: (t) => `https://mempool.space/tx/${t}` },
  { id: 'eth', label: 'Ethereum (ETH, ERC-20 USDT/USDC)', explorer: 'Etherscan', buildUrl: (t) => `https://etherscan.io/tx/${t}` },
  { id: 'trx', label: 'Tron (TRC-20 USDT)', explorer: 'Tronscan', buildUrl: (t) => `https://tronscan.org/#/transaction/${t}` },
  { id: 'ltc', label: 'Litecoin (LTC)', explorer: 'Blockchair', buildUrl: (t) => `https://blockchair.com/litecoin/transaction/${t}` },
  { id: 'doge', label: 'Dogecoin (DOGE)', explorer: 'Blockchair', buildUrl: (t) => `https://blockchair.com/dogecoin/transaction/${t}` },
  { id: 'sol', label: 'Solana (SOL)', explorer: 'Solscan', buildUrl: (t) => `https://solscan.io/tx/${t}` },
  { id: 'bnb', label: 'BNB Smart Chain (BEP-20)', explorer: 'BscScan', buildUrl: (t) => `https://bscscan.com/tx/${t}` },
]

export default function TxidLookup() {
  const [chainId, setChainId] = useState<string>('btc')
  const [txid, setTxid] = useState('')
  const chain = CHAINS.find((c) => c.id === chainId) ?? CHAINS[0]
  const cleaned = txid.trim()
  const href = cleaned ? chain.buildUrl(encodeURIComponent(cleaned)) : null

  return (
    <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 my-4">
      <div className="text-[#7BB8D4] text-xs font-bold uppercase tracking-widest mb-3">
        Look up your withdrawal on-chain
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={chainId}
          onChange={(e) => setChainId(e.target.value)}
          aria-label="Blockchain network"
          className="bg-[#0a0a0a] border border-[#333333] rounded-xl px-3 py-2.5 text-sm text-[#f5f5f5] sm:w-64"
        >
          {CHAINS.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
        <input
          type="text"
          value={txid}
          onChange={(e) => setTxid(e.target.value)}
          placeholder="Paste your transaction ID (TXID)"
          aria-label="Transaction ID"
          className="flex-1 bg-[#0a0a0a] border border-[#333333] rounded-xl px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555555]"
        />
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#7BB8D4] text-[#0a0a0a] font-semibold rounded-xl px-5 py-2.5 text-sm text-center hover:bg-[#8fc4d8] transition-colors whitespace-nowrap"
          >
            Check on {chain.explorer}
          </a>
        ) : (
          <span className="bg-[#222222] text-[#555555] font-semibold rounded-xl px-5 py-2.5 text-sm text-center whitespace-nowrap select-none">
            Check on {chain.explorer}
          </span>
        )}
      </div>
      <p className="text-[#555555] text-xs mt-3 leading-relaxed">
        Opens the public block explorer in a new tab with your TXID filled in. We never see, store or send
        your TXID anywhere: the link is built in your browser. Pick the network you actually withdrew on,
        which is shown in the casino cashier next to the withdrawal.
      </p>
    </div>
  )
}
