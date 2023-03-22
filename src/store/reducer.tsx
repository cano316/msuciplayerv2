import { SongContextObject } from "./song-context";
import { Song } from "./song-context";

type Action =
    { type: 'ADD_SONG', payload: Song }
    | { type: 'SET_SONGS', payload: Song[] }
    | { type: 'PLAY_SONG', payload: Song }
    | { type: 'TOGGLE_PLAY' }
    | { type: 'PLAY_NEXT' }
    | { type: 'PLAY_PREVIOUS' }


const reducer = (state: SongContextObject, action: Action) => {
    switch (action.type) {
        case 'SET_SONGS':
            return {
                ...state, songs: action.payload
            };
        case 'ADD_SONG':
            return {
                ...state,
                songs: [action.payload, ...state.songs]
            };
        case 'PLAY_SONG':
            return {
                ...state,
                currentSong: action.payload,
                isPlaying: true,
                showMiniPlayer: true
            };
        case 'TOGGLE_PLAY':
            return {
                ...state, isPlaying: !state.isPlaying
            };
        case 'PLAY_NEXT':
            // SOME LOGIC HERE 
            const nextIndex =
                state.currentSong === null
                    ? 0
                    : state.songs.findIndex((song: Song) => song._id === state.currentSong?._id) + 1;

            return {
                ...state,
                isPlaying: true,
                currentSong: state.songs[nextIndex % state.songs.length] // if nextIndex is greater than length of songs array, it will essentially start from the beginning
            };
        case 'PLAY_PREVIOUS':
            const prevIndex =
                state.currentSong === null ? 0
                    : state.songs.findIndex((song: Song) => song._id === state.currentSong?._id) - 1;
            return {
                ...state,
                isPlaying: true,
                currentSong: state.songs[(prevIndex + state.songs.length) % state.songs.length]
            }
    }


}

export default reducer;