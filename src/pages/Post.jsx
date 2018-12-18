import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
        };
    }
    componentDidMount() {
        fetch(`https://hacker-news.firebaseio.com/v0/item/8863.json`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                post: data,
            });
            console.log(data);
        }).catch(console.log);
    }
    render() {
        const post = this.state.post;
        return (
            <div>
                <h1>Page Post</h1>
                <Link to="/">Link to Home</Link>
                <h2>{ post.title }</h2>
                <p>By: { post.by }</p>
                <p>Link: <a href={post.url} target="_blank">{post.url}</a></p>
            </div>
        );
    }
};
