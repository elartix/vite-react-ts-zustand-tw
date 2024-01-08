// outsource dependencies
import cn from 'classnames';
import { memo, PropsWithChildren, useEffect, useState } from 'react';


// local dependencies
import { MainLayout } from '@/modules/layouts';
import { Hero } from '@/pages/home/hero.tsx';
import ContactForm from '@/modules/ContactForm.tsx';

export const Home = memo<PropsWithChildren<{ className?: string }>>(function Home ({ className }) {
  // const [count, setCount] = useState(0)
  // @ts-ignore
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUsers(json.users);
      });
  }, []);


  useEffect(() => {
    fetch('/api/auth/validation/username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      // body: JSON.stringify({ username: 'hello' })
      body: JSON.stringify({ username: 'test' })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUsers(json.users);
      });
  }, []);

  return <MainLayout className={cn('home-page', className)}>
    <Hero />
    <ContactForm />
  </MainLayout>;
});
