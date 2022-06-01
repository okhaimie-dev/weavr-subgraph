import {
	Address,
} from '@graphprotocol/graph-ts'

import {
	Frabric,
} from '../../../generated/schema'

import { Frabric as FrabricContract } from '../../../generated/Frabric/Frabric'
import { getFrabricERC20 } from './erc20'

export function getFrabric(address: Address): Frabric {
	let frabric = Frabric.load(address.toHexString())

	if (frabric === null) {
		let contract = FrabricContract.bind(address)

    getFrabricERC20(contract.erc20())

		frabric = new Frabric(address.toHexString())
		frabric.token = contract.erc20().toString()
		frabric.save()
	}

	return frabric
}