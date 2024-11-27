from flask_jwt_extended import create_access_token
from models.user_model import User, db

def create_user(data):
    """Create a new user."""
    if User.query.filter_by(email=data['email']).first():
        return {'message': 'Email already exists'}, 400

    new_user = User(name=data['name'], email=data['email'])
    new_user.set_password(data['password'])

    db.session.add(new_user)
    db.session.commit()

    return {'message': 'User created successfully'}, 201


def authenticate_user(data):
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        token = create_access_token(user.id)
        return token, user
    return None, None
