import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  address: Scalars['String']['output'];
  cityId: City;
  id: Scalars['ID']['output'];
  tags?: Maybe<Array<Tag>>;
  zipCode: Scalars['String']['output'];
};

export type Asset = {
  __typename?: 'Asset';
  deal: Deal;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type Business = {
  __typename?: 'Business';
  acceptsOnlinePayments: Scalars['Boolean']['output'];
  address?: Maybe<Address>;
  businessLicense?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deals: Array<Deal>;
  email?: Maybe<Scalars['String']['output']>;
  employeeCount?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  merchant: Merchant;
  name: Scalars['String']['output'];
  offersDelivery: Scalars['Boolean']['output'];
  offersPickup: Scalars['Boolean']['output'];
  operatingHours: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  socialMedia: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  taxId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  website?: Maybe<Scalars['String']['output']>;
  yearEstablished?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  subCategories?: Maybe<Array<SubCategory>>;
};

export type City = {
  __typename?: 'City';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  state: State;
};

export type Condition = {
  __typename?: 'Condition';
  content: Scalars['String']['output'];
  deal: Deal;
  id: Scalars['ID']['output'];
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  states?: Maybe<Array<State>>;
};

export type Customer = {
  __typename?: 'Customer';
  address?: Maybe<Address>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Deal = {
  __typename?: 'Deal';
  business: Business;
  category: Category;
  conditions?: Maybe<Array<Condition>>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  discountPercentage: Scalars['Float']['output'];
  discountType: DiscountType;
  discountValue: Scalars['Float']['output'];
  features?: Maybe<Array<Feature>>;
  finalPrice: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  location: Scalars['String']['output'];
  maxQuantity: Scalars['Int']['output'];
  originalPrice: Scalars['Float']['output'];
  remainingQuantity: Scalars['Int']['output'];
  savingsAmount: Scalars['Float']['output'];
  soldQuantity: Scalars['Int']['output'];
  status: DealStatus;
  subCategory: SubCategory;
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  validUntil: Scalars['DateTime']['output'];
};

export enum DealStatus {
  Active = 'ACTIVE',
  Draft = 'DRAFT',
  Expired = 'EXPIRED',
  Paused = 'PAUSED',
  PendingApproval = 'PENDING_APPROVAL',
  Rejected = 'REJECTED'
}

export enum DiscountType {
  Amount = 'AMOUNT',
  Percentage = 'PERCENTAGE'
}

export type Feature = {
  __typename?: 'Feature';
  content: Scalars['String']['output'];
  deal: Deal;
  id: Scalars['ID']['output'];
};

export type Merchant = {
  __typename?: 'Merchant';
  address?: Maybe<Address>;
  business: Business;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerMerchant: Scalars['String']['output'];
  resendOtp: Scalars['String']['output'];
  verifyOtp: Scalars['String']['output'];
};


export type MutationRegisterMerchantArgs = {
  input: RegisterMerchantInput;
};


export type MutationVerifyOtpArgs = {
  input: OtpVerifyInput;
};

export type OtpVerifyInput = {
  otp: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allCategories: Array<Category>;
  allCities: Array<City>;
  customer?: Maybe<Customer>;
  customers: Array<Customer>;
  dealAssets: Array<Asset>;
};


export type QueryCustomerArgs = {
  id: Scalars['Float']['input'];
};


export type QueryDealAssetsArgs = {
  dealId: Scalars['String']['input'];
};

export type RegisterMerchantInput = {
  businessName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type State = {
  __typename?: 'State';
  cities?: Maybe<Array<City>>;
  country: Country;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type SubCategory = {
  __typename?: 'SubCategory';
  category: Category;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  customer?: Maybe<Customer>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  emailNotifications: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  marketingEmails: Scalars['Boolean']['output'];
  merchant?: Maybe<Merchant>;
  phone?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  smsNotifications: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RegisterMerchantMutationVariables = Exact<{
  input: RegisterMerchantInput;
}>;


export type RegisterMerchantMutation = { __typename?: 'Mutation', registerMerchant: string };

export type VerifyOtpMutationVariables = Exact<{
  input: OtpVerifyInput;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: string };

export type ResendOtpMutationVariables = Exact<{ [key: string]: never; }>;


export type ResendOtpMutation = { __typename?: 'Mutation', resendOtp: string };


export const RegisterMerchantDocument = gql`
    mutation RegisterMerchant($input: RegisterMerchantInput!) {
  registerMerchant(input: $input)
}
    `;
export type RegisterMerchantMutationFn = Apollo.MutationFunction<RegisterMerchantMutation, RegisterMerchantMutationVariables>;

/**
 * __useRegisterMerchantMutation__
 *
 * To run a mutation, you first call `useRegisterMerchantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMerchantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMerchantMutation, { data, loading, error }] = useRegisterMerchantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMerchantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMerchantMutation, RegisterMerchantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterMerchantMutation, RegisterMerchantMutationVariables>(RegisterMerchantDocument, options);
      }
export type RegisterMerchantMutationHookResult = ReturnType<typeof useRegisterMerchantMutation>;
export type RegisterMerchantMutationResult = Apollo.MutationResult<RegisterMerchantMutation>;
export type RegisterMerchantMutationOptions = Apollo.BaseMutationOptions<RegisterMerchantMutation, RegisterMerchantMutationVariables>;
export const VerifyOtpDocument = gql`
    mutation VerifyOtp($input: OTPVerifyInput!) {
  verifyOtp(input: $input)
}
    `;
export type VerifyOtpMutationFn = Apollo.MutationFunction<VerifyOtpMutation, VerifyOtpMutationVariables>;

/**
 * __useVerifyOtpMutation__
 *
 * To run a mutation, you first call `useVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpMutation, { data, loading, error }] = useVerifyOtpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const ResendOtpDocument = gql`
    mutation ResendOtp {
  resendOtp
}
    `;
export type ResendOtpMutationFn = Apollo.MutationFunction<ResendOtpMutation, ResendOtpMutationVariables>;

/**
 * __useResendOtpMutation__
 *
 * To run a mutation, you first call `useResendOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendOtpMutation, { data, loading, error }] = useResendOtpMutation({
 *   variables: {
 *   },
 * });
 */
export function useResendOtpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResendOtpMutation, ResendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResendOtpMutation, ResendOtpMutationVariables>(ResendOtpDocument, options);
      }
export type ResendOtpMutationHookResult = ReturnType<typeof useResendOtpMutation>;
export type ResendOtpMutationResult = Apollo.MutationResult<ResendOtpMutation>;
export type ResendOtpMutationOptions = Apollo.BaseMutationOptions<ResendOtpMutation, ResendOtpMutationVariables>;