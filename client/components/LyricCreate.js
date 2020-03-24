import React, { Component } from "react";
import { graphql } from "react-apollo";

import addLyric from "../queries/addLyric";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: { content: this.state.content, songId: this.props.songId },
      })
      .then(() => this.setState({ content: "" }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={e => {
            this.setState({ content: e.target.value });
          }}
        />
      </form>
    );
  }
}

export default graphql(addLyric)(LyricCreate);
