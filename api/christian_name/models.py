from extensions import db
from database import Model, col


class ChristianName(Model):
    __tablename__ = 'hoso__christian_name'

    id = col(db.String(24), primary_key=True)
    sex = col(db.String(6), nullable=False)
    tieng_viet = col(db.String(250))
    tieng_anh = col(db.String(250))
    code = col(db.String(250), unique=True)
    profiles = db.relation('Profile', backref='christianname', lazy=True)
