/* 
 * The enum parsing solution below is a bit ugly
 * but a quick search has shown that it's one of the
 * easiest ways to overcome the lack of strong enum typing
 * in this assemblyscript build so far.
 * /

/**
 * Proposal state resolver / wrapper.
 * @param index Raw state code
 * @returns Enum constant for the state
 */
export function proposalStateAtIndex(index: number): string {
  switch (index) {
    case 1:
      return "Active"
    case 2:
      return "Queued"
    case 3:
      return "Executed"
    case 4:
      return "Cancelled"
    default:
      return "Null"
  }
}

/**
 * Vote direction resolver / wrapper.
 * @param index Raw vote direction code
 * @returns Enum constant for the direction
 */
export function voteDirectionAtIndex(index: number): string {
  switch (index) {
    case 0:
      return "Yes"
    case 1:
      return "No"
    case 2:
      return "Abstain"
    default:
      throw "Vote direction undefined"
  }
}

/**
 * Market order type resolver / wrapper.
 * @param index Raw order type code
 * @returns Enum constant for the order type
 */
 export function orderTypeAtIndex(index: number): string {
  switch (index) {
    case 1:
      return "Buy"
    case 2:
      return "Sell"
    default:
      return "Null"
  }
}