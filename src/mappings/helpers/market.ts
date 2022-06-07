import {
	Address, BigInt,
} from '@graphprotocol/graph-ts'

import {
  PricePoint,
} from '../../../generated/schema'

export function getPricePoint(frabricERC20: Address, price: BigInt): PricePoint {
  let id = frabricERC20.toHexString().concat("_").concat(price.toHexString())

  let pricePoint = PricePoint.load(id)

	if (pricePoint === null) {
		pricePoint = new PricePoint(id)
    pricePoint.frabricERC20 = frabricERC20.toHexString()
    pricePoint.price = price
    pricePoint.type = "Null"
    pricePoint.totalAmount = BigInt.fromI32(0)
		pricePoint.save()
	}

	return pricePoint
}