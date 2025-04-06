# Quantum Natural Language Processing for Sentiment Analysis

## Project Overview

This project explores the use of Quantum Natural Language Processing (QNLP) for sentiment analysis, a fundamental NLP task for classifying text (e.g., product or movie reviews) as positive, negative, or neutral. It focuses on developing a quantum-enhanced sentiment analysis model using variational quantum circuits (VQCs) and comparing its performance against classical deep learning baselines like MLP, LSTM, and BERT[cite: 147].

The core idea is to leverage quantum computing's potential to capture complex semantic relationships in text, potentially more efficiently than classical methods[cite: 147]. This implementation uses a hybrid quantum-classical approach, employing classical embeddings (GloVe) processed via PCA as input features for the VQC[cite: 161].

## Problem Statement

Classical deep learning models (LSTMs, BERT) are common for sentiment analysis. Quantum computing offers an alternative approach. This project aims to develop a quantum-enhanced model using VQCs, evaluate it on a review dataset, and compare its performance to classical counterparts.

## Objectives

1.  **Quantum Embedding:** Develop a quantum-compatible embedding scheme using classical embeddings (GloVe) and dimensionality reduction (PCA) to encode short text reviews for the VQC[cite: 161, 162].
2.  **VQC Design:** Design and implement a variational quantum circuit (4 qubits, 3 layers using `StronglyEntanglingLayers`) for sentiment classification[cite: 162, 165, 88, 89].
3.  **Training & Evaluation:** Train the quantum model using Pennylane and PyTorch on a dataset of product/movie reviews and evaluate its performance (Accuracy, Precision, Recall, F1-Score)[cite: 163, 166, 167, 169, 91, 92, 94].
4.  **Classical Comparison:** Implement and evaluate classical baseline models:
    * A simple Multi-Layer Perceptron (MLP) trained on the *same* PCA-reduced features as the VQC[cite: 170, 95].
    * An LSTM model (details likely in the full script, utilizes GloVe)[cite: 112].
    * A pre-trained BERT model (`bert-base-uncased`) fine-tuned for the task[cite: 177, 102].
5.  **Analysis:** Compare the performance and training time of the quantum model against the classical baselines[cite: 186]. Analyze which types of text might benefit most from quantum processing (acknowledging this is an active research area)[cite: 186].

## Dataset

* **Source:** IMDb movie reviews dataset[cite: 150], loaded via TensorFlow Datasets[cite: 151].
* **Size:** A subset is used, consisting of approximately 1000 samples (500 training, 500 testing) balanced between positive and negative reviews[cite: 155, 157, 80].
* **Preprocessing:**
    * Text cleaning: Lowercasing, removal of HTML tags (`<br />`), non-alphabetic characters, and stopwords using NLTK[cite: 154, 79].
    * Feature Extraction (VQC/MLP): Average GloVe embeddings (100d) calculated per review, followed by PCA reduction to 4 dimensions and standard scaling[cite: 159, 160, 161, 162, 85, 86, 87].
    * Feature Extraction (BERT): Uses original text with BERT's specific tokenizer[cite: 177, 103].
    * Feature Extraction (LSTM): Uses sequences derived from GloVe embeddings (details likely in the full script)[cite: 112].

## Methodology

1.  **Environment Setup:** Installs necessary libraries including `pennylane`, `torch`, `scikit-learn`, `nltk`, `tensorflow_datasets`, `transformers`, `datasets`, and `pandas`[cite: 148, 74].
2.  **Data Loading & Preprocessing:** Loads the IMDb dataset, applies cleaning, creates a balanced subset, and prepares features as described above [cite: 150-163, 76-87].
3.  **Quantum Model (VQC):**
    * Uses Pennylane's `default.qubit` simulator[cite: 164, 88].
    * Employs `AngleEmbedding` for feature input and `StronglyEntanglingLayers` for the variational part[cite: 165, 88, 89].
    * Integrated into a PyTorch `nn.Module` for hybrid training[cite: 166, 89].
    * Trained using `BCEWithLogitsLoss` and Adam optimizer[cite: 167, 91].
4.  **Classical Models:**
    * **MLP:** A simple feed-forward network trained on the 4-dimensional PCA features[cite: 170, 95].
    * **BERT:** Fine-tunes `bert-base-uncased` using the Transformers library[cite: 177, 102].
    * **LSTM:** (Assumed based on setup) Likely uses an embedding layer initialized with GloVe weights followed by LSTM layers.
5.  **Evaluation:** All models are evaluated using accuracy, precision, recall, and F1-score[cite: 169, 173, 181, 94, 99, 106]. Training times are also recorded[cite: 176, 177, 181, 101, 102, 106].

## Setup & Installation

```bash
# Using pip
pip install pennylane torch torchvision torchaudio scikit-learn nltk tensorflow_datasets "transformers[torch]" datasets pandas

# Download NLTK data (if needed)
python -m nltk.downloader stopwords punkt

Design and implement a variational quantum circuit (4 qubits, 3 layers using `StronglyEntanglingLayers`) for sentiment classification.
3.  **Training & Evaluation:** Train the quantum model using Pennylane and PyTorch on a dataset of product/movie reviews and evaluate its performance (Accuracy, Precision, Recall, F1-Score).
4.  **Classical Comparison:** Implement and evaluate classical baseline models:
    * A simple Multi-Layer Perceptron (MLP) trained on the *same* PCA-reduced features as the VQC.
    * An LSTM model (details likely in the full script, utilizes GloVe).
    * A pre-trained BERT model (`bert-base-uncased`) fine-tuned for the task.
5.  **Analysis:** Compare the performance and training time of the quantum model against the classical baselines. Analyze which types of text might benefit most from quantum processing (acknowledging this is an active research area).

## Dataset

* **Source:** IMDb movie reviews dataset, loaded via TensorFlow Datasets.
* **Size:** A subset is used, consisting of approximately 1000 samples (500 training, 500 testing) balanced between positive and negative reviews.
* **Preprocessing:**
    * Text cleaning: Lowercasing, removal of HTML tags (`<br />`), non-alphabetic characters, and stopwords using NLTK.
    * Feature Extraction (VQC/MLP): Average GloVe embeddings (100d) calculated per review, followed by PCA reduction to 4 dimensions and standard scaling.
    * Feature Extraction (BERT): Uses original text with BERT's specific tokenizer.
    * Feature Extraction (LSTM): Uses sequences derived from GloVe embeddings (details likely in the full script).

## Methodology

1.  **Environment Setup:** Installs necessary libraries including `pennylane`, `torch`, `scikit-learn`, `nltk`, `tensorflow_datasets`, `transformers`, `datasets`, and `pandas`.
2.  **Data Loading & Preprocessing:** Loads the IMDb dataset, applies cleaning, creates a balanced subset, and prepares features as described above [cite: 150-163, 76-87].
3.  **Quantum Model (VQC):**
    * Uses Pennylane's `default.qubit` simulator.
    * Employs `AngleEmbedding` for feature input and `StronglyEntanglingLayers` for the variational part.
    * Integrated into a PyTorch `nn.Module` for hybrid training.
    * Trained using `BCEWithLogitsLoss` and Adam optimizer.
4.  **Classical Models:**
    * **MLP:** A simple feed-forward network trained on the 4-dimensional PCA features.
    * **BERT:** Fine-tunes `bert-base-uncased` using the Transformers library.
    * **LSTM:** (Assumed based on setup) Likely uses an embedding layer initialized with GloVe weights followed by LSTM layers.
5.  **Evaluation:** All models are evaluated using accuracy, precision, recall, and F1-score. Training times are also recorded.

## Setup & Installation

```bash
# Using pip
pip install pennylane torch torchvision torchaudio scikit-learn nltk tensorflow_datasets "transformers[torch]" datasets pandas

# Download NLTK data (if needed)
python -m nltk.downloader stopwords punkt
```

*Note: The script uses GloVe embeddings (`glove.6B.100d.txt`). You will need to download this separately and ensure the path (`GLOVE_FILE` variable in the script) points to its location.*

## How to Run

1.  Ensure all prerequisites are installed and GloVe embeddings are downloaded and accessible.
2.  Execute the Python script (e.g., `Quantum_NLP_Sentiment_Analysis_Quantum_Focus.ipynb` if using a notebook environment, or adapt to a `.py` file).

```bash
# Example if running as a Python script
python your_script_name.py
```

The script will proceed through the phases: Setup, Data Preparation, VQC/MLP Pipeline, BERT Pipeline, (LSTM Pipeline), and finally print the comparative results table.

## Example Results (from provided script run)

| Model  | Accuracy | Precision | Recall | F1-Score | Training Time (s) | Input Features          |
| :----- | :------- | :-------- | :----- | :------- | :---------------- | :---------------------- |
| **VQC** | 0.6700   | 0.6906    | 0.6160 | 0.6512   | 394.40            | GloVe Avg -> PCA (4D) |
| **MLP** | 0.6900   | 0.7149    | 0.6320 | 0.6709   | 2.29              | GloVe Avg -> PCA (4D) |
| **BERT** | 0.8240   | 0.8000    | 0.8640 | 0.8308   | 35.20             | BERT Tokenizer/Embeds |
| **LSTM** | *TBD* | *TBD* | *TBD* | *TBD* | *TBD* | GloVe Sequences         |

*(Note: LSTM results were not fully captured in the provided snippet but are part of the comparison framework).*

## Analysis Highlights (from script run)

* **Performance:** On this specific run with a small dataset and PCA-reduced features, the classical MLP slightly outperformed the VQC when using the same input features. BERT significantly outperformed both.
* **Training Time:** VQC simulation was considerably slower than the classical models.
* **Quantum Advantage:** Determining text types where quantum processing offers a clear advantage requires further research, considering limitations in current input encoding methods, hardware constraints, and model trainability.
```
