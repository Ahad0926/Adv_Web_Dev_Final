from flask import Blueprint, request
from services.auth_service import create_user, authenticate_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    return create_user(data)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return authenticate_user(data)
