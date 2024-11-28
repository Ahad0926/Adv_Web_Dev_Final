from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

from models.user_model import db, bcrypt
from controllers.auth_controller import auth_bp
from controllers.event_controller import event_bp

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}}, supports_credentials=True)
app.url_map.strict_slashes = False

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'd2f0a9b1ac67e87d34e2db3b925cad8d594b76527bdfa7c8d83e27e5d63b967a'

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(event_bp, url_prefix='/api/events')

if __name__ == '__main__':
    app.run(debug=True)
