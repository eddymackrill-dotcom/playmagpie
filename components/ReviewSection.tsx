import { Casino } from '@/lib/casinos'
import { ScoreBar } from './ScoreBadge'
import ScoreBadge from './ScoreBadge'
import CTAButton from './CTAButton'

export default function ReviewSection({ casino }: { casino: Casino }) {
  return (
    <article className="space-y-10">
      {/* Overview */}
      <section>
        <h2 className="text-xl font-bold text-[#f5f5f5] mb-3">Overview</h2>
        <p className="text-[#888888] leading-relaxed">{casino.reviewSummary}</p>
      </section>

      {/* Scores */}
      <section>
        <h2 className="text-xl font-bold text-[#f5f5f5] mb-4">Scores</h2>
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#888888]">Trust Score</span>
            </div>
            <ScoreBar score={casino.trustScore} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#888888]">Withdrawal Score</span>
            </div>
            <ScoreBar score={casino.withdrawalScore} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#888888]">Bonus Fairness</span>
            </div>
            <ScoreBar score={casino.bonusFairnessScore} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#888888]">KYC Score</span>
            </div>
            <ScoreBar score={casino.kycScore} />
          </div>
        </div>
      </section>

      {/* Pros and Cons */}
      <section>
        <h2 className="text-xl font-bold text-[#f5f5f5] mb-4">Pros & Cons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5">
            <h3 className="text-[#f5f5f5] font-semibold mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#7BB8D4]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Pros
            </h3>
            <ul className="space-y-2">
              {casino.pros.map((pro) => (
                <li key={pro} className="text-[#888888] text-sm flex items-start gap-2">
                  <span className="text-[#7BB8D4] mt-0.5 flex-shrink-0">✓</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5">
            <h3 className="text-[#888888] font-semibold mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Cons
            </h3>
            <ul className="space-y-2">
              {casino.cons.map((con) => (
                <li key={con} className="text-[#888888] text-sm flex items-start gap-2">
                  <span className="text-[#888888] mt-0.5 flex-shrink-0">✗</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Crypto & Payments */}
      <section>
        <h2 className="text-xl font-bold text-[#f5f5f5] mb-4">Crypto & Payment Support</h2>
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
          <div className="flex flex-wrap gap-2">
            {casino.acceptedCryptos.map((crypto) => (
              <span
                key={crypto}
                className="px-3 py-1.5 bg-[#7BB8D4]/10 border border-[#7BB8D4]/20 rounded-lg text-[#7BB8D4] text-sm font-semibold"
              >
                {crypto}
              </span>
            ))}
          </div>
          <p className="text-[#888888] text-sm mt-4">
            {casino.name} accepts {casino.acceptedCryptos.length} cryptocurrencies. All crypto deposits and withdrawals are processed on-chain directly to your wallet.
          </p>
        </div>
      </section>

      {/* KYC */}
      <section>
        <h2 className="text-xl font-bold text-[#f5f5f5] mb-4">KYC Requirements</h2>
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-[#7BB8D4]/10 text-[#7BB8D4] border border-[#7BB8D4]/20">
              {casino.kycLevel} KYC
            </span>
          </div>
          <p className="text-[#888888] text-sm">
            {casino.kycLevel === 'None'
              ? 'No identity verification required. Sign up with an email and start playing immediately.'
              : casino.kycLevel === 'Light'
              ? 'Minimal verification — usually just email confirmation. Full KYC only triggered above high withdrawal thresholds.'
              : casino.kycLevel === 'Standard'
              ? 'Standard verification required: government ID and proof of address. Processing typically takes under 24 hours.'
              : 'Full KYC verification required for all players before withdrawals are processed.'}
          </p>
        </div>
      </section>

      {/* Withdrawals */}
      <section>
        <h2 className="text-xl font-bold text-[#f5f5f5] mb-4">Withdrawal Review</h2>
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-[#888888] text-xs mb-1">Typical Time</div>
              <div className="text-[#f5f5f5] font-bold">{casino.withdrawalTime}</div>
            </div>
            <div>
              <div className="text-[#888888] text-xs mb-1">Min Deposit</div>
              <div className="text-[#f5f5f5] font-bold">{casino.minDeposit}</div>
            </div>
            <div>
              <div className="text-[#888888] text-xs mb-1">Withdrawal Score</div>
              <div className="text-[#7BB8D4] font-bold">{casino.withdrawalScore}/10</div>
            </div>
          </div>
          <p className="text-[#888888] text-sm">
            {casino.name} processes crypto withdrawals {casino.withdrawalTime.toLowerCase()}. Payouts go directly to the wallet address you specify — no middlemen, no holds.
          </p>
        </div>
      </section>

      {/* Bonus */}
      <section>
        <h2 className="text-xl font-bold text-[#f5f5f5] mb-4">Bonus Summary</h2>
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
          <p className="text-[#f5f5f5] font-semibold mb-2">{casino.bonusSummary}</p>
          <p className="text-[#888888] text-sm">
            Bonus Fairness Score: <span className="text-[#7BB8D4] font-bold">{casino.bonusFairnessScore}/10</span>
          </p>
        </div>
      </section>

      {/* VIP */}
      <section>
        <h2 className="text-xl font-bold text-[#f5f5f5] mb-4">VIP & High Roller Suitability</h2>
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                casino.vipProgram
                  ? 'bg-[#7BB8D4]/10 text-[#7BB8D4] border border-[#7BB8D4]/20'
                  : 'bg-[#1a1a1a] text-[#888888] border border-[#222222]'
              }`}
            >
              {casino.vipProgram ? 'VIP Programme Available' : 'No VIP Programme'}
            </span>
          </div>
          <p className="text-[#888888] text-sm">
            {casino.vipProgram
              ? `${casino.name} runs a dedicated VIP programme with cashback, higher limits, and exclusive rewards for high-volume players.`
              : `${casino.name} does not currently offer a structured VIP programme. All players are treated equally.`}
          </p>
        </div>
      </section>

      {/* Licence */}
      <section>
        <h2 className="text-xl font-bold text-[#f5f5f5] mb-4">Licence & Regulation</h2>
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
          <p className="text-[#f5f5f5] font-semibold mb-1">{casino.licence}</p>
          <p className="text-[#888888] text-sm">
            {casino.name} operates under a {casino.licence} licence. All operations are subject to the jurisdiction&apos;s compliance requirements.
          </p>
        </div>
      </section>

      {/* Final Verdict */}
      <section>
        <h2 className="text-xl font-bold text-[#f5f5f5] mb-4">Final Verdict</h2>
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-4xl font-extrabold text-[#7BB8D4]">{casino.trustScore}</div>
              <div className="text-[#888888] text-sm">Overall Score</div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {casino.badges.map((badge) => (
                <ScoreBadge key={badge} label={badge} />
              ))}
            </div>
          </div>
          <p className="text-[#888888] text-sm leading-relaxed">{casino.reviewSummary}</p>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#7BB8D4]/[0.06] border border-[#7BB8D4]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-[#f5f5f5] font-bold text-lg">{casino.bonusSummary}</div>
          <div className="text-[#888888] text-sm mt-1">Available now at {casino.name}</div>
        </div>
        <CTAButton href={casino.affiliateUrl} label="Claim Bonus Now" variant="primary" size="lg" external />
      </div>
    </article>
  )
}
