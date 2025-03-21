// Data utilities for points, subscription time, and location filtering

export const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "India",
  "Spain",
];

export const generatePointsData = (
  country = null,
  month = null,
  year = null
) => {
  const baseData = {
    earned: Math.floor(Math.random() * 50000) + 10000,
    purchased: Math.floor(Math.random() * 30000) + 5000,
    withdrawn: Math.floor(Math.random() * 20000) + 2000,
  };

  // Apply filters if provided
  if (country || month || year) {
    return {
      ...baseData,
      earned: Math.floor(baseData.earned * 0.7),
      purchased: Math.floor(baseData.purchased * 0.7),
      withdrawn: Math.floor(baseData.withdrawn * 0.7),
    };
  }

  return baseData;
};

export const generateSubscriptionTimeData = (country = null) => {
  const baseTime = Math.floor(Math.random() * 180) + 30; // Average time in days
  return country ? Math.floor(baseTime * 0.8) : baseTime;
};

export const generateLocationData = () => {
  return countries.map((country) => ({
    country,
    users: Math.floor(Math.random() * 1000) + 100,
    revenue: Math.floor(Math.random() * 50000) + 5000,
  }));
};

export const exportDashboardData = (filters = {}) => {
  const { country, month, year, timeRange } = filters;

  return {
    points: generatePointsData(country, month, year),
    subscriptionTime: generateSubscriptionTimeData(country),
    locationData: generateLocationData(),
    // Add other data as needed
  };
};
