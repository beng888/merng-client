import React, { useContext } from "react";
import {
  Card,
  Icon,
  Label,
  Image,
  Button,
  Popup,
  Grid,
} from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import MyPopup from "../utils/MyPopup";

function PostCard({
  post: {
    title,
    body,
    url,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
  },
}) {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Card fluid>
        <Card.Content as={Link} to={`/posts/${id}`}>
          <Grid stackable columns={2}>
            <Grid.Column width={4}>
              <Image src={url} />
            </Grid.Column>
            <Grid.Column width={12}>
              <Card.Header as="h2">{title}</Card.Header>
              <Card.Meta>
                by {username},&nbsp;{moment(createdAt).fromNow(true)}&nbsp;ago
              </Card.Meta>
              <br />

              <Card.Description>{body}</Card.Description>
              <Card.Description>{title}</Card.Description>
            </Grid.Column>
          </Grid>
        </Card.Content>
        <Card.Content extra>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <MyPopup content="Comment on post">
            <Button as={Link} to={`/posts/${id}`} labelPosition="right">
              <Button basic color="orange" content="Orange">
                <Icon name="comment" />
                Comment
              </Button>
              <Label basic color="orange" content="Orange" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </MyPopup>
          {user && user.username === username && <DeleteButton postId={id} />}
        </Card.Content>
      </Card>
    </div>
  );
}

export default PostCard;
