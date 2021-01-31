from collections import defaultdict
import json
import sys
from typing import Dict, List, NamedTuple, Sequence, Tuple

import cv2
import matplotlib.pyplot as plt
import numpy as np


class Metadata(NamedTuple):
    height: int
    width: int
    fps: float


def extract_keyframes(filename: str, classes: Sequence = ('Car', 'Person', 'Bicycle')) -> Tuple[Dict, Metadata]:
    with open(filename) as fh:
        rekognition = json.load(fh)

    metadata = rekognition['rekognition'][0]['VideoMetadata']
    h = metadata['FrameHeight']
    w = metadata['FrameWidth']
    fps = metadata['FrameRate']

    keyframes = defaultdict(list)
    for keyframe in rekognition['rekognition']:
        for labels in keyframe['Labels']:        
            if len(labels['Label']['Instances']) > 0:
                label = labels['Label']['Name']
                if label in classes:
                    for instance in labels['Label']['Instances']:
                        bb = instance['BoundingBox']
                        record = dict(
                            name=label,
                            top=int(np.round(bb['Top'] * h)),
                            left=int(np.round(bb['Left'] * w)),
                            bottom=int(np.round((bb['Top'] + bb['Height']) * h)),
                            right=int(np.round((bb['Left'] + bb['Width']) * w))
                        )
                        keyframes[labels['Timestamp']].append(record)
    return keyframes, Metadata(h, w, fps)

def annotate_frames(filename: str, keyframes: Dict, metadata: Metadata) -> List:
    font = cv2.FONT_HERSHEY_SIMPLEX
    tic = 1 / metadata.fps * 1000
    
    steps = np.array(sorted(keyframes.keys()))
    next_keyframe_ts = steps[0]
    cursor = 0
    ts = 0

    frames = []
    cap = cv2.VideoCapture(filename)
    while cap.isOpened():
        ret, frame = cap.read()
        if ts >= next_keyframe_ts:      
            for box in keyframes[next_keyframe_ts]:
                pt1 = (box['left'], box['top'])
                pt2 = (box['right'], box['bottom'])
                cv2.rectangle(frame, pt1, pt2, (255,255,0), 5)
                cv2.putText(frame, box['name'], pt1, font, 1, (255,255,0), 3)
            frames.append(frame)

            cursor += 1
            if cursor >= len(steps):
                break
            next_keyframe_ts = steps[cursor]
            
        ts += tic
        if not ret:
            print("Can't receive frame (stream end?). Exiting ...")
            break

    cap.release()
    cv2.destroyAllWindows()

    return frames

def create_video(frames: List, metadata) -> None:
    fourcc = cv2.VideoWriter_fourcc('a', 'v', 'c', '1')
    video = cv2.VideoWriter('rekognition.mov', fourcc, 2.0, (metadata.width, metadata.height))
    for frame in frames:
        video.write(frame)
    cv2.destroyAllWindows()
    video.release()


def main():
    video_fp = sys.argv[1]
    data_fp = sys.argv[2]
    keyframes, metadata = extract_keyframes(data_fp)
    frames = annotate_frames(video_fp, keyframes, metadata)
    create_video(frames, metadata)


if __name__ == '__main__':
    main()
