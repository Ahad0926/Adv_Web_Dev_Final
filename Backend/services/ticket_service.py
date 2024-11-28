from models.ticket_model import Ticket, db

def purchase_ticket(user_id, event_id):
    # Logic to handle ticket purchase
    ticket = Ticket(user_id=user_id, event_id=event_id)
    db.session.add(ticket)
    db.session.commit()
    return ticket

def get_user_tickets(user_id):
    # Fetch tickets for a specific user
    return Ticket.query.filter_by(user_id=user_id).all()

def cancel_ticket(ticket_id):
    # Logic to cancel a ticket
    ticket = Ticket.query.get(ticket_id)
    if ticket:
        ticket.status = 'canceled'
        db.session.commit()
        return True
    return False
