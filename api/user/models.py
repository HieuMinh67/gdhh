from database import col, db


class User(db.Model):
    __tablename__ = 'user__user'
    id = col(db.Integer, primary_key=True)
    email = col(db.String(100), unique=True)
    password = col(db.Text)
    roles = col(db.Text)
    is_active = col(db.Boolean, default=True)
    db.UniqueConstraint(email)

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @classmethod
    def lookup(cls, email):
        return cls.query.filter_by(email=email).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active
