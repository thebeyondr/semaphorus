import Dashboard from "@/components/Dashboard";
import Groups from "@/components/Groups";
import Header from "@/components/Header";
import Logo from "@/components/ui/Logo";
import { GroupWithNetwork } from "@/lib/types";
import {
  SemaphoreSubgraph,
  getSupportedNetworks,
} from "@semaphore-protocol/data";

const getGroupSubgraphData = async (network: string) => {
  const semaphoreSubgraph = new SemaphoreSubgraph(network);
  try {
    const groupData = await semaphoreSubgraph.getGroups({
      members: true,
      verifiedProofs: true,
    });
    const groupsWithNetwork = groupData.map((group) => {
      return { ...group, network };
    });
    return groupsWithNetwork;
  } catch (e) {
    console.log(e);
  }
};

const getGroupsFromSubgraph = async () => {
  const networks = getSupportedNetworks();
  const data: GroupWithNetwork[] = [];

  for (const network of networks) {
    const groupData = await getGroupSubgraphData(network);
    if (groupData) {
      data.push(...groupData);
      console.log(`Got ${groupData.length} groups from ${network}`);
    }
  }

  return data;
};

export default async function Home() {
  const groups = await getGroupsFromSubgraph();

  return (
    <main className="min-h-screen px-4 py-8 lg:p-16 xl:px-36 xl:py-16">
      <Logo />
      <section className="mt-4 flex flex-col gap-6 xl:flex-row xl:items-center">
        <Header />
        <Dashboard groups={groups} />
      </section>
      <hr className="my-16 border-slate-700" />
      <div className="flex w-full flex-col gap-6 xl:flex-row">
        <Groups groups={groups} />
        <section className="flex h-40 w-full flex-col gap-6 overflow-hidden rounded-md border border-slate-800 bg-slate-900 p-4 xl:h-auto">
          <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-slate-700">
            <p className="text-xl font-medium text-slate-400">
              🚧We&apos;re building group details🚧
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
