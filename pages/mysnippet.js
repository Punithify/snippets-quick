import React from "react";
import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Snippet from "../components/Snippet";

const mysnippet = () => {
  const { data: snippets, mutate } = useSWR("/api/mysnippet");

  return (
    <div>
      <Head>
        <title>My Snippets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        {!snippets || snippets.length === 0 ? (
          <div
            className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <p>Not created any snippet yet</p>
          </div>
        ) : (
          snippets &&
          snippets.map((snippet) => (
            <Snippet
              key={snippet.id}
              snippet={snippet}
              snippetDeleted={mutate}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default mysnippet;
export const getServerSideProps = withPageAuthRequired();
