import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

// CODE_BLOCK: Query to get the product
const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

// CODE_BLOCK: Mutation to update the product
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION($id: ID!, $payload: ProductUpdateInput!) {
    updateProduct(id: $id, data: $payload) {
      id
      name
      description
      status
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // Query to get the existing product
  const queryRes = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  // Mutation to update the existing product
  const [updateProduct, mutationRes] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleChange, clearForm, resetForm } = useForm(
    queryRes?.data?.Product || {
      name: '',
      description: '',
      price: '',
    }
  );
  console.log(inputs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('working');
    const res = await updateProduct({
      variables: {
        id,
        payload: {
          name: inputs.name,
          description: inputs.description,
          price: inputs.price,
        },
      },
    }).catch(console.error);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={mutationRes.error || queryRes.error} />
      <fieldset disabled={mutationRes.loading} aria-busy={mutationRes.loading}>
        {/* <label htmlFor="image">
          Name
          <input
            required
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
          />
        </label> */}
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="2100"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
