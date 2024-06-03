import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
// routes
import { paths } from '@/app/(RSAdmin)/admin/routes/paths';
import { useRouter, useSearchParams } from '@/app/(RSAdmin)/admin/routes/hook';
//
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.dashboard.root;

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};
