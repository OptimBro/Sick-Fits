import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../hooks/useForm.js';
import { CURRENT_USER_QUERY } from '../hooks/useUser.js';
import DisplayError from './ErrorMessage.js';
import Form from './styles/Form.js';

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
    }
  }
`;

export default function SignUp() {
  //  Initialize the form hook
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  // SignIn mutation
  const [createUser, { data, error }] = useMutation(CREATE_USER_MUTATION, {
    variables: {
      data: {
        ...inputs,
      },
    },
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  // Submit handler function
  async function handleSubmit(e) {
    e.preventDefault();
    await createUser().catch(console.error);
    resetForm();
  }
  // Render component
  if (data?.createUser) {
    return (
      <Form>
        <p>
          Thanks for registering {data?.createUser?.name}, You can now login
          using your email: {data?.createUser?.email}
        </p>
      </Form>
    );
  }
  return (
    // eslint-disable-next-line react/jsx-no-bind
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Create an Account</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor="name">
          Name
          <input
            type="text"
            required
            name="name"
            id="name_SignUp"
            placeholder="What should we call you?"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            required
            name="email"
            id="email_SignUp"
            placeholder="Your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Password
          <input
            type="password"
            required
            name="password"
            id="password_SignUp"
            placeholder="Your password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Register</button>
      </fieldset>
    </Form>
  );
}
