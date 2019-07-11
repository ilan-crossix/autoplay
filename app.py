from flask import Flask,jsonify,request, render_template
import pymongo
from flask_cors import CORS

app = Flask(__name__, template_folder='public', static_folder='src')
client = pymongo.MongoClient("mongodb+srv://autoplay:Mitzigold2!@cluster0-jcdnz.mongodb.net/test?retryWrites=true&w=majority")
db = client.autoplay_db
CORS(app)

@app.route('/get_item', methods=['GET'])
def get_items():
    # get max number
    topic = request.args.get('topic')
    item = db[topic].aggregate([
                { "$match": { "no_attribute": { "$exists": False } } },
                { "$sample": { "size": 1 } }
            ]).next()
    lst_vals = ['date', 'url', 'title', 'timeout']
    item = {'results': {val:str(item[val]) for val in lst_vals}}
    item_json = jsonify(item)
    return item_json

@app.route('/get_topics', methods=['GET'])
def get_topics():
    # get max number
    topics = db.list_collection_names()
    res = {'results':topics}
    res_json = jsonify(res)
    return res_json

if __name__ == '__main__':
    app.run()
