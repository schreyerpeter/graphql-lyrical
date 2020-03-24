import React, { Component } from "react";
import { graphql } from "react-apollo";

import LikeLyric from "../queries/likeLyric";

class LyricList extends Component {
  onLike(id) {
    this.props.mutate({
      variables: {
        id,
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
                this.onLike(id);
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
