import styled from 'styled-components';
import ResetPassword from '../components/ResetPassword';

export default function SignInPage({ query }) {
  const token = query?.token;
  const email = query?.identity;
  console.log(query);
  return (
    <GridStyles>
      <ResetPassword token={token} email={email} />
    </GridStyles>
  );
}

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;
