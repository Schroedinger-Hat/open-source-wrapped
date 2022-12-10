import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

const UserPage = ({
  username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div>Hello, {username}</div>;
};

export const getServerSideProps = (
  ctx: GetServerSidePropsContext<{ username: string }>
) => {
  return {
    props: {
      username: ctx.params?.username,
    },
  };
};

export default UserPage;
