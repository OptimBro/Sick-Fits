import { ALL_PRODUCTS_COUNT_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // Read the number of items on the page from the cache
      const data = cache.readQuery({
        query: ALL_PRODUCTS_COUNT_QUERY,
      });

      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        console.log(`We don't have any items`);
        return false;
      }

      /**
       * If there are items, and there aren't enough items to satisfy how many were requested and we are on the last page, then just send it.
       */

      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      // if there are items, just return them from the cache, and we don't need to go to the network.

      if (items.length) {
        console.log(`Items: ${items.length} items in cache`);
        return items;
      }
      return false; // Fallback to network
    },

    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      console.log(merged);

      // Finally we return the merged items from the cache
      return merged;
    },
  };
}
