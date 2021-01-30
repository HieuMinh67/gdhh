from extensions import db

col = db.Column
rel = db.relationship
Model = db.Model


def ref(tablename, nullable=False, pk_name='id', **kwargs):
    return db.Column(
        db.ForeignKey('{0}.{1}'.format(tablename, pk_name)),
        nullable=nullable, **kwargs
    )

