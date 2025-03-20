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
      <div className="text-center p-4 sm:p-8">
        <p className="mb-2">Please log in to view your profile.</p>
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center">
        Welcome, {user.displayName || 'User'}!
      </h1>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Update Profile</h2>
          
          <div className="mb-3 sm:mb-4">
            <label htmlFor="displayName" className="block mb-1 text-sm sm:text-base font-medium">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm sm:text-base"
            />
          </div>
          
          <div className="mb-4 sm:mb-6">
            <label htmlFor="photoURL" className="block mb-1 text-sm sm:text-base font-medium">
              Photo URL
            </label>
            <input
              type="text"
              id="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm sm:text-base"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          
          <div className="flex gap-2 sm:gap-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="mb-4 sm:mb-0">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center text-3xl sm:text-4xl text-gray-500 border-4 border-blue-500">
                  {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-bold mb-2">Profile Information</h2>
              
              <div className="mb-2 text-sm sm:text-base">
                <span className="font-medium">Name:</span>{' '}
                {user.displayName || 'Not provided'}
              </div>
              
              <div className="mb-2 text-sm sm:text-base">
                <span className="font-medium">Email:</span> {user.email}
              </div>
              
              <div className="mb-4 sm:mb-6 text-sm sm:text-base">
                <span className="font-medium">Account created:</span>{' '}
                {user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : 'Unknown'}
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base"
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