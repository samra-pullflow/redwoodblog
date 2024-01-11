import { useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import { Box, Button, Input, Textarea } from '@chakra-ui/react'
import type { CreatePostInput } from 'types/graphql'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

export const QUERY = gql`
  query GeneratePost($topic: String!) {
    generatePost(topic: $topic)
  }
`
const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createService(input: $input) {
      id
    }
  }
`

const GeneratePostPage = () => {
  const [inputText, setInputText] = useState('')
  const [generatedText, setGeneratedText] = useState('')

  const [fetchData, { loading, data }] = useLazyQuery(QUERY, {
    onCompleted: (resultData) => {
      if (resultData.generatePost) {
        setGeneratedText(resultData.generatePost)
      }
    },
  })

  const handleGenerateText = async () => {
    try {
      await fetchData({ variables: { topic: inputText } })
      console.log('Data ', data.generatePost)
      if (data.generatePost) setGeneratedText(data.generatePost)
    } catch (error) {
      console.error('Error generating post:', error)
    }
  }

  const [createService, { load }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post created')
      navigate(routes.posts())
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const onSave = (input: CreatePostInput) => {
    createService({ variables: { input } })
  }

  return (
    <>
      <Box p={4}>
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a few words..."
          mb={2}
        />
        <Button
          onClick={handleGenerateText}
          colorScheme="purple"
          isLoading={loading}
          loadingText="Generating..."
        >
          Generate Text through AI
        </Button>
        <Textarea
          value={generatedText}
          onChange={(e) => setGeneratedText(e.target.value)}
          placeholder="Generated Text"
          mt={2}
          rows={10}
        />
        <Button
          onClick={() => onSave({ title: inputText, body: generatedText })}
          colorScheme="purple"
          isLoading={load}
          mt={2}
          loadingText="Generating..."
        >
          Save
        </Button>
      </Box>
    </>
  )
}

export default GeneratePostPage
