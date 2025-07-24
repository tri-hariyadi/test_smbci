import { type PropsWithChildren } from 'react';

import { Navigate } from 'react-router';

import { Loading } from 'components';
import useSession from 'lib/hooks/useSession';

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const session = useSession();

  if (session.isLoading) {
    return <Loading />;
  }

  if (!session.user) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
