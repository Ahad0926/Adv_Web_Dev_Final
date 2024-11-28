from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.event_service import create_event, get_all_events, get_event_by_id, update_event, delete_event

event_bp = Blueprint('events', __name__)

@event_bp.route('/', methods=['POST'])
@jwt_required()
def create_event_endpoint():
    data = request.get_json()
    organizer_id = get_jwt_identity()  # Extract user ID from JWT
    try:
        event = create_event(data, organizer_id)
        return jsonify(event.to_dict()), 201
    except Exception as e:
        return jsonify({'msg': str(e)}), 400

@event_bp.route('/', methods=['GET'])
def get_all_events_route():
    events = get_all_events()
    return jsonify(events)

@event_bp.route('/<int:event_id>', methods=['GET'])
def get_event_route(event_id):
    event = get_event_by_id(event_id)
    if event:
        return jsonify(event)
    return jsonify({'message': 'Event not found'}), 404

@event_bp.route('/<int:event_id>', methods=['PUT'])
@jwt_required()
def update_event_route(event_id):
    data = request.get_json()
    event = update_event(event_id, data)
    if event:
        return jsonify(event.to_dict())
    return jsonify({'message': 'Event not found'}), 404

@event_bp.route('/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event_route(event_id):
    if delete_event(event_id):
        return jsonify({'message': 'Event deleted successfully'})
    return jsonify({'message': 'Event not found'}), 404
