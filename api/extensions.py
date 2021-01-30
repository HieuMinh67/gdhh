import flask_sqlalchemy
import flask_praetorian
import flask_cors
import flask_marshmallow

ma = flask_marshmallow.Marshmallow()
db = flask_sqlalchemy.SQLAlchemy()
guard = flask_praetorian.Praetorian()
cors = flask_cors.CORS()

