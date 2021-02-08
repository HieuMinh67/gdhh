from flask import Blueprint, jsonify, request, make_response
from .serializers import profiles_schema, profile_schema
from .models import Profile
from extensions import db

blueprint = Blueprint('profile', __name__)


@blueprint.route('/', methods=['GET'])
def get_all():
    all_profiles = Profile.query.all()
    return make_response(jsonify({'profiles': profiles_schema.dump(all_profiles)}), 200)


@blueprint.route('/', methods=['POST'])
def register_profile():
    data = request.get_json()
    profile = profile_schema.load(data)
    db.session.add(profile)
    db.session.commit()
    return make_response('', 201)
