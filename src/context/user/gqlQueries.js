import { gql } from "@apollo/client";

export const GET_USER = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      userType
      userVerification {
        isEmailVerified
        isIdentityVerified
        isPhoneNumberVerified
        isSchoolEnrollmentVerified
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $userId: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
  ) {
    updateUser(
      userId: $userId
      userArgs: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phoneNumber: $phoneNumber
      }
    ) {
      firstName
      email
      phoneNumber
      lastName
    }
  }
`;

export const queries = {
  GET_USER,
  UPDATE_USER,
};
