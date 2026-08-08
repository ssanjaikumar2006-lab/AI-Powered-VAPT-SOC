from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Database
from app.db.database import db

# Import Models
from app.models.asset import Asset

# Import Routes
from app.routes.asset_routes import asset_bp
# from app.routes.scan_routes import scan_bp
# from app.routes.soc_routes import soc_bp
# from app.routes.ai_routes import ai_bp
# from app.routes.report_routes import report_bp

# ---------------------------------------------------

load_dotenv()

app = Flask(__name__)

# Enable CORS
CORS(app)

# Database Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"postgresql://"
    f"{os.getenv('DB_USER')}:"
    f"{os.getenv('DB_PASSWORD')}@"
    f"{os.getenv('DB_HOST')}:"
    f"{os.getenv('DB_PORT')}/"
    f"{os.getenv('DB_NAME')}"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize Database
db.init_app(app)

# Register API Routes
app.register_blueprint(asset_bp)

# app.register_blueprint(scan_bp)
# app.register_blueprint(soc_bp)
# app.register_blueprint(ai_bp)
# app.register_blueprint(report_bp)

# Create Tables Automatically
with app.app_context():
    db.create_all()

# Home Route
@app.route("/")
def home():
    return {
        "status": "success",
        "message": "AI VAPT SOC Backend Connected Successfully",
        "version": "1.0"
    }

# Health Check
@app.route("/health")
def health():
    return {
        "server": "Running",
        "database": "Connected"
    }

# Run Server
if __name__ == "__main__":
    app.run(debug=True)