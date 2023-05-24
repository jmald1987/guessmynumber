import bcrypt
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt


app=Flask(__name__,template_folder='templates')
#used import secrets
#secrets.hex_code(16) to generate this key.
app.config['SECRET_KEY']='610e0dfe92b93037e32577e4631443e4'
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:abc123@localhost/guessmynumber'
db=SQLAlchemy(app)
login_manager=LoginManager(app)

from game import routes