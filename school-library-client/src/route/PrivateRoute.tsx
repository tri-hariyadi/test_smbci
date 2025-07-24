import { type PropsWithChildren } from 'react';

import { Navigate } from 'react-router';

import { Header, Loading } from 'components';
import useSession from 'lib/hooks/useSession';

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const session = useSession();

  if (session.isLoading) {
    return <Loading />;
  }

  if (!session.user) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PrivateRoute;
