import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { updateProfile as updateFirebaseProfile, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const auth = getAuth();
      await updateFirebaseProfile(auth.currentUser, {
        displayName,
        photoURL
      });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-8">
        <p>Please log in to view your profile.</p>
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome, {user.displayName || 'User'}!
      </h1>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Update Profile</h2>
          
          <div className="mb-4">
            <label htmlFor="displayName" className="block mb-1 font-medium">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="photoURL" className="block mb-1 font-medium">
              Photo URL
            </label>
            <input
              type="text"
              id="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="mb-4 md:mb-0">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500 border-4 border-blue-500">
                  {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Profile Information</h2>
              
              <div className="mb-2">
                <span className="font-medium">Name:</span>{' '}
                {user.displayName || 'Not provided'}
              </div>
              
              <div className="mb-2">
                <span className="font-medium">Email:</span> {user.email}
              </div>
              
              <div className="mb-6">
                <span className="font-medium">Account created:</span>{' '}
                {user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : 'Unknown'}
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;