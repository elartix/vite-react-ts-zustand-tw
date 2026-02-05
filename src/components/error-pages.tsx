// outsource dependencies
import { Button } from '@heroui/react';
import { Link } from 'react-router';

// local dependencies
import { HOME } from '@/constants';


export function NotFound () {
  return <section
    className="not-found flex flex-col items-center justify-center bg-transparent text-center h-dvh w-full max-w-9/10">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1
          className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
          404
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-slate-900 md:text-4xl dark:text-white">
          Something's missing.
        </p>
        <p className="mb-4 text-lg text-slate-700 dark:text-slate-400">
          Sorry, we can't find that page. You'll find lots to explore on the home page.
        </p>
        <Button as={Link} to={HOME.LINK()} color="primary" className="rounded-full"> Go to Homepage </Button>
      </div>
    </div>
  </section>;
}

export function Maintenance () {
  return <section className="maintenance">
    <div className="text-center" style={{ width: 640, maxWidth: '95%' }}>
      <h2> SITE IS UNDER MAINTENANCE </h2>
      <h5> We&#39;ll back online shortly! </h5>
    </div>
  </section>;
}
