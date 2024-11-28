from models.user_model import db
from datetime import datetime

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    ticket_price = db.Column(db.Float, nullable=True, default=0.0)  # Allow free events by default
    total_tickets = db.Column(db.Integer, nullable=False, default=0)
    remaining_tickets = db.Column(db.Integer, nullable=False, default=0)

    organizer = db.relationship('User', backref=db.backref('events', lazy=True))


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "start_date": self.start_date.isoformat(),  # Convert datetime to string
            "end_date": self.end_date.isoformat(),      # Convert datetime to string
            "location": self.location,
            "organizer_id": self.organizer_id,
            "organizer_name": self.organizer.name if self.organizer else None,  # Add organizer's name
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "ticket_price": self.ticket_price,
            "total_tickets": self.total_tickets,
            "remaining_tickets": self.remaining_tickets
        }