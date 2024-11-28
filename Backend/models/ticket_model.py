from datetime import datetime
from models.user_model import db

class Ticket(db.Model):
    __tablename__ = 'tickets'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    purchase_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default='active')

    user = db.relationship('User', backref=db.backref('tickets', lazy=True))
    event = db.relationship('Event', backref=db.backref('tickets', lazy=True))
