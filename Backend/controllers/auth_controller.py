from flask import Blueprint, jsonify, request
from services.auth_service import create_user, authenticate_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    return create_user(data)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    token, user = authenticate_user(data)
    if token:
        return jsonify({
            "token": token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            }
        })
    return jsonify({"message": "Invalid credentials"}), 401
