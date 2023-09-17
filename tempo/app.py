from flask import Flask





def create_app():
    from flask_json import FlaskJSON
    from api.routes  import api_blueprint
    app = Flask(__name__,template_folder='templates')
    app.register_blueprint(api_blueprint, url_prefix="/api")
    app.config['UPLOAD_FOLDER'] = '/tmp'
    json = FlaskJSON()
    json.init_app(app)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0",debug=True)