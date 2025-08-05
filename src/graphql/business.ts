import { gql } from '@apollo/client';

export const MY_BUSINESS_QUERY = gql`
  query MyBusiness {
    myBusiness {
      id
      name
      type
      description
      website
      email
      phone
      address
      city
      state
      zipCode
      country
      taxId
      businessLicense
      employeeCount
      yearEstablished
      operatingHours
      socialMedia
      tags
      acceptsOnlinePayments
      offersDelivery
      offersPickup
      createdAt
      updatedAt
      owner {
        id
        fullName
        email
      }
    }
  }
`;

export const UPDATE_BUSINESS_MUTATION = gql`
  mutation UpdateBusiness($input: UpdateBusinessInput!) {
    updateBusiness(input: $input) {
      id
      name
      type
      description
      website
      email
      phone
      address
      city
      state
      zipCode
      country
      taxId
      businessLicense
      employeeCount
      yearEstablished
      operatingHours
      socialMedia
      tags
      acceptsOnlinePayments
      offersDelivery
      offersPickup
      updatedAt
    }
  }
`;