from flask import Flask, request, jsonify
from inference_service import infer_interest
from categories import categories

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    click_counts = data.get("click_counts")

    if not click_counts or len(click_counts) != len(categories):
        return jsonify({"error": f"click_counts list required with {len(categories)} values."}), 400

    try:
        inferred_category = infer_interest(click_counts)
        return jsonify({"inferred_category": inferred_category}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001)

