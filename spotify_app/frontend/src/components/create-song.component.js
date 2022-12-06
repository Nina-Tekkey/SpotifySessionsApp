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
            songTitle: [],
            songArtist: [],
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
        var newArray = this.state.songTitle.slice();    
        newArray.push(e.target.value);   
        this.setState({songTitle:newArray})
    }

    onChangeSongArtists(e){
        var newArray = this.state.songArtist.slice();    
        newArray.push(e.target.value);   
        this.setState({songArtist:newArray})
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

   


    render() {
        return (
            <div>
                <p>Creating a Song Log</p>
            </div>
        );
    }
}