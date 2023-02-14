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
    imgSrc: null,
    audio: null,
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
    if (action.type === 'AUDIO') {
        return {
            ...state, audio: action.enteredAudio
        }
    }
}

const SongUploadForm = (props) => {
    // const songCtx = useContext(SongContext);

    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const imageRegex = (/image\/.*/i);
    const audioRegex = (/audio\/.*/i);
    const nameChangeHandler = (e) => {
        dispatch({ type: 'NAME', enteredName: e.target.value })
    };

    const artistChangeHandler = (e) => {
        dispatch({ type: 'ARTIST', entertedArtist: e.target.value })
    };

    const onImageFileChange = (e) => {
        dispatch({ type: 'IMG', enteredImg: e.target.files[0] })
    };

    const onSongFileChange = (e) => {
        dispatch({ type: 'AUDIO', enteredAudio: e.target.files[0] })
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setFormIsValid(state.songName.trim().length > 1 && state.artist.trim().length > 1 && imageRegex.test(state.imgSrc.type) && audioRegex.test(state.audio.type));
        }, 500);

        return () => {
            clearInterval(timer)
        }
    }, [state])

    const submitHandler = (e) => {
        e.preventDefault();
        if (formIsValid) {
            setIsLoading(true)
            // this makes an API POST request
            apiSongSubmit(state)
                .then(data => {
                    console.log(data);
                    setIsLoading(false)
                })
                .catch(e => console.log(e))
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
                    label="Cover Image"
                    type="file"
                    accept="image/*"
                    placeholder="Image"
                    onChange={onImageFileChange}
                />
                <Input
                    label="Song File"
                    type="file"
                    accept="audio/*"
                    placeholder="Upload audio file"
                    onChange={onSongFileChange}
                />
                <div className={classes.actions}>
                    <Button onClick={props.onHideUploadModal}>Close</Button>
                    <Button type="submit" className={classes["add-button"]} disabled={!formIsValid}>Add Song</Button>
                </div>
                {isLoading && <p>Uploading...</p>}
            </form>
        </Modal>
    )
};

export default SongUploadForm;