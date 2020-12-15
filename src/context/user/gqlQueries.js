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
        isUtilityBillVerified
      }
      regularAccountDetail {
        city
        country
        countryIso3Code
      }
      studentAccountDetail {
        country
        countryIso3Code
        school
        course
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

export const RESET_PASSWORD = gql`
  mutation updatePassword(
    $userId: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      userId: $userId
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      id
    }
  }
`;

export const VERIFY_IDENTITY = gql`
  mutation verifyIdentity($file: Upload!, $userId: String!) {
    verifyIdentity(file: $file, userId: $userId) {
      userId
      updatedAt
    }
  }
`;

export const VERIFY_UTILITY = gql`
  mutation verifyUtilityBill($file: Upload!, $userId: String!) {
    verifyUtilityBill(file: $file, userId: $userId) {
      userId
      updatedAt
    }
  }
`;

export const VERIFY_ENROLLMENT = gql`
  mutation verifyEnrollment($file: Upload!, $userId: String!) {
    verifyEnrollment(file: $file, userId: $userId) {
      userId
      updatedAt
    }
  }
`;



export const queries = {
  GET_USER,
  UPDATE_USER,
  RESET_PASSWORD,
  VERIFY_IDENTITY,
  VERIFY_UTILITY,
  VERIFY_ENROLLMENT
};
