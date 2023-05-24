from flask import  redirect, render_template, request, url_for, flash
from game.stuff import app, db
from game.form import RegistrationForm, LoginForm,ValidationError
from game.models import User
from flask_bcrypt import Bcrypt
from flask_login import login_user

bcrypt=Bcrypt(app)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register", methods=['GET','POST'])
def register():
    form=RegistrationForm()
    if form.validate_on_submit():
        hashed_password=bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user=(User(username=form.username.data, email=form.email.data, password=hashed_password))
       
        db.session.add(user)
        db.session.commit()
        flash(f'Account created for {form.username.data}!','success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

@app.route("/login", methods=['GET','POST'])
def login():
    form=LoginForm()
    if form.validate_on_submit():
        user= User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            return redirect(url_for('index'))
        else:
            flash('Login Unsuccessful. Please check email and password.')
    return render_template('login.html', title='Login', form=form)

