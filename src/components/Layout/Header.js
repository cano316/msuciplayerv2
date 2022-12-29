import AddSongButton from "./AddSongButton";
import classes from './Header.module.css';

const Header = (props) => {

    return (
        <header className={classes.header}>
            <h1>musicplayerv2</h1>
            <AddSongButton onClick={props.onShowUploadModal} />
        </header>
    )
};

export default Header;