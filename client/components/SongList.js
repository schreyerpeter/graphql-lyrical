import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";

import query from "../queries/fetchSongs";
import mutation from "../queries/deleteSong";

class SongList extends Component {
  constructor(props) {
    super(props);
    this.onSongDelete = this.onSongDelete.bind(this);
  }

  renderSongs() {
    return this.props.data.songs.map(({ title, id }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i
            onClick={() => {
              this.onSongDelete(id);
            }}
            className="material-icons"
          >
            delete
          </i>
        </li>
      );
    });
  }

  onSongDelete(id) {
    this.props
      .mutate({
        variables: {
          id,
        },
      })
      .then(() => this.props.data.refetch());
  }

  render() {
    const { data } = this.props;

    if (data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(mutation)(graphql(query)(SongList));
