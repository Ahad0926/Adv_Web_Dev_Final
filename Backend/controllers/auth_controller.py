from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.user_model import User
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

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user_details():
    user_id = get_jwt_identity()  # Get the user ID from the JWT
    user = User.query.get(user_id)  # Fetch the user from the database

    if user:
        # Return user details, including organized events
        return jsonify({
            "name": user.name,
            "email": user.email,
            "organized_events": [
                {
                    "id": event.id,
                    "title": event.title,
                    "start_date": event.start_date.isoformat()
                }
                for event in user.organized_events
            ]
        }), 200
    return jsonify({"message": "User not found"}), 404