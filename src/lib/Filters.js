import { useState, useEffect } from 'react';

const Filters = ({ commerce, setFilteredCommerce }) => {
  const [city, setCity] = useState('');
  const [activity, setActivity] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const uniqueCities = [...new Set(commerce.map((item) => item.city))];
  const uniqueActivities = [...new Set(commerce.map((item) => item.activity))];

  useEffect(() => {
    let filtered = commerce.filter((item) => {
      return (
        (city === '' || item.city === city) &&
        (activity === '' || item.activity === activity)
      );
    });

    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.usersReview.scoring - b.usersReview.scoring);
    } else if (sortOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.usersReview.scoring - a.usersReview.scoring);
    }

    setFilteredCommerce(filtered);
  }, [commerce, city, activity, sortOrder, setFilteredCommerce]);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          City:
        </label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All</option>
          {uniqueCities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Activity:
        </label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All</option>
          {uniqueActivities.map((activity, index) => (
            <option key={index} value={activity}>{activity}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sort by Scoring:
        </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;