import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../hooks/useForm.js';
import { CURRENT_USER_QUERY } from '../hooks/useUser.js';
import DisplayError from './ErrorMessage.js';
import Form from './styles/Form.js';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  //  Initialize the form hook
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  // SignIn mutation
  const [signin, { data }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  // Submit handler function
  async function handleSubmit(e) {
    e.preventDefault();
    await signin();
    resetForm();
  }
  const error = { message: data?.authenticateUserWithPassword?.message };
  // Render component
  return (
    // eslint-disable-next-line react/jsx-no-bind
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            required
            name="email"
            id="email_SignIn"
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
            id="password_SignIn"
            placeholder="Your password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}
