from database import col, rel, ref, Model, db
import datetime as dt

class Profile(Model):
    __tablename__ = 'hoso__thanh_vien'

    id = col(db.Integer, primary_key=True)

    id_user = ref('user__user', nullable=True, autoincrement=True)
    user = rel('User', backref='profile')
    sex = col(db.String(6), nullable=False)
    dob = col(db.Date)
    enabled = col(db.Boolean, default=True)
    so_dien_thoai = col(db.String(15))
    so_dien_thoai_me = col(db.String(15))
    so_dien_thoai_bo = col(db.String(15))
    so_dien_thoai_nha = col(db.String(15))
    dia_chi_tam_tru = col(db.String(255))
    dia_chi_thuong_tru = col(db.String(255))
    firstname = col(db.String(50), nullable=False)
    middlename = col(db.String(50), nullable=False)
    lastname = col(db.String(50), nullable=False)
    id_ten_thanh = ref('hoso__christian_name')
    ho_ten_bo = col(db.String(255))
    ho_ten_me = col(db.String(255))
    nghe_nghiep_bo = col(db.String(255))
    nghe_nghiep_me = col(db.String(255))
    # id_ten_thanh_bo = ref('hoso__christian_name')
    # id_ten_thanh_me = ref('hoso__christian_name')
    notes = col(db.Text)
    created_at = col(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    updated_at = col(db.DateTime, nullable=False, default=dt.datetime.utcnow)

    # def __init__(self):
    def __repr__(self) -> str:
        return super().__repr__()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self


class ChristianName(Model):
    __tablename__ = 'hoso__christian_name'

    id = col(db.String(24), primary_key=True)
    sex = col(db.String(6), nullable=False)
    tieng_viet = col(db.String(250))
    tieng_anh = col(db.String(250))
    code = col(db.String(250), unique=True)
    profiles = db.relation('Profile', backref='christianname', lazy=True)
