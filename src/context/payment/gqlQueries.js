import { gql } from "@apollo/client";

export const GET_FX_RATES = gql`
  query getFxRates(
    $sendCurrency: String!
    $destinationCurrency: String!
    $baseAmount: Float!
    $receiveType: ReceiveType!
  ) {
    getFxRate(
      input: {
        sendCurrency: $sendCurrency
        destinationCurrency: $destinationCurrency
        baseAmount: $baseAmount
        receiveType: $receiveType
      }
    ) {
      rate
      fee
      actualAmount
      convertedAmount
    }
  }
`;

export const queries = {
  GET_FX_RATES
}
