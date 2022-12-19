import { useForm } from '@mantine/form'
import { TextInput, Group, Button, Center, Container } from '@mantine/core'
import React from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import Link from 'next/link';
import { signIn } from 'next-auth/react'

type Props = {}

const login = (props: Props) => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <AuthLayout>
      <Center style={{ width: '100vw', height: '100vh' }}>
        <Container w="400px" h="500px" style={{ backgroundColor: 'white' }}>
          <Center style={{ width: '100%', height: '100%' }}>
            <form onSubmit={form.onSubmit((values) => signIn('credentials', { ...values, callbackUrl: '/'}))}>
              <h1>Mutluluk Endeksi</h1>
              <TextInput
                w="350px"
                size='xs'
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
              />
              <TextInput
                size='xs'
                label="Password"
                placeholder="your@email.com"
                {...form.getInputProps('password')}
              />

              <Group position="right" mt="md" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit">Submit</Button>
                <Link href="/auth/register">
                  <Button>Register</Button>
                </Link>
              </Group>
              <Button onClick={() => signIn('github')}>Github Login</Button>
            </form>
          </Center>
        </Container>
      </Center>
    </AuthLayout>
  )
}

export default login