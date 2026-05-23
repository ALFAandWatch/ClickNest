// pages/404.tsx

import { FC } from 'react';
import Link from 'next/link';

const Custom404: FC = () => {
   return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
         <h1 style={{ fontSize: '4rem' }}>404 - Page Not Found</h1>
         <p>Lo sentimos. La página que buscas no existe.</p>
         <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
            Volver al inicio.
         </Link>
      </div>
   );
};

export default Custom404;
