import { Address, dataSource, log, BigInt, store } from '@graphprotocol/graph-ts';
import { Thread as ThreadContract, DescriptorChange, DescriptorChangeProposal, FrabricChange, GovernorChange, Initialized, Proposal, Vote as VoteEvent, ProposalStateChange } from '../../generated/templates/Thread/Thread';
import { BaseProposal, Thread, PricePoint, DissolutionProposal, EcosystemLeaveWithUpgradesProposal, FrabricChangeProposal, GovernorChangeProposal, ParticipantRemovalProposal, TokenActionProposal, UpgradeProposal, Vote, Frabric, DesriptorChangeProposal } from '../../generated/schema';
import { proposalStateAtIndex, voteDirectionAtIndex } from './helpers/types'

// ### THREAD LIFECYCLE ###

export function handleInitialized(event: Initialized): void {
  
}

// ### THREAD STRUCTURE ###

export function handleFrabricChange(event: FrabricChange): void {
  log.info("Calling {}", ["handleFrabricChange"])

  // The force-unwrapping will (supposedly) throw fatal error
  // if the object isn't found.
  let frabric = Frabric.load(event.params.newGovernor.toString())!

  // TheGraph supports record merge operations automatically
  // so it's faster to save a new object with the same ID
  // versus load and update an existing one.
  let thread = new Thread(event.address.toString())
  thread.frabric = frabric.id
  thread.save()
}

export function handleDescriptorChange(event: DescriptorChange): void {
  log.info("Calling {}", ["handleDescriptorChange"])

  let thread = new Thread(event.address.toString())
  thread.descriptor = event.params.newDescriptor
  thread.save()
}

export function handleGovernorChange(event: GovernorChange): void {
  log.info("Calling {}", ["handleGovernorChange"])

  let thread = new Thread(event.address.toString())
  thread.governor = event.params.newGovernor
  thread.save()
}

// ### THREAD PROPOSALS ###

export function handleDescriptorChangeProposal(event: DescriptorChangeProposal): void {
  log.info("Calling {}", ["handleDescriptorChangeProposal"])

  // Take the previously created base proposal
  let baseProposal = BaseProposal.load(event.params.id.toHexString())!

  // Create the specific proposal record composed
  // with the base proposal

  let proposal = new DesriptorChangeProposal(event.params.id.toHexString())
  proposal.thread = event.address.toString()
  proposal.descriptor = event.params.descriptor
  proposal.baseProposal = baseProposal.id
  proposal.save()
}

export function handleGovernorChangeProposal(event: GovernorChangeProposal): void {
  throw "Not implemented"
}

export function handleParticipantRemovalProposal(event: ParticipantRemovalProposal): void {
  throw "Not implemented"
}

export function handleTokenActionProposal(event: TokenActionProposal): void {
  throw "Not implemented"
}

export function handleUpgradeProposal(event: UpgradeProposal): void {
  throw "Not implemented"
}

export function handleDissolutionProposal(event: DissolutionProposal): void {
  throw "Not implemented"
}

export function handleFrabricChangeProposal(event: FrabricChangeProposal): void {
  throw "Not implemented"
}

export function handleEcosystemLeaveWithUpgradesProposal(
  event: EcosystemLeaveWithUpgradesProposal
): void {
  throw "Not implemented"
}

export function handleProposal(event: Proposal): void {
  log.info("Calling {}", ["handleProposal"])

  let contract = ThreadContract.bind(event.address)

  let proposal = new BaseProposal(event.params.id.toString())
  proposal.thread = event.address.toString()
  proposal.creator = event.params.creator
  // TODO: Smart-map it to a type convenient for the frontend
  proposal.type = event.params.proposalType.toI32()
  proposal.state = "Null"
  proposal.info = event.params.info
  proposal.supermajority = event.params.supermajority
  proposal.startTimestamp = event.block.timestamp.toI32()
  proposal.endTimestamp = proposal.startTimestamp + contract.votingPeriod().toI32()
  proposal.save()
}

export function handleProposalStateChange(event: ProposalStateChange): void {
  log.info("Calling {}", ["handleProposalStateChange"])

  let proposal = new BaseProposal(event.params.id.toString())
  proposal.state =  proposalStateAtIndex(event.params.state)
  proposal.save()
}

export function handleVote(event: VoteEvent): void {
  log.info("Calling {}", ["handleVote"])

  let voteId = event.params.id.toString().concat("_").concat(event.params.voter.toHexString())

  let vote = new Vote(voteId)
  vote.proposal = BaseProposal.load(event.params.id.toString())!.id
  vote.voter = event.params.voter
  vote.voteDirection = voteDirectionAtIndex(event.params.direction)
  vote.count = event.params.votes
  vote.save()
}