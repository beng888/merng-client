import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Icon, Label } from "semantic-ui-react";

import MyPopup from "../utils/MyPopup";

function LikeButton({ user, post: { id, likes, likeCount } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="green" content="Green">
        <Icon name="thumbs up outline" />
        Like
      </Button>
    ) : (
      <Button basic color="green" content="Green">
        <Icon name="thumbs up outline" />
        Like
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" basic color="green" content="Green">
      <Icon name="thumbs up outline" />
      Like
    </Button>
  );

  return (
    <Button
      as="div"
      labelPosition="right"
      onClick={user ? likePost : undefined}
    >
      <MyPopup content={liked ? "Unlike" : "Like"}>{likeButton}</MyPopup>

      <Label basic color="green" content="Green" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
