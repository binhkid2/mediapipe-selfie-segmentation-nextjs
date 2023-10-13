import { RefObject, useEffect, useRef, useState } from "react";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import imageList from "./imageList";
import styles from "./style.module.scss";
import Webcam from 'react-webcam'
import { Camera } from '@mediapipe/camera_utils'
 function SelfieSegmentationComponent  () {
    const videoElement = useRef<HTMLVideoElement | null>(null);
    const canvasElement = useRef<HTMLCanvasElement | null>(null);
const [customBackgroundImage, setCustomBackgroundImage] = useState(
new Image()
)

function onResults(results: any) {
    const canvasCtx = canvasElement.current?.getContext('2d') ;
    if (canvasCtx) {
    canvasCtx.save()
    canvasCtx.clearRect(
      0,
      0,
      canvasElement.current?.width || 0,
      canvasElement.current?.height || 0
    )
    canvasCtx.drawImage(
      results.segmentationMask,
      0,
      0,
      canvasElement.current?.width || 0,
      canvasElement.current?.height || 0
    )

    canvasCtx.globalCompositeOperation = 'source-in'
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.current?.width || 0,
      canvasElement.current?.height || 0
    )

    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop'
    //canvasCtx.fillStyle = existingColor
    canvasCtx.fillRect(
      0,
      0,
      canvasElement.current?.width || 0,
      canvasElement.current?.height || 0
    )

    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop'
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.current?.width || 0,
      canvasElement.current?.height || 0
    )

    canvasCtx.restore()}
  }

  const selfieSegmentation = new SelfieSegmentation({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
    },
  })
  selfieSegmentation.setOptions({
    modelSelection: 1,
  })

  console.log(selfieSegmentation)

  selfieSegmentation.onResults(onResults)

  if (
    typeof videoElement.current !== 'undefined' &&
    videoElement.current !== null
  ) {
    const camera = new Camera(videoElement.current as HTMLVideoElement, {
        onFrame: async () => {
          await selfieSegmentation.send({ image: videoElement.current as unknown as HTMLVideoElement });
        },
        width: 1280,
        height: 720,
      });
      
    camera.start()
  }
  return (
    <div>
      <div className="container virtual-bg-vid">
        <Webcam
          className="video"
          audio={false}
          ref={videoElement}
         
        />
        <canvas ref={canvasElement}></canvas>
      </div>
      <br />

      <div className="row color-buttons">
        <h1>Change Your Background Color HERE!</h1>
        <button
          type="button"
          className="btn btn-outline-dark col-sm-1"
          
          value="#000000"
        >
          Black
        </button>
        <button
          type="button"
          className="btn btn-outline-warning col-sm-1"
          
          value="#FFFF00"
        >
          Yellow
        </button>
        <button
          type="button"
          className="btn btn-outline-success col-sm-1"
         
        >
          Green
        </button>
        <button
          type="button"
          className="btn btn-outline-danger col-sm-1"
         
        >
          Red
        </button>
        <button
          type="button"
          className="btn btn-outline-primary col-sm-1"
         
        >
          Blue
        </button>
      </div>
    </div>
  )
}





