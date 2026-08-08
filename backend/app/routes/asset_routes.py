from flask import Blueprint, request, jsonify

from app.db.database import db
from app.models.asset import Asset

asset_bp = Blueprint("asset", __name__)

# GET all assets
@asset_bp.route("/api/assets", methods=["GET"])
def get_assets():
    assets = Asset.query.all()
    return jsonify([asset.to_dict() for asset in assets])

# CREATE asset
@asset_bp.route("/api/assets", methods=["POST"])
def create_asset():
    data = request.get_json()

    asset = Asset(
        name=data["name"],
        target=data["target"],
        asset_type=data["asset_type"],
        description=data.get("description", "")
    )

    db.session.add(asset)
    db.session.commit()

    return jsonify(asset.to_dict()), 201