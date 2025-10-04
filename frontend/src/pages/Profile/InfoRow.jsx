export default function InfoRow({ label, isEditing, tempData, profileData, name, type = "text", placeholder = "", onChange, required, error }) {
  return (
    <div className="py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-500 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {isEditing ? (
            <div>
              <input
                type={type}
                name={name}
                value={tempData[name] || ''}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          ) : (
            <p className="text-gray-900 font-medium">
              {profileData[name] || <span className="text-gray-400 italic">Not provided</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}