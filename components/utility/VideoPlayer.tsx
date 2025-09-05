import React, {FC, useRef} from 'react';
import dynamic from "next/dynamic";
const Player = dynamic(() => import('react-hls-player'), { ssr: false },);


interface HlsPlayerProps {
    src: string;
    poster?: string;
    autoPlay?: boolean;
    controls?: boolean;
    width?: string | number;
    height?: string | number;
    hlsConfig?: any;
    playerRef?: any;
    // playerRef?: MutableRefObject<any>;
    // playerRef?: React.MutableRefObject<any>;
    // playerRef?: React.MutableRefObject<any>;
}



const HlsVideoPlayer: FC<HlsPlayerProps> = ({src, poster, autoPlay = true, controls = true, width , height, hlsConfig, playerRef, }) => {
    const localPlayerRef = useRef<HTMLVideoElement>(null);
    const combinedRef = playerRef || localPlayerRef;

    return (
        <div>
            <Player
                src={src}
                poster={poster}
                autoPlay={autoPlay}
                controls={controls}
                width={width}
                height={height}
                hlsConfig={hlsConfig}
                playerRef={playerRef}
                // style={{borderRadius:"1rem"}}
            />
        </div>
    );
};

export default HlsVideoPlayer;
