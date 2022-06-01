import {
	Address, BigInt,
} from '@graphprotocol/graph-ts'

import {
  PricePoint,
} from '../../../generated/schema'

export function getPricePoint(frabricERC20: Address, price: BigInt): PricePoint {
  let id = frabricERC20.toString().concat("_").concat(price.toString())

  let pricePoint = PricePoint.load(id)

	if (pricePoint === null) {
		pricePoint = new PricePoint(id)
    pricePoint.frabricERC20 = frabricERC20.toString()
    pricePoint.price = price
    pricePoint.type = "Null"
    pricePoint.totalAmount = BigInt.fromI32(0)
		pricePoint.save()
	}

	return pricePoint
}