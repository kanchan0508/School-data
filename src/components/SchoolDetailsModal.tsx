import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase, type School } from '../lib/supabase';
import { 
  X, 
  Edit, 
  Save, 
  Cancel, 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  Calendar,
  User,
  ExternalLink,
  Trash2
} from 'lucide-react';
import GradientButton from './GradientButton';

const schoolEditSchema = z.object({
  name: z.string().min(3, 'School name must be at least 3 characters'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  contact: z.string().regex(/^\d{10}$/, 'Contact must be a 10-digit number'),
  email_id: z.string().email('Please enter a valid email address'),
  image: z.string().url('Please enter a valid image URL').optional().or(z.literal('')),
});

type SchoolEditData = z.infer<typeof schoolEditSchema>;

interface SchoolDetailsModalProps {
  school: School;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedSchool: School) => void;
  onDelete: (schoolId: string) => void;
}

const SchoolDetailsModal: React.FC<SchoolDetailsModalProps> = ({
  school,
  isOpen,
  onClose,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updateError, setUpdateError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<SchoolEditData>({
    resolver: zodResolver(schoolEditSchema),
    defaultValues: {
      name: school.name,
      address: school.address,
      city: school.city,
      state: school.state,
      contact: school.contact,
      email_id: school.email_id,
      image: school.image || '',
    }
  });

  const watchedImage = watch('image');

  const handleEdit = () => {
    setIsEditing(true);
    reset({
      name: school.name,
      address: school.address,
      city: school.city,
      state: school.state,
      contact: school.contact,
      email_id: school.email_id,
      image: school.image || '',
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdateError('');
    reset();
  };

  const handleUpdate = async (data: SchoolEditData) => {
    setIsUpdating(true);
    setUpdateError('');

    try {
      const { data: updatedData, error } = await supabase
        .from('schools')
        .update(data)
        .eq('id', school.id)
        .select()
        .single();

      if (error) throw error;

      onUpdate(updatedData);
      setIsEditing(false);
    } catch (error: any) {
      setUpdateError(error.message || 'Failed to update school');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this school? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from('schools')
        .delete()
        .eq('id', school.id);

      if (error) throw error;

      onDelete(school.id);
      onClose();
    } catch (error: any) {
      alert('Failed to delete school: ' + (error.message || 'Unknown error'));
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{school.name}</h2>
              <p className="text-blue-100">School Details & Information</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] custom-scrollbar">
          {!isEditing ? (
            // View Mode
            <div className="p-6 space-y-8">
              
              {/* School Image */}
              <div className="relative">
                {school.image ? (
                  <img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Building2 className="h-20 w-20 text-white opacity-80" />
                  </div>
                )}
              </div>

              {/* School Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span>Contact Information</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                      <MapPin className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">{school.address}</p>
                        <p className="text-sm font-medium text-gray-800 mt-1">
                          {school.city}, {school.state}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                      <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Phone Number</p>
                        <a 
                          href={`tel:${school.contact}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          {school.contact}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                      <Mail className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email Address</p>
                        <a 
                          href={`mailto:${school.email_id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center space-x-1"
                        >
                          <span>{school.email_id}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>Additional Information</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="font-medium text-blue-900">School Type</p>
                      <p className="text-blue-700">Educational Institution</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <p className="font-medium text-green-900">Location</p>
                      <p className="text-green-700">{school.city}, {school.state}</p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <p className="font-medium text-purple-900">Added Date</p>
                      <p className="text-purple-700">
                        {new Date(school.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <GradientButton
                  onClick={handleEdit}
                  variant="primary"
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit School Details
                </GradientButton>
                
                <GradientButton
                  onClick={handleDelete}
                  variant="danger"
                  disabled={isDeleting}
                  className="flex-1"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete School
                    </>
                  )}
                </GradientButton>
              </div>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit(handleUpdate)} className="p-6 space-y-6">
              
              {updateError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-800">{updateError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* School Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    School Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('name')}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Enter school name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('email_id')}
                    type="email"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                      errors.email_id ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="school@example.com"
                  />
                  {errors.email_id && (
                    <p className="text-sm text-red-600">{errors.email_id.message}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('address')}
                  rows={3}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none ${
                    errors.address ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Enter complete address"
                />
                {errors.address && (
                  <p className="text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('city')}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                      errors.city ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Enter city"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('state')}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                      errors.state ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Enter state"
                  />
                  {errors.state && (
                    <p className="text-sm text-red-600">{errors.state.message}</p>
                  )}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('contact')}
                  type="tel"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                    errors.contact ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Enter 10-digit contact number"
                />
                {errors.contact && (
                  <p className="text-sm text-red-600">{errors.contact.message}</p>
                )}
              </div>

              {/* Image URL with Preview */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  School Image URL <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                </label>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <input
                      {...register('image')}
                      type="url"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
                        errors.image ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="https://example.com/school-image.jpg"
                    />
                    {errors.image && (
                      <p className="text-sm text-red-600">{errors.image.message}</p>
                    )}
                  </div>
                  
                  {/* Image Preview */}
                  <div className="bg-gray-100 rounded-xl p-4 border-2 border-dashed border-gray-300">
                    {watchedImage && !errors.image ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Preview:</p>
                        <img
                          src={watchedImage}
                          alt="School preview"
                          className="w-full h-24 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-24 text-gray-400">
                        <Building2 className="h-6 w-6 mb-1" />
                        <p className="text-xs">Image preview</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <GradientButton
                  type="submit"
                  variant="success"
                  disabled={isUpdating}
                  className="flex-1"
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </GradientButton>
                
                <GradientButton
                  type="button"
                  onClick={handleCancelEdit}
                  variant="secondary"
                  className="flex-1"
                >
                  <Cancel className="h-4 w-4 mr-2" />
                  Cancel
                </GradientButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailsModal;
