import { Bond as BondEvent, Slash, Unbond, Distribution as DistributionEvent, Claim as ClaimEvent } from '../../generated/Bond/BondContract';
import { Bond, Distribution, Claim, BondDistribution } from '../../generated/schema';
import { Initialized } from '../../generated/ThreadDeployer/ThreadDeployer';
import { getBondHoldings } from './helpers/bond';

// ### LIFECYCLE ###

export function handleInitialized(event: Initialized): void {
  // For now we don't care about the bond initialization
}

// ### BONDING ###

// TODO: Test for rounding errors

export function handleBond(event: BondEvent): void {
  let bond = new Bond(event.address.toHexString())
  bond.save()

  let holdings = getBondHoldings(event.address, event.params.governor)
  holdings.bond = bond.id
  holdings.governor = event.params.governor
  holdings.amount = holdings.amount.plus(event.params.amount)
  holdings.save()
}

export function handleSlash(event: Slash): void {
  let holdings = getBondHoldings(event.address, event.params.governor)
  holdings.bond = event.address.toHexString()
  holdings.governor = event.params.governor
  holdings.amount = holdings.amount.minus(event.params.amount)
  holdings.save()
}

export function handleUnbond(event: Unbond): void {
  let holdings = getBondHoldings(event.address, event.params.governor)
  holdings.bond = event.address.toHexString()
  holdings.governor = event.params.governor
  holdings.amount = holdings.amount.minus(event.params.amount)
  holdings.save()
}

// ### DISTRIBUTION ###

export function handleDistribution(event: DistributionEvent): void {
  let distribution = new Distribution(event.params.id.toString())
  distribution.token = event.params.token
  distribution.amount = event.params.amount
  distribution.save()

  let bondDistribution = new BondDistribution(event.params.id.toString())
  bondDistribution.bond = event.address.toHexString()
  bondDistribution.distribution = distribution.id
  bondDistribution.save()
}

export function handleClaim(event: ClaimEvent): void {
  let claim = new Claim(event.transaction.hash.toString())
  claim.distribution = event.params.id.toString()
  claim.person = event.params.person
  claim.amount = event.params.amount
  claim.save()
}