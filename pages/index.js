import Head from "next/head";
import Snippet from "../components/Snippet";
import useSWR from "swr";
import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  const { data: snippets, mutate } = useSWR("/api/snippets");

  return (
    <div>
      <Head>
        <title>Unvernisable Snippetsp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="my-12">
          <Header title="Unvernisable Snippets" />
        </div>

        {snippets &&
          snippets.map((snippet) => (
            <Snippet
              key={snippet.id}
              snippet={snippet}
              snippetDeleted={mutate}
            />
          ))}
      </main>
    </div>
  );
}
