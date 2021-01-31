import json
import sys


def get_sides(instance):
    # Bounding box
    top = instance['BoundingBox']['Top']
    left = instance['BoundingBox']['Left']
    width = instance['BoundingBox']['Width']
    height = instance['BoundingBox']['Height']
    right = left + width
    return left, right


def main():
    # Give json file output by object_detection
    json_filename = sys.argv[1]
    with open(json_filename, 'r') as f:
        rekognition = json.load(f)

    # Make a list of timestamps with num_bikes and num_peds at each
    timestamp_data = {}
    for response in rekognition['rekognition']:
        for labelDetection in response['Labels']:
            timestamp = labelDetection['Timestamp']
            if timestamp not in timestamp_data:
                timestamp_data[timestamp] = {'bikes': [], 'peds': []}
            label = labelDetection['Label']
            labelname = label['Name']

            if labelname == 'Person':
                instances = label['Instances']
                for instance in instances:
                    sides = get_sides(instance)
                    timestamp_data[timestamp]['peds'].append((sides))

            if labelname == 'Bicycle':
                instances = label['Instances']
                for instance in instances:
                    sides = get_sides(instance)
                    timestamp_data[timestamp]['bikes'].append((sides))

    timestamp_list = [(i, timestamp_data[i]) for i in sorted(timestamp_data)]

    # Iterate over the timestamps and count bikes and pedestrians
    total_bikes = 0
    total_peds = 0

    prev_bikes = 0
    prev_peds = 0
    for timestamp, data in timestamp_list:
        current_bikes = len(data['bikes'])
        current_peds = len(data['peds']) - current_bikes
        new_bikes = current_bikes - prev_bikes
        if new_bikes > 0:
            print(f"Found {new_bikes} new bicycle(s) at time {timestamp}")
            total_bikes += new_bikes
        new_peds = current_peds - prev_peds
        if new_peds > 0:
            print(f"Found {new_peds} new pedestrian(s) at time {timestamp}")
            total_peds += new_peds
        prev_bikes = current_bikes
        prev_peds = current_peds

    # TODO something is going wrong and I keep ending up with negative pedestrians!
    print(f"Total bikes: {total_bikes}; total pedestrians: {total_peds}")


if __name__ == "__main__":
    main()