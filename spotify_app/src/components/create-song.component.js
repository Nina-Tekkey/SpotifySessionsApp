import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class CreateSong extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangeSongTitle=this.onChangeSongTitle.bind(this);
        this.onChangeSongArtists=this.onChangeSongArtists.bind(this);
        this.onChangeDuration=this.onChangeDuration.bind(this);
        this.onChangeTime=this.onChangeTime.bind(this);


        this.state = {
            username: "",
            songTitle: "",
            songArtist: "",
            duration: 0,
            time: new Date(),
            users: []
        }

    }

    componentDidMount(){
        this.setState({
            users:['test user'],
            username: 'test user'
        })
    }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        });
    }

    onChangeSongTitle(e){
        this.setState({
            songTitle : e.target.value
        });
    }

    onChangeSongArtists(e){
        this.setState({
            songArtist : e.target.value
        });
    }
    onChangeDuration(e){
        this.setState({
            duration : e.target.value
        });
    }
    onChangeTime(date){
        this.setState({
            time : date
        });
    }

    onSubmist(e){
        e.preventDefault();
        const song={
            username : this.state.username,
      songTitle : this.state.songTitle,
      songArtist : this.state.songArtist,
      duration : this.state.duration,
      time : this.state.time
        }

        console.log(song);
        window.location='/';
    }



    render() {
        return (
            <div>
                <p>Creating a Song</p>
            </div>
        );
    }
}