import json
import sys




def main():
    # Give json file output by object_detection
    json_filename = sys.argv[1]
    with open(json_filename, 'r') as f:
        rekognition = json.load(f)


    for response in rekognition['rekognition']:

        print('Codec: ' + response['VideoMetadata']['Codec'])
        print('Duration: ' + str(response['VideoMetadata']['DurationMillis']))

        for labelDetection in response['Labels']:
            label = labelDetection['Label']
            timestamp = labelDetection['Timestamp']
            labelname = label['Name']
            print(timestamp)
            if 'Bicycle' in labelname:
                print(labelname)


if __name__ == "__main__":
    main()