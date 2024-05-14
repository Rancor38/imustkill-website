import DownloadCharacterSheetButton from '../components/DownloadCharacterSheetButton';
import HomeButton from '../components/HomeButton';

const CharacterSheet = () => {
  return (
      <>
      <img className='character-sheet-img' src={`${process.env.PUBLIC_URL}/IMK Character Sheet.png`} alt="Character Sheet" />
        <DownloadCharacterSheetButton/>
    </>
  );
};

export default CharacterSheet;
