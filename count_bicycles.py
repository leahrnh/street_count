import json
import sys




def main():
    # Give json file output by object_detection
    json_filename = sys.argv[1]
    with open(json_filename, 'r') as f:
        rekognition = json.load(f)

    for response in rekognition['rekognition']:

        for labelDetection in response['Labels']:
            label = labelDetection['Label']
            timestamp = labelDetection['Timestamp']
            labelname = label['Name']
            if 'Bicycle' in labelname:
                if 'Instances' in label:
                    print(f"{timestamp}\t{labelname}\t{len(label['Instances'])}")


if __name__ == "__main__":
    main()