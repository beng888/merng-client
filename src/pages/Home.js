import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Button, Grid, Header, Icon, Transition } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <Grid stackable columns={1} verticalAlign="middle" divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column>
          {" "}
          <Header as="h1">
            <Icon name="comments outline" />
            <Header.Content style={{ marginBottom: "2rem" }}>
              Welcom to the Forum!
              <br />
            </Header.Content>
            <h2>Share your opinions and Connect with People</h2>
          </Header>
        </Grid.Column>
        <Grid.Column textAlign="center">
          {" "}
          {user ? (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          ) : (
            <Button as={Link} to="/login" inverted color="white">
              <h1>Login to Create a Post</h1>
            </Button>
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
