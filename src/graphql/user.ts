import { gql } from '@apollo/client';

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateUserInput!) {
    updateProfile(input: $input) {
      id
      email
      firstName
      lastName
      fullName
      phone
      dateOfBirth
      gender
      address
      city
      state
      zipCode
      country
      timezone
      language
      emailNotifications
      smsNotifications
      marketingEmails
      updatedAt
    }
  }
`;