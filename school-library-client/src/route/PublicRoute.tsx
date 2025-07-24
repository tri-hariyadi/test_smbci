import { type PropsWithChildren } from 'react';

import { Navigate } from 'react-router';

import { Loading } from 'components';
import useSession from 'lib/hooks/useSession.ts';

const PublicRoute = ({ children }: PropsWithChildren) => {
  const session = useSession();

  if (session.isLoading) {
    return <Loading />;
  }

  if (session.user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
