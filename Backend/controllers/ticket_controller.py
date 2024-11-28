from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from services.ticket_service import purchase_ticket, get_user_tickets, cancel_ticket

ticket_bp = Blueprint('tickets', __name__)

@ticket_bp.route('/purchase', methods=['POST'])
@jwt_required()
def purchase_ticket_endpoint():
    user_id = get_jwt_identity()
    event_id = request.json.get('event_id')
    try:
        ticket = purchase_ticket(user_id, event_id)
        return jsonify(ticket.to_dict()), 201
    except Exception as e:
        return jsonify({'msg': str(e)}), 400

@ticket_bp.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_tickets_by_user(user_id):
    tickets = get_user_tickets(user_id)
    return jsonify([ticket.to_dict() for ticket in tickets])

@ticket_bp.route('/cancel/<int:ticket_id>', methods=['PUT'])
@jwt_required()
def cancel_ticket_endpoint(ticket_id):
    result = cancel_ticket(ticket_id)
    if result:
        return jsonify({'message': 'Ticket cancelled successfully'})
    return jsonify({'message': 'Ticket not found'}), 404
