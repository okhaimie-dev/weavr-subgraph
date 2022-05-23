import { Address, dataSource, log, BigInt, store, DataSourceContext } from '@graphprotocol/graph-ts';
import { 
  CrowdfundedThread,
  Initialized, Thread as ThreadEvent,
} from '../../generated/ThreadDeployer/ThreadDeployer';
import { 
  Thread as ThreadContract
} from '../../generated/templates/Thread/Thread';
import { Thread as ThreadTemplate } from '../../generated/templates';
import { Thread } from '../../generated/schema';
import { getFrabricERC20 } from './helpers/erc20';

// ### LIFECYCLE ###

export function handleInitialized(event: Initialized): void {
  // For now we don't care about the deployer initialization
}

// ### THREAD FACTORY ###

export function handleThread(event: ThreadEvent): void {
  let id = event.params.thread.toString()

  let threadContext = new DataSourceContext()
  threadContext.setString('id', id)
  ThreadTemplate.createWithContext(event.params.thread, threadContext)

  let threadContract = ThreadContract.bind(event.params.thread)

  let thread = new Thread(id)
  thread.contract = event.params.thread
  thread.variant = event.params.variant
  thread.frabric = threadContract.frabric().toString()
  thread.governor = event.params.governor
  thread.erc20 = getFrabricERC20(event.params.erc20).id
  thread.descriptor = event.params.descriptor
  thread.save()
}

export function handleCrowdfundedThread(event: CrowdfundedThread): void {
  // Doesn't add anything useful to the state for now
}