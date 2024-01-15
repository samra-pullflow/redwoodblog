import { useRef } from 'react'
import { useEffect } from 'react'

import { Box, Heading } from '@chakra-ui/react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on username box on page load
  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <Box>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <Box>
          <Box backgroundColor="purple.100" padding="4">
            <Heading marginTop="3" marginLeft="3" size="md" textAlign="center">
              Signup
            </Heading>
          </Box>
          <Box marginLeft="2" marginRight="2">
            <Box marginLeft="2" marginRight="2">
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
                <FieldError name="password" className="rw-field-error" />

                <div className="rw-button-group">
                  <Submit className="rw-button rw-button-blue">Sign Up</Submit>
                </div>
              </Form>
            </Box>
          </Box>
        </Box>
        <div className="rw-login-link">
          <span>Already have an account?</span>{' '}
          <Link to={routes.login()} className="rw-link">
            Log in!
          </Link>
        </div>
      </Box>
    </>
  )
}

export default SignupPage
