import flask
from config import ProdConfig, DevConfig
from extensions import guard, db, cors, ma
import user
import profile


def create_app(config_object=ProdConfig):
    app = flask.Flask(__name__)
    app.config.from_object(config_object)
    register_extensions(app)
    register_blueprint(app)
    with app.app_context():
        db.create_all()
        if db.session.query(user.User).filter_by(email='minhhieu060799@gmail.com').count() < 1:
            db.session.add(user.User(
                email='minhhieu060799@gmail.com',
                password=guard.hash_password('admin123'),
                roles='admin'
            ))
            db.session.add(user.User(
                email='admin',
                password=guard.hash_password('admin'),
                roles='admin'
            ))
        db.session.commit()
    return app


def register_extensions(app):
    guard.init_app(app, user.User)
    db.init_app(app)
    ma.init_app(app)


def register_blueprint(app):
    origins = app.config.get('CORS_ORIGIN_WHITELIST', '*')
    cors.init_app(user.views.blueprint, origins=origins)
    cors.init_app(profile.views.blueprint, origins=origins)

    app.register_blueprint(user.views.blueprint)
    app.register_blueprint(profile.views.blueprint, url_prefix='/api/profiles')


if __name__ == '__main__':
    # CONFIG = DevConfig if get_debug_flag() else ProdConfig
    app = create_app(DevConfig)
    app.run(host='0.0.0.0', debug=True)
