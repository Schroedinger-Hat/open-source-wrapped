import {
  TCommitContributionsByRepository,
  TGitHubUser
} from 'src/types/TGithub';

export function getTopLanguage(githubInfos: TGitHubUser): string {
  if (!githubInfos) {
    return '';
  }

  const NotLanguages = ['Markdown', 'Dockerfile', 'Roff', 'Shell', 'CSS', 'HTML'];

  const languageMap =
    githubInfos.user.contributionsCollection.commitContributionsByRepository
      .flatMap(
        (contribs: TCommitContributionsByRepository) => {
            return contribs.repository.languages.edges.flatMap((edge) => {
              return {
                name: edge.node.name,
                size: edge.size,
                contribution: contribs.contributions.totalCount
              }
            })
        }
      )
      .reduce((acc, val) => {
        // @ts-ignore
        acc[val.name] = (acc[val.name] || 0) + (val.size * val.contribution);
        return acc;
      }, {});

  const languages: string [] = Object.keys(languageMap).filter((language) => !NotLanguages.includes(language))

  if (languages.length === 0) {
    return '';
  }

  // @ts-ignore
  return languages.reduce((a, b) =>
    // @ts-ignore
    languageMap[a] > languageMap[b] ? a : b
  );
}
