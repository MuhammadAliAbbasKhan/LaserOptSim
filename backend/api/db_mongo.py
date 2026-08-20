import os
import logging
from datetime import datetime, timezone
import pymongo
from django.conf import settings

logger = logging.getLogger(__name__)

# MongoDB configuration setup
MONGODB_URI = getattr(settings, 'MONGODB_URI', os.environ.get('MONGODB_URI', 'mongodb://localhost:27017/'))
MONGODB_DB_NAME = getattr(settings, 'MONGODB_DB_NAME', os.environ.get('MONGODB_DB_NAME', 'optillumsoft_db'))

_mongo_client = None
_mongo_db = None

def get_mongodb_client():
    """
    Returns the MongoDB client instance. Lazily initializes connection.
    """
    global _mongo_client
    if _mongo_client is None:
        try:
            _mongo_client = pymongo.MongoClient(
                MONGODB_URI,
                serverSelectionTimeoutMS=2000,
                tlsAllowInvalidCertificates=True
            )
            _mongo_client.admin.command('ping')
            logger.info("Successfully connected to MongoDB server at %s", MONGODB_URI)
        except Exception as e:
            logger.warning("MongoDB connection warning: %s. Operations will proceed with local fallback.", e)
            _mongo_client = None
    return _mongo_client


def get_mongodb_database():
    """
    Returns the target MongoDB database instance.
    """
    global _mongo_db
    client = get_mongodb_client()
    if client is not None:
        _mongo_db = client[MONGODB_DB_NAME]
        return _mongo_db
    return None

def check_mongodb_connection():
    """
    Checks MongoDB server availability and returns diagnostic info.
    """
    if '<YOUR_DATABASE_USERNAME>' in MONGODB_URI or '<db_password>' in MONGODB_URI:
        return {
            'connected': False,
            'status': 'MongoDB Atlas URI Pending Username',
            'error': 'Please replace <YOUR_DATABASE_USERNAME> in backend/.env with your Atlas Database Username',
            'database_name': MONGODB_DB_NAME,
            'recommendation': 'Open backend/.env and set valid MONGODB_URI.'
        }

    try:
        client = pymongo.MongoClient(
            MONGODB_URI,
            serverSelectionTimeoutMS=2500,
            tlsAllowInvalidCertificates=True
        )
        client.admin.command('ping')

        db = client[MONGODB_DB_NAME]
        collections = db.list_collection_names()
        
        stats = {
            'users_count': db['laseroptsim_users'].count_documents({}),
            'trials_count': db['laseroptsim_trials'].count_documents({}),
            'inquiries_count': db['laseroptsim_inquiries'].count_documents({}),
            'subscriptions_count': db['laseroptsim_subscriptions'].count_documents({}),
            'service_requests_count': db['laseroptsim_service_requests'].count_documents({}),
        }

        return {
            'connected': True,
            'status': 'Connected to MongoDB Atlas Cloud Database (optillumsoft_db)',
            'mongodb_uri': MONGODB_URI.split('@')[-1] if '@' in MONGODB_URI else MONGODB_URI,
            'database_name': MONGODB_DB_NAME,
            'collections': collections,
            'stats': stats,
            'engine': 'PyMongo MongoDB Client Driver (Atlas Cloud)'
        }
    except Exception as e:
        return {
            'connected': False,
            'status': 'MongoDB Connection Offline (Dual-Storage SQLite Active)',
            'error': str(e),
            'database_name': MONGODB_DB_NAME,
            'recommendation': 'System using SQLite primary database.'
        }

# ── MONGODB DOCUMENT SYNC HELPERS ──────────────────────────────────────────────

def sync_user_to_mongodb(user_data):
    """Syncs user registration directly to MongoDB collection 'laseroptsim_users' inside optillumsoft_db"""
    try:
        db = get_mongodb_database()
        if db is not None:
            user_doc = dict(user_data)
            user_doc['synced_at'] = datetime.now(timezone.utc).isoformat()
            db['laseroptsim_users'].update_one(
                {'email': user_doc['email']},
                {'$set': user_doc},
                upsert=True
            )
            logger.info("User %s synced to MongoDB collection 'laseroptsim_users'", user_doc.get('email'))
            return True
    except Exception as e:
        logger.error("Failed to sync user to MongoDB: %s", e)
    return False

def sync_trial_request_to_mongodb(trial_data):
    """Syncs software trial request directly to MongoDB collection 'laseroptsim_trials' inside optillumsoft_db"""
    try:
        db = get_mongodb_database()
        if db is not None:
            doc = dict(trial_data)
            doc['created_at'] = datetime.now(timezone.utc).isoformat()
            db['laseroptsim_trials'].insert_one(doc)
            logger.info("Trial request from %s synced to MongoDB 'laseroptsim_trials'", doc.get('email'))
            return True
    except Exception as e:
        logger.error("Failed to sync trial request to MongoDB: %s", e)
    return False

def sync_contact_inquiry_to_mongodb(inquiry_data):
    """Syncs contact inquiry directly to MongoDB collection 'laseroptsim_inquiries' inside optillumsoft_db"""
    try:
        db = get_mongodb_database()
        if db is not None:
            doc = dict(inquiry_data)
            doc['created_at'] = datetime.now(timezone.utc).isoformat()
            db['laseroptsim_inquiries'].insert_one(doc)
            logger.info("Contact inquiry from %s synced to MongoDB 'laseroptsim_inquiries'", doc.get('email'))
            return True
    except Exception as e:
        logger.error("Failed to sync inquiry to MongoDB: %s", e)
    return False

def sync_subscription_to_mongodb(sub_data):
    """Syncs user subscription directly to MongoDB collection 'laseroptsim_subscriptions' inside optillumsoft_db"""
    try:
        db = get_mongodb_database()
        if db is not None:
            doc = dict(sub_data)
            doc['updated_at'] = datetime.now(timezone.utc).isoformat()
            db['laseroptsim_subscriptions'].update_one(
                {'email': doc['email']},
                {'$set': doc},
                upsert=True
            )
            logger.info("Subscription for %s synced to MongoDB 'laseroptsim_subscriptions'", doc.get('email'))
            return True
    except Exception as e:
        logger.error("Failed to sync subscription to MongoDB: %s", e)
    return False

def sync_service_request_to_mongodb(service_data):
    """Syncs optical engineering service request directly to MongoDB collection 'laseroptsim_service_requests' inside optillumsoft_db"""
    try:
        db = get_mongodb_database()
        if db is not None:
            doc = dict(service_data)
            doc['created_at'] = datetime.now(timezone.utc).isoformat()
            db['laseroptsim_service_requests'].insert_one(doc)
            logger.info("Laser service request synced to MongoDB 'laseroptsim_service_requests'")
            return True
    except Exception as e:
        logger.error("Failed to sync service request to MongoDB: %s", e)
    return False
