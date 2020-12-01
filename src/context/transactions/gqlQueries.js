import { gql } from "@apollo/client";

export const GET_ALL_TRANSACTIONS = gql`
  query getTransactions($offset: Float!, $limit: Float!) {
    getAllTransaction(offset: $offset, limit: $limit) {
      total
      transactions {
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
        recipient {
          id
          name
          email
        }
      }
    }
  }
`;

export const queries = {
  GET_ALL_TRANSACTIONS,
};
