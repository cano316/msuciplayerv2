import { screen, render, waitFor } from '@testing-library/react';
import SongsList from './SongsList';
describe('SongsList component', () => {
    test('renders songs from DB if request succeeds', async () => {
        // arrange
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ songName: 'Test', artist: 'Developer', image: { url: 'jahsjdhajshd.com', filename: 'imagefile' }, audio: { url: 'jahjksdhkjahsd', filename: 'ogfilename' } }]
        });

        render(<SongsList />);

        const songItems = screen.findAllByRole('listitem');
        expect(songItems).not.toHaveLength(0);

        // render(<SongsList />);
        // await waitFor(() => {
        //     const songList = screen.findAllByRole('listitem');
        //     expect(songList).not.toHaveLength(0);
        // })
    })
});