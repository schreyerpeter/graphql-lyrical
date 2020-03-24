import React, { Component } from "react";
import { graphql } from "react-apollo";

import LikeLyric from "../queries/likeLyric";

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: {
        id,
      },
      // This tells graphql what it can expect to make the UI snappier
      // Will reconcile with BE to correct value if optimistic response is wrong
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li className="collection-item" key={id}>
          {content}
          <div className="vote-box">
            <i
              onClick={() => {
                this.onLike(id, likes);
              }}
              className="material-icons"
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }

  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

export default graphql(LikeLyric)(LyricList);
