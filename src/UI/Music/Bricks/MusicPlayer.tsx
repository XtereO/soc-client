


type PropsType = {

}
export const MusicPlayer: React.FC<PropsType> = (props) => {
    return <div className="Body__BGPlayingMusic w-100" style={{ paddingTop: 350 }}>
        <div className="Center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                className="bi bi-play 
        Body__SwitchButton
        Body__SwitchButton_active
        Body__SwitchButton_hover"
                viewBox="0 0 16 16">
                <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
            </svg>
        </div>
        <div
            style={{ position: 'relative' }}
            className="mt-3 px-4 w-100">
            <div style={{
                width: '30%', height: '3px', backgroundColor: 'white'
            }}>
            </div>
            <div style={{
                position: 'relative',
                bottom: 3, left: '30%',
                width: '70%', height: '3px', backgroundColor: 'gray'
            }}>
            </div>
            <div style={{
                position: 'relative',
                bottom: 13, left: '30%',
                height: 20, width: 20,
                borderRadius: 20000,
                backgroundColor: "white"
            }}>
            </div>
        </div>
    </div>
}