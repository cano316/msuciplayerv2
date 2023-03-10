import React, { useState, useReducer, useEffect, useContext } from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from './SongUploadForm.module.css';
import { apiSongSubmit } from "../../api";
import ImageCropper from "../UI/Crop/ImageCropper";
import SongContext, { Song } from "../../store/song-context";

type InitialStateType = {
    songName: string,
    artist: string,
    imgSrc: File | null,
    audio: File | null
};

type Action =
    { type: 'NAME', payload: string }
    | { type: 'ARTIST', payload: string }
    | { type: 'IMG', payload: File }
    | { type: 'AUDIO', payload: File }
    | { type: 'IMG-CROP', payload: File }


const initialState: InitialStateType = {
    songName: '',
    artist: '',
    imgSrc: null,
    audio: null,
}

const reducer = (state: InitialStateType, action: Action): InitialStateType => {
    if (action.type === 'NAME') {
        return {
            ...state, songName: action.payload
        }
    }
    if (action.type === 'ARTIST') {
        return {
            ...state, artist: action.payload
        }
    }
    if (action.type === 'IMG') {
        return {
            ...state, imgSrc: action.payload
        }
    }
    if (action.type === 'AUDIO') {
        return {
            ...state, audio: action.payload
        }
    }

    if (action.type === 'IMG-CROP') {
        return {
            ...state, imgSrc: action.payload
        }
    }

    return state;
}

const SongUploadForm: React.FC<{ onHideUploadModal: () => void }> = (props) => {
    const songCtx = useContext(SongContext);

    const [state, dispatch] = useReducer(reducer, initialState);
    const [isUpLoading, setIsUploading] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [imageIsCropped, setImageIsCropped] = useState(false);

    const imageRegex: RegExp = (/image\/.*/i);
    const audioRegex: RegExp = (/audio\/.*/i);

    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'NAME', payload: e.target.value })
    };

    const artistChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'ARTIST', payload: e.target.value })
    };

    const onImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        dispatch({ type: 'IMG', payload: e.target.files[0] })
    };

    const onSongFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        dispatch({ type: 'AUDIO', payload: e.target.files[0] })
    };

    const onImageCrop = (image: File) => {
        if (!image) return;
        dispatch({ type: 'IMG-CROP', payload: image });
        setImageIsCropped(true);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setFormIsValid(state.songName.trim().length > 1 && state.artist.trim().length > 1 && imageRegex.test(state.imgSrc!.type) && audioRegex.test(state.audio!.type) && imageIsCropped);
        }, 500);

        return () => {
            clearInterval(timer)
        }
    }, [state])

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (formIsValid) {
            setIsUploading(true)
            // this makes an API POST request
            apiSongSubmit(state)
                .then((response: any) => {
                    console.log(response);
                    songCtx.addSong(response.data);
                    setIsUploading(false);
                    props.onHideUploadModal();
                })
                .catch(e => {
                    console.log(e);
                    setIsUploading(false)
                })
            // console.log(state)
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
                    value={state.songName}
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
                {isUpLoading && <p>Uploading...</p>}
            </form>
            {state.imgSrc && <ImageCropper onSubmitCropped={onImageCrop} image={URL.createObjectURL(state.imgSrc)} filename={state.imgSrc.name} type={state.imgSrc.type} />}
        </Modal>
    )
};

export default SongUploadForm;

// To Do: