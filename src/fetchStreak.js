const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Define your GraphQL query
const graphql_query = `
query getStreakCounter {
  streakCounter {
    streakCount
    daysSkipped
    currentDayCompleted
  }
}
`;

// Replace 'your_api_url' with the actual API URL
const apiUrl = 'https://leetcode.com/graphql';

const fetchStreak = async () => {

  // Define request options
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ query: graphql_query }),
    headers: {
      'Content-Type': 'application/json',
      'Cookie': process.env.LEETCODE_COOKIE
    },
  };

  const response = await fetch(apiUrl, requestOptions);
  if (response.status === 200) {
    const data = await response.json();
    return data.data.streakCounter
  } else {
    return `Request failed with status code ${response.status}`;
  }
};

module.exports = fetchStreak;;
