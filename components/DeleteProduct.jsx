import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      description
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    // refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    update,
  });
  const clickHandler = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this item?')) {
      // go ahead and delete it
      const res = await deleteProduct().catch((err) => console.log(err));
    }
  };
  return (
    <button disabled={loading} type="button" onClick={clickHandler}>
      {children}
    </button>
  );
}
