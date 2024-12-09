import { create, keyResolver, windowScheduler } from '@yornaath/batshit';

type User = { id: number; name: string };

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// simulate a client function that fetches users from a database
const client_users_where = (params: { id_in: number[] }) =>
  new Promise<User[]>((resolve) => {
    setTimeout(() => {
      console.log('Fetching users with params:', params);
      resolve(params.id_in.map((id) => ({ id, name: `User ${id}` })));
    }, 500);
  });

const users = create({
  fetcher: async (ids: number[]) => {
    return client_users_where({
      id_in: ids,
    });
  },
  resolver: keyResolver('id'),
  scheduler: windowScheduler(10), // Default and can be omitted.
});

const main = async () => {
  /**
   * Requests will be batched to one call since they are done within the same time window of 10 ms.
   */
  const bob = users.fetch(1);
  const alice = users.fetch(2);

  const bobUndtAlice = await Promise.all([bob, alice]);
  console.log('bobUndtAlice', bobUndtAlice);

  await delay(100);

  /**
   * New Requests will be batched in a another call since not within the first timeframe.
   */
  const joe = users.fetch(3);
  const margareth = users.fetch(4);

  const joeUndtMargareth = await Promise.all([joe, margareth]);
  console.log('joeUndtMargareth', joeUndtMargareth);
};

main();
