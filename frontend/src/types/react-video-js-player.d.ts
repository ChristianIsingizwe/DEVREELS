declare module 'react-video-js-player' {
    import * as React from 'react';
    import videojs from 'video.js';
  
    export interface VideoJsPlayerProps {
      src: string;
      poster?: string;
      width?: number | string;
      height?: number | string;
      controls?: boolean;
      // Callback when the underlying video.js player instance is ready.
      onReady?: (player: videojs.Player) => void;
    }
  
    export default class VideoPlayer extends React.Component<VideoJsPlayerProps> {}
  }
  