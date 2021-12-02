import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Products() {
  const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY, {
    // variables: allProductsQueryVars,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <div>Error loading posts</div>;
  if (loading) return <div>Loading</div>;

  const { allProducts } = data;
  return (
    <div>
      <ProductsListStyles>
        {allProducts.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;
