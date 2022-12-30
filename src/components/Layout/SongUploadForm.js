import React, { useState, useReducer } from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input/Input";
import Button from "../UI/Card/Button/Button";
import classes from './SongUploadForm.module.css';

const initialState = {
    name: '',
    artist: '',
    imgURL: ''
}

const reducer = (state, action) => {
    if (action.type === 'NAME') {
        return {
            ...state, name: action.enteredName
        }
    }
    if (action.type === 'ARTIST') {
        return {
            ...state, artist: action.entertedArtist
        }
    }
    if (action.type === 'IMG') {
        return {
            ...state, imgURL: action.enteredImg
        }
    }
}

const SongUploadForm = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const nameChangeHandler = (e) => {
        dispatch({ type: 'NAME', enteredName: e.target.value })
    };

    const artistChangeHandler = (e) => {
        dispatch({ type: 'ARTIST', entertedArtist: e.target.value })
    };

    const imgURLChangeHandler = (e) => {
        dispatch({ type: 'IMG', enteredImg: e.target.value })
    };


    const submitHandler = (e) => {
        e.preventDefault();
        console.log(state)
        //if successful, close the modal
        props.onHideUploadModal()
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
                    <Button type="submit" className={classes["add-button"]}>Add Song</Button>
                </div>
            </form>
        </Modal>
    )
};

export default SongUploadForm;