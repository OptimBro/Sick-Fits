import gql from 'graphql-tag';
import useForm from '../hooks/useForm';
import Form from './styles/Form';

const CREATE_PRODUCT_MUTATIION = gql`
  mutation CREATE_PRODUCT_MUTATIION(
    # Which variables are getting passed in? And what types are they?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      status
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Denim Jeans x24',
    price: 5968,
    description: 'These are the best shoes',
  });
  const handleSubmit = e => {
    e.preventDefault();
    console.log(inputs);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor='image'>
          Name
          <input
            required
            type='file'
            name='image'
            id='image'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor='price'>
          Price
          <input
            type='number'
            name='price'
            id='price'
            placeholder='2100'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor='description'>
          Description
          <textarea
            name='description'
            id='description'
            placeholder='Description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        {/* <button type='button' onClick={clearForm}>
        Clear Form
      </button>
      <button type='button' onClick={resetForm}>
        Reset Form
      </button> */}
        <button type='submit'>+ Add Product</button>
      </fieldset>
    </Form>
  );
}
