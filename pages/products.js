import { initializeApollo, addApolloState } from '../lib/apolloClient';
import Products, { ALL_PRODUCTS_QUERY } from '../components/Products';

export default function ProductsPage() {
  return (
    <div>
      <p>Hello</p>
      <Products />
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
