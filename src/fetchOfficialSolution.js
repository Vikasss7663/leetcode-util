const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Define your GraphQL query
const graphql_query = `
query officialSolution($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    solution {
      id
      title
      content
      contentTypeId
      paidOnly
      hasVideoSolution
      paidOnlyVideo
      canSeeDetail
      rating {
        count
        average
        userRating {
          score
        }
      }
      topic {
        id
        commentCount
        topLevelCommentCount
        viewCount
        subscribed
        solutionTags {
          name
          slug
        }
        post {
          id
          status
          creationDate
          author {
            username
            isActive
            profile {
              userAvatar
              reputation
            }
          }
        }
      }
    }
  }
}
`;

// Replace 'your_api_url' with the actual API URL
const apiUrl = "https://leetcode.com/graphql";

const fetchOfficialSolution = async (titleSlug) => {
  const variables = {
    titleSlug: titleSlug,
  };

  // Define request options
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ query: graphql_query, variables: variables }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(apiUrl, requestOptions);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return `Request failed with status code ${response.status}`;
  }
};

module.exports = fetchOfficialSolution;
