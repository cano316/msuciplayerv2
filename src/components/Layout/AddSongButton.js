import classes from './AddSongButton.module.css';

const AddSongButton = (props) => {

    return (
        <button className={classes.button} onClick={props.onClick}>
            {/* <span className={classes.badge}>+</span> */}
            Add Song
        </button>
    )
};

export default AddSongButton;