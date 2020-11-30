import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import MyPopup from "../utils/MyPopup";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <MyPopup content="Comment on post">
            <Button as={Link} to={`/post/${id}`} labelPosition="right">
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
