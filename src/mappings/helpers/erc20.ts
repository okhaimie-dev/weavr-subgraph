import {
	Address, BigInt,
} from '@graphprotocol/graph-ts'

import {
	FrabricERC20,
  FrabricERC20Holder,
  FrabricERC20Balance,
} from '../../../generated/schema'

import { FrabricERC20 as FrabricERC20Contract } from '../../../generated/templates/FrabricERC20/FrabricERC20'

export function getFrabricERC20(address: Address): FrabricERC20 {
	let token = FrabricERC20.load(address.toHexString())

	if (token === null) {
		let contract = FrabricERC20Contract.bind(address)

		token = new FrabricERC20(address.toHexString())
		token.globalAcceptance = false
		token.name = contract.name()
		token.symbol = contract.symbol()
		token.decimals = contract.decimals()
		token.supply = contract.totalSupply()
		token.tradeToken = contract.tradeToken()
		token.save()
	}

	return token
}

export function getFrabricERC20Holder(address: Address): FrabricERC20Holder {
	let holder = FrabricERC20Holder.load(address.toHexString())

	if (holder === null) {
		holder = new FrabricERC20Holder(address.toHexString())
		holder.save()
	}

	return holder
}

export function getFrabricERC20Balance(
  token: FrabricERC20, 
  holder: FrabricERC20Holder
): FrabricERC20Balance {
	let id = token.id.concat('_').concat(holder.id)
	let balance = FrabricERC20Balance.load(id)

	if (balance === null) {
		balance = new FrabricERC20Balance(id)
		balance.frabricERC20 = token.id
		balance.holder = holder.id
		balance.amount = BigInt.fromI32(0)
		balance.save()
	}

	return balance
}