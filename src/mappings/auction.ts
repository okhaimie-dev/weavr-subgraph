import { BigInt } from '@graphprotocol/graph-ts';
import { AuctionComplete, Auctions, Bid as BidEvent } from '../../generated/Auction/Auction';
import { Auction, AuctionBatch, Bid } from '../../generated/schema';

export function handleAuctions(event: Auctions): void {
  var id = event.params.startID
  let numOfBatches = BigInt.fromI64(event.params.quantity)

  let auction = new Auction(id.toString())
  auction.seller = event.params.seller
  auction.token = event.params.token
  auction.traded = event.params.traded
  auction.totalAmount = event.params.total
  auction.start = event.params.start.toI32()
  auction.length = event.params.length.toI32()
  auction.save()

  while (id.lt(id.plus(numOfBatches))) {
    let batch = new AuctionBatch(id.toString())
    batch.auction = auction.id
    batch.isComplete = false
    batch.save()
    
    id.plus(BigInt.fromI32(1))
  }
}

export function handleBid(event: BidEvent): void {
  let bid = new Bid(event.params.id.toString().concat("_").concat(event.params.bidder.toString()))
  bid.auctionBatch = event.params.id.toString()
  bid.bidder = event.params.bidder
  bid.amount = event.params.amount
  bid.save()
}

export function handleAuctionComplete(event: AuctionComplete): void {
  let batch = new AuctionBatch(event.params.id.toString())
  batch.isComplete = false
  batch.save()
}