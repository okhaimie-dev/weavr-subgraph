import {
	Address, BigInt,
} from '@graphprotocol/graph-ts'

import {
  BondHoldings,
} from '../../../generated/schema'

export function getBondHoldings(bond: Address, governor: Address): BondHoldings {
  let id = bond.toHexString().concat("_").concat(governor.toHexString())

  let holdings = BondHoldings.load(id)

	if (holdings === null) {
		holdings = new BondHoldings(id)
    holdings.bond = bond.toHexString()
    holdings.governor = governor
    holdings.amount = BigInt.fromI32(0)
    holdings.save()
	}

	return holdings
}