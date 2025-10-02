export default function InfoRow({ label, isEditing, tempData, profileData, name, type = "text", placeholder = "", onChange }) {
  return (
    <div className="py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
          {isEditing ? (
            <div onClick={(e) => e.stopPropagation()}>
              <input
                type={type}
                name={name}
                value={tempData[name] || ''}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onClick={(e) => e.stopPropagation()} // Add this
              />
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