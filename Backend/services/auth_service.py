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
    """Authenticate user and return a token."""
    from flask_jwt_extended import create_access_token

    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return {'message': 'Invalid email or password'}, 401

    access_token = create_access_token(identity={'id': user.id, 'email': user.email})
    return {'token': access_token}, 200
