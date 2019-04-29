import React, { Component } from 'react';
import axios from 'axios'
// import Echo from 'laravel-echo';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            body: '',
            posts: [],
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderPosts = this.renderPosts.bind(this);
        this.formRef = null;
    }

    getPosts() {
        this.setState({loading: true});
        axios.get('/posts')
        .then((response) => {
            // console.log(response.data.posts)
            this.setState({
                posts: [...response.data.posts],
                loading:false
            })
        });
    }

    componentWillMount(){
        this.getPosts();
    }
    componentDidMount(){
        Echo.private('new-post').listen('PostCreated', e => {
                // console.log(e);
                this.setState({ posts : [e.post, ...this.state.posts] });
            });

        // this.interval = setInterval(() => this.getPosts(), 50000);
    }

    componentWillUnmount(){
        // clearInterval(this.interval);
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.postData();
        axios.post('/posts', {
            body: this.state.body
        })
        .then(response => {
            console.log(response);
            this.setState ({
                posts: [...this.state.posts, response.data],
                body:''
            });
            this.formRef.reset();
        });
    }

    handleChange(e) {
        this.setState ({
            body: e.target.value
        })
    }
    postData() {
        axios.post('/posts', {
            body: this.state.body
        })
    }

    renderPosts() {
        return this.state.posts.map(post => (
                <div key={post.id} className="media">
                    <div className="media-left">
                        <figure className="media-object mr-2">
                            <img src={post.user.avatar} alt=""/>
                        </figure>
                    </div>
                    <div className="media-bod">
                        <div className="user">
                            <a href={`/users/${post.user.username}`}><b>{post.user.username}</b></a>{' '}
                            - { post.humanCreatedAt}
                        </div>
                        <p>{post.body}</p>
                    </div>
                </div>
        ))
    }


    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Tweet something</div>

                            <div className="card-body">
                                <h3>I'm an app component! form</h3>
                                <form onSubmit={this.handleSubmit}
                                         ref={(ref) => this.formRef = ref}>
                                    <div className="form-group">
                                        <textarea className="form-control" row="5"
                                            maxLength="120"
                                            placeholder="write here" required
                                            value={this.state.body}
                                            onChange={this.handleChange}
                                            />

                                    </div>
                                    <input type="submit" value="Post" className="form-control "></input>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Recent tweet</div>
                                {!this.state.loading ? this.renderPosts() :
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>}
                            <div className="card-body">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
