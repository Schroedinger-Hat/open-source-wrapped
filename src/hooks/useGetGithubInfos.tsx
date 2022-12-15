import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import { TGitHubUser } from "src/types/TGithub";

export const useGetGithubInfos = (session: any): TGitHubUser => {
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
                commitContributionsByRepository(maxRepositories: 5) {
                  repository {
                    name
                    languages(first: 100) {
                      edges {
                        node {
                          name
                        }
                      }
                    }
                  }
                  contributions(first: 1, orderBy: {field: COMMIT_COUNT, direction: DESC}) {
                    totalCount
                  }
                }
              }
              repositories(first: 5, orderBy: {field: STARGAZERS, direction: DESC}) {
                edges {
                  node {
                    name
                  }
                }
              }
              topRepositories(first:5, orderBy: {field: STARGAZERS, direction: DESC}) {
                edges {
                  node {
                    name
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