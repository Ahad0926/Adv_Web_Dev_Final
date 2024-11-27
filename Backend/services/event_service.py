from datetime import datetime
from models.event_model import Event, db

def create_event(data, organizer_id):
    """Create a new event."""
    # Convert date strings to datetime objects
    start_date = datetime.strptime(data['start_date'], '%Y-%m-%dT%H:%M:%S')
    end_date = datetime.strptime(data['end_date'], '%Y-%m-%dT%H:%M:%S')
    # Create an event instance
    event = Event(
        title=data['title'],
        description=data['description'],
        start_date=start_date,
        end_date=end_date,
        location=data['location'],
        organizer_id=organizer_id
    )
    db.session.add(event)
    db.session.commit()
    return event

def get_all_events():
    """Retrieve all events."""
    return Event.query.all()

def get_event_by_id(event_id):
    """Retrieve a specific event by ID."""
    return Event.query.get(event_id)

def update_event(event_id, data):
    """Update an existing event."""
    event = Event.query.get(event_id)
    if event:
        event.title = data.get('title', event.title)
        event.description = data.get('description', event.description)
        event.start_date = data.get('start_date', event.start_date)
        event.end_date = data.get('end_date', event.end_date)
        event.location = data.get('location', event.location)
        db.session.commit()
        return event
    return None

def delete_event(event_id):
    """Delete an event."""
    event = Event.query.get(event_id)
    if event:
        db.session.delete(event)
        db.session.commit()
        return True
    return False
