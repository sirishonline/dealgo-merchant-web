import { gql } from '@apollo/client';

export const DASHBOARD_ANALYTICS_QUERY = gql`
  query DashboardAnalytics {
    dashboardAnalytics {
      totalDeals
      activeDeals
      totalRevenue
      totalSold
    }
  }
`;