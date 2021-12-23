import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../hooks/useForm.js';
import { CURRENT_USER_QUERY } from '../hooks/useUser.js';
import DisplayError from './ErrorMessage.js';
import Form from './styles/Form.js';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function SignIn({ token, email }) {
  //  Initialize the form hook
  const { inputs, handleChange, resetForm } = useForm({
    email,
    token,
    password: '',
  });

  // SignIn mutation
  const [resetPassword, { data, error, loading }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
      // refetch the currently logged in user
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );

  // Submit handler function
  async function handleSubmit(e) {
    e.preventDefault();
    await resetPassword().catch(console.error);
    resetForm();
  }
  const errorMessage = data?.redeemUserPasswordResetToken;
  // Render component
  console.log(token);
  return (
    // eslint-disable-next-line react/jsx-no-bind
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Setup New Account Password</h2>
      <DisplayError error={error || errorMessage} />
      <fieldset aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Password changed successfully.</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            required
            disabled
            name="email"
            id="email_SignIn"
            placeholder="Your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Enter new password
          <input
            type="password"
            required
            name="password"
            id="password_SignIn"
            placeholder="Don't use your old password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
}
