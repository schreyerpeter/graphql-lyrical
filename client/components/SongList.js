import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(({ title, id }) => {
      return (
        <li key={id} className="collection-item">
          {title}
        </li>
      );
    });
  }

  render() {
    const { data } = this.props;
    console.log(data);
    if (data.loading) {
      return <div>Loading...</div>;
    }

    return <div className="collection">{this.renderSongs()}</div>;
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
