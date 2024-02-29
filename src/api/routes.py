"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


# Allow CORS requests to this API

CORS(api, resources={r"/api/*": {"origins": 'https://curly-space-couscous-7v94gvgx79pq3rgx6-3000.app.github.dev'}})


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.after_request
def add_cors_headers(response):
   response.headers['Access-Control-Allow-Origin'] = 'https://curly-space-couscous-7v94gvgx79pq3rgx6-3000.app.github.dev'
   response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
   response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE'
   return response
