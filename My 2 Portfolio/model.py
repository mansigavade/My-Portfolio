from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

project_texts = [
    """AI-powered college enquiry chatbot using Python, Django, MySQL,
    chatterbot library, NLP techniques, bigram model, real-time responses""",

    """Student performance prediction and CGPA calculator using
    Scikit-learn, XGBoost, Streamlit, Matplotlib, Plotly,
    regression models, data analytics, deployed on Heroku""",

    """Pumpkin seed classification system using Scikit-learn,
    NumPy, Pandas, Flask deployment, feature scaling,
    confusion matrix, accuracy, precision, recall"""
]

labels = [
    "College Enquiry Chatbot",
    "Student Performance Prediction",
    "Pumpkin Seed Classification"
]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(project_texts)

model = LogisticRegression()
model.fit(X, labels)


def analyze_project(text):
    result = {}

    X_test = vectorizer.transform([text])
    predicted_project = model.predict(X_test)[0]
    result["Matched Project"] = predicted_project

    project_details = {
        "College Enquiry Chatbot": {
            "Project Type": "NLP / Chatbot System",
            "Libraries": "Django, chatterbot, MySQL",
            "Model Training": "Yes (Bigram + NLP Training)",
            "Deployment": "Web-based academic support chatbot",
            "Summary": "An AI-powered chatbot system providing real-time college enquiry responses using NLP and machine learning."
        },
        "Student Performance Prediction": {
            "Project Type": "Regression / Prediction System",
            "Libraries": "Scikit-learn, XGBoost, Streamlit",
            "Model Training": "Yes (Regression Models)",
            "Deployment": "Interactive dashboard for instant score estimates",
            "Summary": "A machine learning-based system that predicts student academic performance and CGPA using data analytics and regression techniques."
        },
        "Pumpkin Seed Classification": {
            "Project Type": "Classification System",
            "Libraries": "Scikit-learn, NumPy, Pandas, Flask",
            "Model Training": "Yes (Classification Model)",
            "Deployment": "Flask application with real-time seed prediction",
            "Summary": "A machine learning model trained on pumpkin seed features to classify seed types with high accuracy and real-time prediction capability."
        }
    }

    result.update(project_details[predicted_project])

    return result
