import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { gh } from "../../../server/github";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
type User = Props["user"];

const UserPage = (props: Props) => {
  return (
    <div>
      Hello, {props.user.public_repos},
      <UserCard {...props} />
      <pre>{JSON.stringify(props.user, null, 2)}</pre>
    </div>
  );
};

const UserCard = ({ user, topContribs, topRepos, stars }: Props) => {
  const url = new URL("/api/og", "http://localhost:3000");
  url.searchParams.append("username", user.login);
  url.searchParams.append("avatar", user.avatar_url);
  url.searchParams.append("stars", String(stars));
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
  const user = await gh.rest.users.getByUsername({
    username: ctx.params!.username,
  });
  const repos = await getAllMyRepo(ctx.params!.username);
  const topRepos = repos
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 5)
    .map((r) => r.name);

  const topContribs = repos
    .sort((a, b) => (b.forks_count || 0) - (a.forks_count || 0))
    .slice(0, 5)
    .map((r) => r.name);

  const stars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  return {
    props: {
      username: ctx.params?.username,
      user: user.data,
      topRepos,
      topContribs,
      stars,
    },
  };
};

export default UserPage;

interface Repo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  stargazers_count?: number;
  forks_count?: number;
}

const getAllMyRepo = async (username: string) => {
  let repos: Repo[] = [];
  for (let page = 0; ; page++) {
    const res = await gh.rest.repos.listForUser({
      username: username,
      per_page: 100,
      sort: "created",
      type: "owner",
      page: page,
    });
    res.data[0]?.language;
    repos = [...repos, ...res.data];
    if (!res.headers.link?.includes("next")) {
      break;
    }
  }
  return repos;
};
