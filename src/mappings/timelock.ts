import { Lock, Claim } from '../../generated/Timelock/Timelock';
import { Timelock } from '../../generated/schema';
import { BigInt } from '@graphprotocol/graph-ts';

// ### TIMELOCK ###

export function handleLock(event: Lock): void {
  let lock = new Timelock(event.params.token.toHexString())
  lock.timestamp = event.block.timestamp.toI32()
  lock.token = event.params.token
  lock.months = event.params.months
  lock.amountClaimed = BigInt.fromI32(0)
  lock.save()
}

export function handleClaim(event: Claim): void {
  let lock = new Timelock(event.params.token.toHexString())
  lock.amountClaimed = event.params.amount
  lock.save()
}