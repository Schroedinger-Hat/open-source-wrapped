import { Octokit } from "octokit";
import { useEffect, useState } from "react";

export const useGetGithubInfos = (session: any) => {
  const [githubInfos, setGithubInfos] = useState<any>(null);
  const [ghRequest, setGhRequest] = useState(false); 

  useEffect(() => {
    if (session && session.user) {
      const gh = new Octokit({
        auth: session.accessToken
      })
  
      const _ = async () => {
        const ghQuery = await gh.graphql(
          `query {
            user(login: "${session.user.login}") {
              login
              avatarUrl
              contributionsCollection(
                from: "2022-01-01T00:00:01Z"
                to: "2022-12-31T23:59:59Z"
              ) {
                totalCommitContributions
                totalIssueContributions
                totalRepositoryContributions
                totalPullRequestContributions
                commitContributionsByRepository {
                  repository {
                    name
                    languages(first: 100) {
                      nodes {
                        name
                      }
                    }
                  }
                  contributions(first: 5, orderBy: {field: COMMIT_COUNT, direction: DESC}) {
                    totalCount
                  }
                }
                user {
                  topRepositories(first: 5, orderBy: {field: STARGAZERS, direction: DESC}) {
                    edges {
                      node {
                        name
                        stargazerCount
                        languages(first: 100) {
                          nodes {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          `
        )
        setGithubInfos(ghQuery)
        setGhRequest(true)
      }
      _()
    }
  }, [ghRequest])
  
  return githubInfos
}