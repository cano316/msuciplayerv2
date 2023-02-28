import classes from './AddSongButton.module.css';

const AddSongButton: React.FC<{ onClick: () => void }> = (props) => {

    return (
        <button className={classes.button} onClick={props.onClick}>
            Add Song
        </button>
    )
};

export default AddSongButton;