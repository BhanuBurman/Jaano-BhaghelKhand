import requests
import re
from bs4 import BeautifulSoup

URL = "https://hi.wiktionary.org/wiki/%E0%A4%B5%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%A8%E0%A4%B0%E0%A5%80:%E0%A4%AC%E0%A4%98%E0%A5%87%E0%A4%B2%E0%A5%80-%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80_%E0%A4%B6%E0%A4%AC%E0%A5%8D%E0%A4%A6%E0%A4%95%E0%A5%8B%E0%A4%B6#%E0%A4%AC%E0%A4%BE%E0%A4%B9%E0%A4%B0%E0%A5%80_%E0%A4%95%E0%A4%A1%E0%A4%BC%E0%A4%BF%E0%A4%AF%E0%A4%BE%E0%A4%81"
r = requests.get(URL)
soup = BeautifulSoup(r.content, 'html.parser', multi_valued_attributes=None)

divs = soup.find_all('div', class_='mw-content-ltr mw-parser-output')

result = []
# Loop through each div and find the <ol> tag within it
for div in divs:
    ol_tag = div.find('ol')
    if ol_tag:
        # Find all <li> tags within the <ol> tag and print their text content
        li_tags = ol_tag.find_all('li')
        for li in li_tags:
            result.append(li.text.strip())
        break  # If you only want the first <ol> tag, you can break the loop after finding it

formatted_data = []

# Process each line
for line in result:
    # Remove content inside parenthesis
    word = re.sub(r'\([^)]*\)', '', line).strip()

    # Remove trailing '|'
    word = word.replace('|', '')

    # Check if '—' is present in the line
    if '—' in word:
        # Split word and its description
        word, description = word.split('—')

        # If description has commas, take only the first word
        description = description.split(',')[0].strip()

        # Format the line and append to formatted_data
        formatted_line = f"{word.strip()},{description}"
        formatted_data.append(formatted_line)
    else:
        # If '—' is not present, consider the entire line as the word
        formatted_data.append(word.strip())

# Join the formatted lines with newline character
formatted_output = '\n'.join(formatted_data)

import pandas as pd

# Convert the formatted_output to a list of lines
lines = formatted_output.split('\n')

# Split each line into two columns using comma (',') as the separator
words = []
for x in lines:
    if ',' in x:
        word_split = x.split(',', maxsplit=1)
        if len(word_split) == 2:
            words.append([word_split[0].strip(), word_split[1].strip()])

# Create a DataFrame from the list of elements
df = pd.DataFrame(words, columns=['Bagheli', 'Hindi'])

# Save the DataFrame to an Excel file
excel_filename = 'formatted_output2.xlsx'
df.to_excel(excel_filename, index=False)

print(f"Data has been saved to '{excel_filename}' successfully.")
