// user
export type TGitHubUser = {
  user: TGithubUserInfo;
};

export type TGithubUserInfo = {
  avatarUrl: string;
  contributionsCollection: TContributionsCollection;
  login: string;
  repositories: TRepositories;
  topRepositories: TTopRepositories;
};

// topRepositories
export type TTopRepositories = {
  edges: TEdge[];
};

// repositories
export type TRepositories = {
  edges: TEdge[];
};

// contributionsCollection
export type TContributionsCollection = {
  commitContributionsByRepository: TCommitContributionsByRepository[];
  pullRequestReviewContributionsByRepository: TPullRequestReviewContributionsByRepository[];
  contributionCalendar: TContributionCalendar,
  totalCommitContributions: number;
};

export type TContributionCalendar = {
  totalContributions: number;
};

export type TPullRequestReviewContributionsByRepository = {
  contributions: TContributions;
  repository: TRepository;
};

export type TCommitContributionsByRepository = {
  contributions: TContributions;
  repository: TRepository;
};

export type TContributions = {
  totalCount: number;
};

export type TRepository = {
  name: string;
  languages: TLanguages;
};

export type TLanguages = {
  edges: TEdge[];
};

export type TEdge = {
  node: TNode;
  size?: number;
};

export type TNode = {
  name: string;
  stargazerCount?: number;
};
