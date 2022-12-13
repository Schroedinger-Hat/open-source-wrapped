import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { gh } from "../../../server/github";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
type User = Props["user"];

const UserPage = (props: Props) => {
  return (
    <div>
      <UserCard {...props} />
      <pre>{JSON.stringify(props.user, null, 2)}</pre>
    </div>
  );
};

const UserCard = ({ user, topContribs, topRepos, commits }: Props) => {
  const url = new URL("/api/og", "http://localhost:3000");
  url.searchParams.append("username", user.login);
  url.searchParams.append("avatar", user.avatarUrl);
  url.searchParams.append("commits", String(commits));
  for (const repo of topRepos) {
    url.searchParams.append("repos", repo);
  }
  for (const cotrib of topContribs) {
    url.searchParams.append("contribs", cotrib);
  }

  return (
    <div className="">
      {url.href}
      <img src={url.href} alt={user.login} className="w-80" />
    </div>
  );
};

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{ username: string }>
) => {
  const res = await gh.graphql(
    `
    {
  user(login: "${ctx.params?.username}") {
    avatarUrl
    login
    contributionsCollection(from: "2022-01-01T00:00:01Z") {
      totalCommitContributions
      user {
        topRepositories(
          since: "2022-01-01T00:00:01Z"
          first: 5
          orderBy: {field: STARGAZERS, direction: ASC}
        ) {
          edges {
            node {
              name
              id
            }
          }
        }
      }
    }
  }
}
    `
  ) as any
  const topRepos = res.user.contributionsCollection.user.topRepositories.edges
    .map((r: any) => r.node.name);

  return {
    props: {
      username: ctx.params?.username,
      user: res.user,
      topRepos,
      topContribs: topRepos,
      commits: res.user.contributionsCollection.totalCommitContributions,
    },
  };
};

export default UserPage;
