import { useRef } from 'react'
import { useEffect } from 'react'

import { Box, Heading, LinkBox } from '@chakra-ui/react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <Box>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <Box>
          <header className="rw-segment-header">
            <Heading as="h2">Login</Heading>
          </header>

          <Box marginLeft="2">
            <Box marginLeft="2">
              <Form onSubmit={onSubmit} className="rw-form-wrapper">
                <Label
                  name="username"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Username
                </Label>
                <TextField
                  name="username"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  ref={usernameRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'Username is required',
                    },
                  }}
                />

                <FieldError name="username" className="rw-field-error" />

                <Label
                  name="password"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Password
                </Label>
                <PasswordField
                  name="password"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  autoComplete="current-password"
                  validation={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }}
                />

                <Box>
                  <Link to={routes.forgotPassword()} className="rw-forgot-link">
                    Forgot Password?
                  </Link>
                </Box>

                <FieldError name="password" className="rw-field-error" />

                <div className="rw-button-group">
                  <Submit className="rw-button rw-button-blue">Login</Submit>
                </div>
              </Form>
            </Box>
          </Box>
        </Box>
        <div className="rw-login-link">
          <span>Don&apos;t have an account?</span>{' '}
          <Link to={routes.signup()} className="rw-link">
            Sign up!
          </Link>
        </div>
      </Box>
    </>
  )
}

export default LoginPage
