'use client';

import { signOut } from 'next-auth/react';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

export default function LogoutButton({children}: Props ) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}

    >
      {children}
    </button>
  );
}
