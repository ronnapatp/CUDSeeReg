import os
import requests
import sys
import pandas as pd
import json

with open("links.json") as f:
   linkData = json.load(f)
   
def getGoogleSeet(spreadsheet_id, gid, outFile):
  url = f'https://docs.google.com/spreadsheets/d/{spreadsheet_id}/export?format=csv&gid={gid}'
  response = requests.get(url)
  if response.status_code == 200:
    filepath = os.path.join(outFile)
    with open(filepath, 'wb') as f:
      f.write(response.content)
      print('CSV file saved to: {}'.format(filepath))    
  else:
    print(f'Error downloading Google Sheet: {response.status_code}')
    sys.exit(1)

def csvToJson(filePath, outputFile, i):
    df = pd.read_csv(filePath, encoding='utf-8')

    df = df.rename(columns={
        'Unnamed: 1': 'code',
        'Unnamed: 2': 'name',
        'Unnamed: 3': 'credit',
        'Unnamed: 4': 'classPerWeek',
        'Unnamed: 5': 'group',
        'Unnamed: 6': 'instructor',
        'Unnamed: 7': 'enrollment',
        'Unnamed: 8': 'electiveQuantity',
        'Unnamed: 9': 'updatedElectiveQuantity',
        'Unnamed: 10': 'classtime',
        'Unnamed: 11': 'classroom',
        'Unnamed: 12': 'note',
        f'ตารางวันและเวลาเรียนรายวิชาเพิ่มเติม สำหรับนักเรียนชั้นมัธยมศึกษาปีที่ {i} ภาคเรียนที่ 2 ปีการศึกษา 2566': 'order'
    })

    df['order'] = pd.to_numeric(df['order'], errors='coerce').astype('Int64')

    df = df.ffill()
    df = df.iloc[:-1]

    grouped_df = df.groupby(['order', 'code']).agg({
        'name': 'first',
        'credit': 'first',
        'classPerWeek': 'first',
        'group': lambda x: x.tolist() if len(x) > 1 else x.iloc[0],
        'instructor': lambda x: x.tolist() if len(x) > 1 else x.iloc[0],
        'enrollment': lambda x: x.tolist() if len(x) > 1 else x.iloc[0],
        'electiveQuantity': lambda x: x.tolist() if len(x) > 1 else x.iloc[0],
        'updatedElectiveQuantity': lambda x: x.tolist() if len(x) > 1 else x.iloc[0],
        'classtime': lambda x: x.tolist() if len(x) > 1 else x.iloc[0],
        'classroom': lambda x: x.tolist() if len(x) > 1 else x.iloc[0],
        'note': lambda x: x.tolist() if len(x) > 1 else x.iloc[0],
    }).reset_index()

    grouped_df = grouped_df.sort_values(by='order')

    json_data = grouped_df.to_json(orient='records', force_ascii=False, default_handler=str, indent=2)

    with open(f'{outputFile}.json', 'w', encoding='utf-8') as json_file:
        json_file.write(json_data)
        print("Succeeded in converting CSV to JSON")

outDir = '/'

for i in range(1,7):
  filepath = getGoogleSeet(linkData["2023/2"]["sheetID"], linkData["2023/2"][f"m{i}"], f"./data/csv/m{i}.csv")
  csvToJson(f'./data/csv/m{i}.csv',f'./data/json/m{i}',i)

sys.exit(0); 



