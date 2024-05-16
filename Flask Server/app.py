# Import the necessary modules
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from gtts import gTTS
import pandas as pd
from googletrans import Translator

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Load the Bagheli database
file_path = 'BagheliDBS.xlsx'
df = pd.read_excel(file_path)
hindi_words = df['Hindi'].tolist()
bagheli_words = df['Bagheli'].tolist()
hindi_to_bagheli = dict(zip(hindi_words, bagheli_words))


def detect_browser():
    user_agent = request.headers.get('User-Agent')
    if 'Chrome' in user_agent:
        browser_name = 'chrome'
    elif 'Firefox' in user_agent:
        browser_name = 'firefox'
    elif 'Safari' in user_agent and 'Chrome' not in user_agent:
        browser_name = 'safari'
    else:
        browser_name = 'unsupported'

    return browser_name

def get_driver(browser_name, headless=True):
    if browser_name.lower() == 'chrome':
        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument('--headless')
        return webdriver.Chrome(options=options)
    elif browser_name.lower() == 'firefox':
        options = webdriver.FirefoxOptions()
        if headless:
            options.add_argument('--headless')
        return webdriver.Firefox(options=options)
    elif browser_name.lower() == 'safari':
        return webdriver.Safari()
    else:
        raise ValueError(f"Unsupported browser: {browser_name}")

def translate_english_to_hindi(english_sentence, browser_name):
    # Launch the web browser based on the provided browser name
    driver = get_driver(browser_name)

    # Open Google Translate
    driver.get("https://translate.google.com/")

    # Wait for the input field to be ready
    input_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "textarea[aria-label='Source text']"))
    )

    # Input the English sentence into the input field
    input_field.clear()
    input_field.send_keys(english_sentence)

    # Wait for translation to appear
    hindi_translation_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "span[jsname='toZopb']"))
    )

    # Get the translated Hindi text
    hindi_translation = hindi_translation_element.text

    # Close the browser
    driver.quit()

    return hindi_translation


# Function to predict Bagheli sentence
def predict_bagheli_sentence(hindi_sentence):
    predicted_sentence = []
    words = hindi_sentence.split()
    i = 0
    while i < len(words):
        word = words[i]
        if i < len(words) - 2 and (word + " " + words[i + 1] + " " + words[i + 2] in hindi_to_bagheli):
            wk = word + " " + words[i + 1] + " " + words[i + 2]
            predicted_sentence.append(hindi_to_bagheli[wk])
            i += 3
        elif i < len(words) - 1 and (word + " " + words[i + 1] in hindi_to_bagheli):
            predicted_sentence.append(hindi_to_bagheli[word + " " + words[i + 1]])
            i += 2
        elif word in hindi_to_bagheli:
            predicted_sentence.append(hindi_to_bagheli[word])
            i += 1
        else:
            predicted_sentence.append(word)
            i += 1
    return ' '.join(predicted_sentence)

# Route to handle prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        hindi_sentence = data.get('hindiSentence', '')
        
        selected_option = data.get('selectedOption', None)
        if selected_option == 1:  # Hindi in English
            # translator = Translator()
            # translated_sentence = translator.translate(hindi_sentence, dest='hi').text
            #Implement this function 
            hindi_sentence = translate_english_to_hindi(hindi_sentence, detect_browser())
            predicted_bagheli_sentence = predict_bagheli_sentence(hindi_sentence)
        else:
            predicted_bagheli_sentence = predict_bagheli_sentence(hindi_sentence)

        
        return jsonify({'predictedBagheliSentence': predicted_bagheli_sentence})
    except Exception as e:
        print('Prediction error:', str(e))
        return jsonify({'error': 'Prediction failed'}), 500


# Route to handle text-to-speech conversion
@app.route('/text-to-speech', methods=['POST'])
def text_to_speech():
    data = request.json
    text = data.get('text', '')
    language = data.get('language', 'hi')

    if language != 'hi':
        return {'error': 'Language not supported'}, 400

    tts = gTTS(text=text, lang=language, slow=False)
    audio_file_path = 'output.mp3'
    tts.save(audio_file_path)

    return send_file(audio_file_path, as_attachment=True)

# Run the Flask app
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
