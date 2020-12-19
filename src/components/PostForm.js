import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/Hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    title: "",
    body: "",
    url: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,

    update(proxy, result) {
      values.title = "";
      values.body = "";
      values.url = "";
    },
    onError(err) {
      //console.log(err)
    },
    refetchQueries: [{ query: FETCH_POSTS_QUERY }],
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a Post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Title"
            name="title"
            onChange={onChange}
            value={values.title}
            error={error ? true : false}
          />
          <Form.TextArea
            placeholder="Description"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="image link (optional)"
            name="url"
            onChange={onChange}
            value={values.url}
          />
          <Button type="submit" color="green">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $body: String!, $url: String!) {
    createPost(title: $title, body: $body, url: $url) {
      id
      title
      body
      url
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
