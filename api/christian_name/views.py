from flask import request, jsonify, Blueprint
from .models import ChristianName
from .serializers import christian_names_schema

blueprint = Blueprint('christian_name', __name__)


@blueprint.route('/', methods=['GET'])
def get_all():
    data = ChristianName.query.all()
    return jsonify({'data': christian_names_schema.dump(data)})
