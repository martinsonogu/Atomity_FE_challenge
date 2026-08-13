import Head from "next/head";
import { CostExplorerSection } from "@/features/cost-explorer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cost Explorer</title>
        <meta
          name="description"
          content="Explore sample costs by cluster, namespace, and resource."
        />
      </Head>
      <main className="min-h-screen bg-bg-primary">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 pt-20 text-center sm:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
            Atomity Platform
          </span>
          <h1 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold text-text-primary">
            Explore costs from cluster to resource
          </h1>
          <p className="mx-auto max-w-xl text-text-secondary">
            Scroll down, then select a cluster or namespace to view its cost breakdown.
          </p>
        </div>
        <CostExplorerSection />
      </main>
    </>
  );
}
