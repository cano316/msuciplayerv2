import Modal from "../../UI/Modal"
import classes from './SongDetailsModal.module.css'
import Button from "../../UI/Button/Button";

const SongDetailsModal = (props) => {
    const { song } = props;
    return (
        <Modal>
            <div className={classes["song-details"]}>
                <h1>{song.songName}</h1>
                <h2>{song.artist}</h2>
                <img src={song.imgSrc} />
                <Button onClick={props.onHideModal}>Close</Button>
            </div>
        </Modal>
    )
};

export default SongDetailsModal;