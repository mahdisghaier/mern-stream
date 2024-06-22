// import React, { useEffect, useRef, useState } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import MillicastWhepPlugin from '@millicast/videojs-whep-plugin';
// import 'videojs-resolution-switcher/lib/videojs-resolution-switcher.css';
// import 'videojs-resolution-switcher/lib/videojs-resolution-switcher.js';

// const VideoPlayer = ({ url, isMainPlayer }) => {
//   const videoRef = useRef(null); // Ref for the video element
//   const playerRef = useRef(null); // Ref for the Video.js player instance
//   const canvasRef = useRef(null); // Ref for the canvas element for object detection
//   const [playerReady, setPlayerReady] = useState(false); // State to track player readiness

//   // Function to run object detection (replace with your object detection logic)
//   const runObjectDetection = async (net) => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const video = videoRef.current;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     // Example: Run object detection logic (replace with your specific logic)
//   //   const obj = await net.detect(video);
//   //   // Example: Draw rectangles around detected objects (replace with your specific drawing function)
//   //   drawRectangles(obj, context);
//   };

//   // useEffect(() => {
//   //   const loadModelAndRunDetection = async () => {
//   //     // Example: Load object detection model (replace with your specific model loading logic)
//   //     const net = await loadObjectDetectionModel();

//   //     // Example: Run object detection at an interval (replace with your specific logic)
//   //     setInterval(() => {
//   //       runObjectDetection(net);
//   //     }, 1000); // Adjust interval as needed
//   //   };

//   //   if (playerReady) {
//   //     loadModelAndRunDetection();
//   //   }
//   // }, [playerReady]);

//   useEffect(() => {
//     // Register MillicastWhepPlugin with Video.js
//     videojs.registerPlugin('MillicastWhepPlugin', MillicastWhepPlugin);

//     // Configure Video.js options
//     const options = {
//       controls: true,
//       autoplay: true,
//       preload: 'auto',
//     };

//     // Initialize Video.js player
//     playerRef.current = videojs(videoRef.current, options, function onPlayerReady() {
//       // Initialize MillicastWhepPlugin with the provided URL
//       this.MillicastWhepPlugin({ url });

//       // Set player readiness state to true
//       setPlayerReady(true);

//       // Handle player errors
//       this.on('error', () => {
//         console.error('Error occurred:', this.error());
//       });
//     });

//     // Clean up on unmount
//     return () => {
//       if (playerRef.current) {
//         playerRef.current.dispose(); // Dispose Video.js player instance
//       }
//     };
//   }, [url]);

//   return (
//     <div style={{ width: isMainPlayer ? '70%' : '30%', position: 'relative', height: 'auto' }}>
//       <video
//         ref={videoRef}
//         className="video-js vjs-default-skin"
//         controls
//         preload="auto"
//         style={{ width: '100%', height: 'auto' }}
//       >
//         <p className="vjs-no-js">
//           To view this video please enable JavaScript, and consider upgrading to a
//           web browser that supports HTML5 video.
//         </p>
//       </video>
//       <canvas
//         ref={canvasRef}
//         style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: '0', pointerEvents: 'none' }}
//       />
//     </div>
//   );
// };

// export default VideoPlayer;
import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import MillicastWhepPlugin from '@millicast/videojs-whep-plugin';
import 'videojs-resolution-switcher/lib/videojs-resolution-switcher.css';
import 'videojs-resolution-switcher/lib/videojs-resolution-switcher.js';
import * as tfmodel from '@tensorflow-models/coco-ssd';
import { drawReact } from './utilities';

const VideoPlayer = ({ url, isMainPlayer }) => {
  const videoRef = useRef(null);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const canvasRef = useRef(null);

  const runCoco = async () => {
    const net = await tfmodel.load();
    setInterval(() => {
      ObjectDetection(net);
    }, 1000);
  };

  const ObjectDetection = async (net) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const obj = await net.detect(video);
    drawReact(obj, context);
  };

  useEffect(() => {
    videojs.registerPlugin('MillicastWhepPlugin', MillicastWhepPlugin);
    const options = {
      controls: true,
      autoplay: true,
      preload: 'auto',
    };

    playerRef.current = videojs(videoRef.current, options, function onPlayerReady() {
      this.MillicastWhepPlugin({ url });
      setPlayerReady(true);
      this.on('error', () => {
        console.error('Error occurred:', this.error());
      });
    });
  }, [url]);

  useEffect(() => {
    if (playerReady) {
      const intervalId = setInterval(() => {
        runCoco();
      }, 10);
      return () => clearInterval(intervalId);
    }
  }, [playerReady]);

  return (
    <div
      style={{
        flex: isMainPlayer ? '2 1 0%' : '1 1 0%',
      //   border: '1px solid #ccc',
      //   borderRadius: '8px',
      //   overflow: 'hidden',
      //   position: 'relative',
        backgroundColor: '#000',
       }}
    >
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        controls
        preload="auto"
        style={{
          width: '100%',
          height: 'auto',
        }}
      >
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that supports HTML5 video.
        </p>
      </video>
      <canvas
        ref={canvasRef}
         style={{
          display: 'block',
        //   position: 'absolute',
        //   top: 0,
        //   left: 0,
        //   opacity: '0',
        //   pointerEvents: 'none',
         }}
      ></canvas>
    </div>
  );
};

export default VideoPlayer;

