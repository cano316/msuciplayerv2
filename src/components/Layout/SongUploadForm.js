import React, { useState } from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input/Input";
import Button from "../UI/Card/Button/Button";
import classes from './SongUploadForm.module.css';

const SongUploadForm = (props) => {
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [imgURL, setImgURL] = useState('');

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    };

    const artistChangeHandler = (e) => {
        setArtist(e.target.value);
    };

    const imgURLChangeHandler = (e) => {
        setImgURL(e.target.value);
    };


    const submitHandler = (e) => {
        e.preventDefault();
        console.log({
            name,
            artist,
            imgURL
        });

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
                    value={name}
                    onChange={nameChangeHandler}
                />
                <Input
                    label="Artist"
                    type="text"
                    placeholder="Song Artist"
                    value={artist}
                    onChange={artistChangeHandler}
                />
                <Input
                    label="Cover Image URL"
                    type="text"
                    placeholder="Image URL"
                    value={imgURL}
                    onChange={imgURLChangeHandler}
                />
                <div className={classes.actions}>
                    <Button onClick={props.onHideUploadModal}>Close</Button>
                    <Button type="submit">Add Song</Button>
                </div>
            </form>
        </Modal>
    )
};

export default SongUploadForm;