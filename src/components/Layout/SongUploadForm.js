import React, { useState, useReducer, useEffect, useContext } from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from './SongUploadForm.module.css';
import SongContext from "../../store/song-context";
import { apiSongSubmit } from "../../api";

const initialState = {
    songName: '',
    artist: '',
    imgSrc: '',
}

const reducer = (state, action) => {
    if (action.type === 'NAME') {
        return {
            ...state, songName: action.enteredName
        }
    }
    if (action.type === 'ARTIST') {
        return {
            ...state, artist: action.entertedArtist
        }
    }
    if (action.type === 'IMG') {
        return {
            ...state, imgSrc: action.enteredImg
        }
    }
}

const SongUploadForm = (props) => {
    const songCtx = useContext(SongContext);

    const [state, dispatch] = useReducer(reducer, initialState);

    const [formIsValid, setFormIsValid] = useState(false);

    const nameChangeHandler = (e) => {
        dispatch({ type: 'NAME', enteredName: e.target.value })
    };

    const artistChangeHandler = (e) => {
        dispatch({ type: 'ARTIST', entertedArtist: e.target.value })
    };

    const imgURLChangeHandler = (e) => {
        dispatch({ type: 'IMG', enteredImg: e.target.value })
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setFormIsValid(state.songName.trim().length > 1 && state.artist.trim().length > 1 && state.imgSrc.trim().length > 1);
        }, 500);

        return () => {
            clearInterval(timer)
        }
    }, [state])

    const submitHandler = (e) => {
        e.preventDefault();
        if (formIsValid) {
            // this makes an API call
            apiSongSubmit(state)
                .then(data => console.log(data))
            //if successful, close the modal
            props.onHideUploadModal();
        } else {
            console.log('error');
        }
    }

    return (
        <Modal onHideUploadModal={props.onHideUploadModal}>
            <form onSubmit={submitHandler}>
                <Input
                    label="Name"
                    type="text"
                    placeholder="Song Name"
                    value={state.name}
                    onChange={nameChangeHandler}
                />
                <Input
                    label="Artist"
                    type="text"
                    placeholder="Song Artist"
                    value={state.artist}
                    onChange={artistChangeHandler}
                />
                <Input
                    label="Cover Image URL"
                    type="text"
                    placeholder="Image URL"
                    value={state.imgURL}
                    onChange={imgURLChangeHandler}
                />
                <div className={classes.actions}>
                    <Button onClick={props.onHideUploadModal}>Close</Button>
                    <Button type="submit" className={classes["add-button"]} disabled={!formIsValid}>Add Song</Button>
                </div>
            </form>
        </Modal>
    )
};

export default SongUploadForm;