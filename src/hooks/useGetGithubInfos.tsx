import { useRouter } from 'next/router';
import { Octokit } from 'octokit';
import { useEffect, useState } from 'react';
import { TGitHubUser } from 'src/types/TGithub';

export const useGetGithubInfos = (
  session: any,
  setImgReady: any
): TGitHubUser => {
  const router = useRouter();
  const { user = null, social = false } = router.query;
  const [githubInfos, setGithubInfos] = useState<any>(null);
  const [ghRequest, setGhRequest] = useState(false);

  const username = session && session.user ? session.user : user;

  useEffect(() => {
    if (username) {
      const gh = new Octokit({
        auth: session && session.accessToken ? session.accessToken : process.env.NEXT_PUBLIC_GH_PERSONAL_TOKEN,
      });

      const _ = async () => {
        const ghQuery = await gh.graphql(
          `query {
            user(login: "${username}") {
              login
                avatarUrl
                contributionsCollection(
                  from: "2023-01-01T00:00:01Z"
                  to: "2023-12-31T23:59:59Z"
                ) {
                  totalCommitContributions
                  totalIssueContributions
                  totalPullRequestContributions
                  totalPullRequestReviewContributions
                  contributionCalendar {
                    totalContributions
                  }
                  pullRequestReviewContributionsByRepository(maxRepositories: 50) {
                    repository {
                      name
                    }
                    contributions {
                      totalCount
                    }
                  }
                  commitContributionsByRepository(maxRepositories: 50) {
                    repository {
                      name
                      languages(first: 100) {
                        edges {
                          size
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
                      stargazerCount
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
        );
        setGithubInfos(ghQuery);
        setGhRequest(true);
        setImgReady(true);
      };
      _();
    }

    return () => {
      if (githubInfos !== null && session.user !== undefined) {
        setGhRequest(false);
      }
    }
  }, [ghRequest, session]);

  return githubInfos;
};
