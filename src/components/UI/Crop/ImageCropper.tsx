import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import classes from './ImageCropper.module.css'
import Button from "../Button/Button";
import { type } from "os";

const ImageCropper: React.FC<{ image: string, filename: string, type: string, onSubmitCropped: (image: File) => void }> = (props) => {
    const [isBeingCropped, setIsBeingCropped] = useState(true)
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedImage, setCroppedImage] = useState<File>();
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const cropImage = async () => {
        const results = await getCroppedImg(props.image, croppedAreaPixels);
        const croppedImage = new File([results], props.filename, { type: props.type })
        // console.log(croppedImage);
        setCroppedImage(croppedImage)
    }

    const onConfirmCrop = (e: React.MouseEvent) => {
        setIsBeingCropped(false);
        props.onSubmitCropped(croppedImage!);
    }

    const cropper = <div className={classes["crop-container"]}>
        <Cropper
            image={props.image}
            crop={crop}
            aspect={3 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
        />
    </div>

    return (
        <div className={classes["crop-body"]}>
            {isBeingCropped && cropper}
            {isBeingCropped && <Button onClick={cropImage}>Crop</Button>}
            {croppedImage && <img className={classes["cropped-image"]} src={URL.createObjectURL(croppedImage)} />}
            {croppedImage && isBeingCropped && <button onClick={onConfirmCrop}>Confirm</button>}
        </div>

    )
};

export default ImageCropper;
