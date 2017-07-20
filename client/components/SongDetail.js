import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import {Link} from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {

    renderSongDetail({title,lyrics}) {
        return (
            <div>
                <Link to={`/`} > Back </Link>
                <h3>Song Detail {title} </h3>
                <LyricList lyrics={lyrics} />
                <LyricCreate songId={this.props.params.id} />
            </div>
        )
    }

    render() {
        const {song} = this.props.data;
        if (!song) {
            return <div>loading...</div>
        }
        
       return (
           this.renderSongDetail(song)
       )
    }
}

export default graphql(fetchSong, {
    options: (props) => ({
        variables: {
            id: props.params.id
        }
    })
})(SongDetail);