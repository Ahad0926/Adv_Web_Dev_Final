from datetime import datetime
from models.event_model import Event, db

def create_event(data, organizer_id):
    """Create a new event with ticket information."""
    start_date = datetime.strptime(data['start_date'], '%Y-%m-%dT%H:%M:%S')
    end_date = datetime.strptime(data['end_date'], '%Y-%m-%dT%H:%M:%S')
    
    event = Event(
        title=data['title'],
        description=data['description'],
        start_date=start_date,
        end_date=end_date,
        location=data['location'],
        organizer_id=organizer_id,
        ticket_price=float(data['ticket_price']),
        total_tickets=int(data['total_tickets']),
        remaining_tickets=int(data['total_tickets'])  # Initially, remaining tickets should be equal to total tickets
    )
    db.session.add(event)
    db.session.commit()
    return event

def get_all_events():
    """Retrieve all events including their ticket info."""
    events = Event.query.all()
    return [event.to_dict() for event in events]

def get_event_by_id(event_id):
    """Retrieve a specific event by ID including its ticket info."""
    event = Event.query.get(event_id)
    if event:
        return event.to_dict()
    return None

def update_event(event_id, data):
    """Update an existing event with the possibility to change ticket info."""
    event = Event.query.get(event_id)
    if event:
        event.title = data.get('title', event.title)
        event.description = data.get('description', event.description)
        event.start_date = data.get('start_date', event.start_date)
        event.end_date = data.get('end_date', event.end_date)
        event.location = data.get('location', event.location)
        event.ticket_price = float(data.get('ticket_price', event.ticket_price))
        event.total_tickets = int(data.get('total_tickets', event.total_tickets))
        event.remaining_tickets = int(data.get('remaining_tickets', event.remaining_tickets))
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
