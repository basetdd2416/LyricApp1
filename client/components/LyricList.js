import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
// mutation LikeLyric($id: ID) {   likeLyric(id: $id){     id,     likes   } }
class LyricList extends Component {

    onLikeClicked(id) {
        this
            .props
            .mutate({
                variables: {
                    id: id
                }
            })
            .then(() => console.log("like done"));
    }

    renderLyricList() {
        return this
            .props
            .lyrics
            .map(({id, content, likes}) => {
                return (
                    <li key={id} className="collection-item">
                        {content}
                        <div className="vote-box">
                            <i onClick={() => this.onLikeClicked(id)} className="material-icons">thumb_up</i>
                            {likes}
                        </div>
                    </li>
                )
            })
    }
    render() {
        console.log(this.props.lyrics)
        return (
            <ul className="collection">
                {this.renderLyricList()}
            </ul>
        )
    }
}

const mutation = gql `
  mutation LikeLyric($id: ID) {
  likeLyric(id: $id){
    id,
    likes	
  }
}
`;

export default graphql(mutation)(LyricList);