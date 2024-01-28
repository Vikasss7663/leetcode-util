const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Define your GraphQL query
const graphql_query = `
query questionOfToday {
    activeDailyCodingChallengeQuestion {
        date
        userStatus
        link
        question {
            acRate
            difficulty
            freqBar
            frontendQuestionId: questionFrontendId
            isFavor
            paidOnly: isPaidOnly
            status
            title
            titleSlug
            hasVideoSolution
            hasSolution
            topicTags {
                name
                id
                slug
            }
        }
    }
}
`;

// Replace 'your_api_url' with the actual API URL
const apiUrl = "https://leetcode.com/graphql";

// Define request options
const requestOptions = {
  method: "POST",
  body: JSON.stringify({ query: graphql_query }),
  headers: {
    "Content-Type": "application/json",
  },
};

const fetchLeetcodeDailyChallenge = async () => {
  const response = await fetch(apiUrl, requestOptions);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return `Request failed with status code ${response.status}`;
  }
};

module.exports = fetchLeetcodeDailyChallenge;
