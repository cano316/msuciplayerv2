import classes from './SongItem.module.css'

const SongItem = (props) => {
    return (
        <li className={classes.song}>
            <img src={props.imgSrc} />
            <h2>{props.songName}</h2>
            <h3>{props.artist}</h3>
        </li>
    )
};

export default SongItem;