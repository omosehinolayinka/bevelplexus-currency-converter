import { gql } from "@apollo/client";

export const GET_ALL_TRANSACTIONS = gql`
  query getTransactions($offset: Float!, $limit: Float!) {
    getTransactionByUser(offset: $offset, limit: $limit) {
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
export const GET_TRANSACTION_ANALYTICS = gql`
  query TransactionUserAnalytics {
    getTransactionAnalyticsByUser {
      totalTransactionsAmount
      baseCurrencyCode
    }
  }
`;
export const queries = {
  GET_ALL_TRANSACTIONS,
  GET_TRANSACTION_ANALYTICS
};
