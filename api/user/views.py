from flask import request, jsonify, Blueprint
import flask
import flask_praetorian
from extensions import guard, db
from .serializers import user_schema, users_schema
from .models import User

blueprint = Blueprint('user', __name__)


@blueprint.route('/api/login', methods=('POST',))
def login():
    req = flask.request.get_json(force=True)
    email = req.get('email', None)
    password = req.get('password', None)
    user = guard.authenticate(email, password)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 200


@blueprint.route('/api/refresh', methods=('POST',))
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/api/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200


@blueprint.route('/api/protected')
@flask_praetorian.auth_required
def protected():
    return {"message": f'protected endpoint (allowed user {flask_praetorian.current_user().email})'}


@blueprint.route('/api/users/', methods=('GET',))
@flask_praetorian.auth_required
def get_all_users():
    all_users = User.query.all()
    return jsonify({'users': users_schema.dump(all_users)})


@blueprint.route('/api/register', methods=('POST',))
def register():
    req = flask.request.get_json(force=True)
    email = req.get('email', None)
    password = req.get('password', None)
    new_user = User(
        password=guard.hash_password(password),
        email=email,
        roles='user'
    )
    db.session.add(new_user)
    db.session.commit()
    # guard.send_registration_email(email, user=new_user)
    ret = {'message': 'successfully register with email {}'.format(
        new_user.email
    )}
    return flask.jsonify(ret), 201
