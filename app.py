from flask import Flask, render_template, redirect, url_for, request, flash
from flask_login import LoginManager, login_user, logout_user, login_required
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash
from models import User

app = Flask(__name__, template_folder='templates')
app.secret_key = 'Hero123!'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')

def home():
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            # Authentication successful, log in the user
            flash('Login successful!', 'success')
            # Redirect to the index page
            return redirect(url_for('index.html'))
        else:
            # Authentication failed, show error message
            flash('Invalid username or password. Please try again.', 'error')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Handle registration logic here
        pass
    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)
