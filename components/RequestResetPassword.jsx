import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../hooks/useForm.js';
import { CURRENT_USER_QUERY } from '../hooks/useUser.js';
import DisplayError from './ErrorMessage.js';
import Form from './styles/Form.js';

const RESET_PASSWORD_MUATION = gql`
  mutation RESET_PASSWORD_MUATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestResetPassword() {
  //  Initialize the form hook
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  // SignIn mutation
  const [requestPasswordReset, { data, loading, error }] = useMutation(
    RESET_PASSWORD_MUATION,
    {
      variables: inputs,
      // refetch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  // Submit handler function
  async function handleSubmit(e) {
    e.preventDefault();
    await requestPasswordReset().catch(console.error);
    console.log({ data, loading, error });
    resetForm();
  }
  // Render component

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>If the account exists you will get a password reset email.</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            required
            name="email"
            id="email_PasswordReset"
            placeholder="Your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit Request</button>
      </fieldset>
    </Form>
  );
}
