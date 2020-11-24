import { gql } from "@apollo/client";


export const GET_ALL_TRANSACTIONS = gql`
  query getTransactions {
    getAllTransaction {
      id
      status
      transactionType
      recipientId
      userId
      bankInfoId
      reference
      rate
      fee
      baseAmount
      actualAmount
      sendCurrency
      destinationCurrency
      convertedAmount
      createdAt
    }
  }
`;

export const queries = {
  GET_ALL_TRANSACTIONS
};