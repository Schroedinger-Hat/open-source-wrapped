import {
  TCommitContributionsByRepository,
  TEdge,
  TGitHubUser
} from 'src/types/TGithub';

export function getTopLanguage(githubInfos: TGitHubUser): string {
  if (!githubInfos) {
    return '';
  }

  const languageMap =
    githubInfos.user.contributionsCollection.commitContributionsByRepository
      .flatMap(
        (contribs: TCommitContributionsByRepository) =>
          contribs.repository.languages?.edges
      )
      .flatMap((edge: TEdge) => edge?.node.name)
      .reduce((acc, val) => {
        // @ts-ignore
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});

  const languages: string [] = Object.keys(languageMap)

  if (languages.length === 0) {
    return '';
  }
  // @ts-ignore
  return languages.reduce((a, b) =>
    // @ts-ignore
    languageMap[a] > languageMap[b] ? a : b
  );
}
